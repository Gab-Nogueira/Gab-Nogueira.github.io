export const workDroplets = [[145,243,13],[181,267,5],[234,242,9],[370,265,4],[468,245,11],[486,290,6],[580,260,4],[663,244,13],[706,278,6],[858,241,7],[872,269,4]] as const;
export const workCutouts = [[103,241,10],[222,242,8],[321,243,11],[454,242,9],[583,242,12],[671,242,8],[801,243,10],[923,242,9]] as const;

export function cutoutOrbit(index: number) {
  const [cx, cy, r] = workCutouts[index];
  const direction = index % 2 ? -1 : 1;
  return [
    { cx, cy, r },
    { cx: cx + direction * 12, cy: cy - 9, r: r * 1.25 },
    { cx: cx - direction * 8, cy: cy + 7, r: r * .7 },
    { cx, cy, r },
  ];
}

export function dropletOrbit(index: number) {
  const [cx, cy, r] = workDroplets[index];
  const direction = index % 2 ? -1 : 1;
  return [
    { cx, cy, r },
    { cx: cx + direction * 13, cy: cy - 19 - index % 4 * 3, r: r * 1.12 },
    { cx: cx - direction * 9, cy: cy + 15 + index % 3 * 3, r: r * .8 },
    { cx, cy, r },
  ];
}
