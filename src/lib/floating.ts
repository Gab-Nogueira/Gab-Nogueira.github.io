interface FloatOptions { width: number; height: number; size: number; x: number; y: number; index: number; amplitudeScale?: number; }
export function technologyParallax(x: number, y: number, index: number) {
  const depth = 4 + index % 3 * 2;
  const direction = index % 2 ? -1 : 1;
  return { x: Math.max(-1, Math.min(1, x)) * depth * direction,
    y: Math.max(-1, Math.min(1, y)) * depth * .7 * direction };
}

export function getFloatPath({ width, height, size, x, y, index, amplitudeScale = 1 }: FloatOptions) {
  const padding = Math.min(24, Math.max(0, (Math.min(width, height) - size) / 2));
  const minX = padding, minY = padding;
  const maxX = Math.max(minX, width - size - padding);
  const maxY = Math.max(minY, height - size - padding);
  const base = { x: minX + x * (maxX - minX), y: minY + y * (maxY - minY) };
  const amplitude = Math.min(width * .115, height * .12, 52) * amplitudeScale;
  const phase = index * 1.37;
  const points = Array.from({ length: 5 }, (_, i) => {
    const angle = phase + (i / 4) * Math.PI * 2;
    return {
      x: Math.max(minX, Math.min(maxX, base.x + Math.cos(angle) * amplitude)) - base.x,
      y: Math.max(minY, Math.min(maxY, base.y + Math.sin(angle) * amplitude * .8)) - base.y,
    };
  });
  return { base, points };
}
