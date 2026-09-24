interface Stroke {
  getTotalLength: () => number;
  setAttribute: (name: string, value: string) => void;
  removeAttribute: (name: string) => void;
}

export function prepareHandwriting(paths: Stroke[], duration = 3.6) {
  const lengths = paths.map(path => Math.max(1, path.getTotalLength()));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let start = 0;
  return paths.map((path, index) => {
    const length = lengths[index];
    // Actual SVG units avoid a 1px dash tween rounding from hidden to complete.
    path.removeAttribute('pathLength');
    path.setAttribute('stroke-dasharray', `${length} ${length}`);
    path.setAttribute('stroke-dashoffset', String(length));
    const seconds = duration * length / total;
    const stroke = { path, length, start, duration: seconds };
    start += seconds;
    return stroke;
  });
}
