import test from 'node:test';
import assert from 'node:assert/strict';
import { introBeats, introSequence, crossColumns } from '../src/lib/introSequence.ts';
import { registerScrollAnchor, resolveScrollAnchor, expertisePosition } from '../src/lib/scrollAnchors.ts';
import { cutoutOrbit, workCutouts } from '../src/lib/workDroplets.ts';

test('the greeting finishes before its upward exit and the stepped wipe holds before hero entry', () => {
  const beats = introBeats();
  assert.ok(beats.writing - (beats.loadingExit + introSequence.loadingExit) >= .75);
  assert.equal(beats.greetingExit - beats.writing, introSequence.writing + introSequence.greetingHold);
  assert.ok(introSequence.writing >= 4);
  assert.ok(introSequence.greetingHold >= 1);
  assert.ok(beats.wipe >= beats.greetingExit + introSequence.greetingExit);
  assert.ok(beats.complete - (beats.wipe + introSequence.wipe) >= .59);
  assert.deepEqual(crossColumns, [...crossColumns].reverse());
  assert.equal(crossColumns[2], 0);
  assert.ok(crossColumns[0] > crossColumns[1] && crossColumns[1] > crossColumns[2]);
  assert.ok(introSequence.heroSubtitleAt > .2 + introSequence.heroLetters * .8);
});

test('horizontal menu targets use refreshed geometry and revert to native anchors on teardown', () => {
  let end = 3500;
  const unregister = registerScrollAnchor('#work-test', () => end);
  assert.equal(resolveScrollAnchor('#work-test'), 3500);
  end = 4100;
  assert.equal(resolveScrollAnchor('#work-test'), 4100);
  unregister();
  assert.equal(resolveScrollAnchor('#work-test'), undefined);
  assert.equal(expertisePosition(2200, 1100, 768), 1868);
  assert.equal(expertisePosition(2200, 700, 900), 2200);
  assert.equal(expertisePosition(0, 1100, 768), 0);
});

test('stale cleanup cannot remove a replacement anchor and invalid offsets fall back', () => {
  const old = registerScrollAnchor('#work-test', () => 100);
  const current = registerScrollAnchor('#work-test', () => 200);
  old();
  assert.equal(resolveScrollAnchor('#work-test'), 200);
  current();
  const invalid = registerScrollAnchor('#work-test', () => NaN);
  assert.equal(resolveScrollAnchor('#work-test'), undefined);
  invalid();
});

test('liquid cutouts cross the letter baseline and loop without damaging the upper glyphs', () => {
  workCutouts.forEach((_, index) => {
    const orbit = cutoutOrbit(index);
    assert.deepEqual(orbit[0], orbit.at(-1));
    assert.ok(orbit.some(point => point.cy < 242));
    assert.ok(orbit.some(point => point.cy > 242));
    orbit.forEach(point => {
      assert.ok(point.cy - point.r > 210);
      assert.ok(point.cx - point.r > 0 && point.cx + point.r < 1000);
    });
  });
});
