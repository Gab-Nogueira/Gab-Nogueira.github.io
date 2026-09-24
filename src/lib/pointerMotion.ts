export interface Point { x: number; y: number; }
export interface PointerSample extends Point { time: number; }
export interface Rect { left: number; top: number; width: number; height: number; }
export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

// Project font ink into the transformed line box. The generous heading line-height
// is layout spacing, not an interactive surface.
export function textInkRect(rect: Rect, font: { size: number; lineHeight: number; ascent: number; descent: number; inkAscent: number; inkDescent: number }): Rect {
  const scale = rect.height / font.lineHeight;
  const leading = (font.lineHeight - (font.ascent + font.descent) * font.size) / 2;
  return { left: rect.left, width: rect.width,
    top: rect.top + (leading + (font.ascent - font.inkAscent) * font.size) * scale,
    height: (font.inkAscent + font.inkDescent) * font.size * scale };
}

export function titleImpulse(point: PointerSample, previous: PointerSample | null, letters: Rect[]) {
  const active = letters.some(rect => point.x >= rect.left && point.x <= rect.left + rect.width && point.y >= rect.top && point.y <= rect.top + rect.height);
  if (!active || !previous) return { active, x: 0, y: 0, strength: 0 };
  const elapsed = Math.max(16, point.time - previous.time);
  const x = clamp((point.x - previous.x) * 16 / elapsed, -24, 24);
  const y = clamp((point.y - previous.y) * 16 / elapsed, -24, 24);
  const direction = Math.abs(x) >= Math.abs(y) ? Math.sign(x) : Math.sign(y);
  return { active, x, y, strength: direction * Math.min(42, Math.hypot(x, y) * 2.4) };
}

export function stringControl(point: Point, rect: Rect) {
  return { x: clamp((point.x - rect.left) / Math.max(1, rect.width) * 1000, 40, 960),
    y: 60 + clamp((point.y - rect.top - rect.height / 2) / Math.max(1, rect.height) * 160, -64, 64) };
}

export function dropletPush(pointer: Point, center: Point, radius = 150) {
  const dx = center.x - pointer.x, dy = center.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) return { x: 0, y: 0 };
  const force = (1 - distance / radius) * 34;
  return { x: distance ? dx / distance * force : 0, y: distance ? dy / distance * force : -force };
}
