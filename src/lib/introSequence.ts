// Seconds, measured against the supplied reference. Keep the quiet beats:
// they make the handwriting, stepped wipe and masked title distinct moments.
export const introSequence = {
  loadingMinimum: 5.4,
  loadingHold: .55,
  loadingExit: .4,
  beforeWriting: .8,
  writing: 4,
  greetingHold: 1.05,
  greetingExit: .45,
  wipe: 1.2,
  beforeHero: .6,
  heroLetters: .85,
  heroStagger: .065,
  heroSubtitleAt: .95,
} as const;

export function introBeats() {
  const loadingExit = introSequence.loadingHold;
  const writing = loadingExit + introSequence.loadingExit + introSequence.beforeWriting;
  const greetingExit = writing + introSequence.writing + introSequence.greetingHold;
  const wipe = greetingExit + introSequence.greetingExit;
  const complete = wipe + introSequence.wipe + introSequence.beforeHero;
  return { loadingExit, writing, greetingExit, wipe, complete };
}

export const crossColumns = [2, 1, 0, 1, 2] as const;
