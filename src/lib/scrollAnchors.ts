type Resolver = () => number;
const anchors = new Map<string, Resolver>();

// Resolve pinned panels at navigation time, after resize or language changes.
export function registerScrollAnchor(id: string, resolve: Resolver) {
  anchors.set(id, resolve);
  return () => { if (anchors.get(id) === resolve) anchors.delete(id); };
}

export function resolveScrollAnchor(id: string): number | undefined {
  const position = anchors.get(id)?.();
  return position === undefined || !Number.isFinite(position) ? undefined : Math.max(0, position);
}

export function expertisePosition(pinStart: number, panelHeight: number, viewportHeight: number) {
  return Math.max(0, pinStart - Math.max(0, panelHeight - viewportHeight));
}
