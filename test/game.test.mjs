import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../lib/puzzles.mjs';
import { GAME_SECONDS, isCorrect, pointsFor, shuffle, summarize } from '../lib/game.mjs';

const find = (answer) => puzzles.find((p) => p.answer === answer);

test('the clock is 90 seconds', () => {
  assert.equal(GAME_SECONDS, 90);
});

test('fewer hints score more: 3, 2, then 1 point', () => {
  assert.deepEqual([1, 2, 3].map(pointsFor), [3, 2, 1]);
  assert.equal(pointsFor(4), 0);
});

test('answers match aliases, case, punctuation and one small typo', () => {
  assert.ok(isCorrect('  THAKUR ', find('Thakur')));
  assert.ok(isCorrect('thakur sahab', find('Thakur')));
  assert.ok(isCorrect('Gabar Singh', find('Gabbar Singh')));
  assert.ok(isCorrect('spiderman', find('Spider-Man')));
  assert.ok(isCorrect('Peter Parker!', find('Spider-Man')));
  assert.ok(!isCorrect('Gabbar', find('Thakur')));
  assert.ok(!isCorrect('', find('Thakur')));
  assert.ok(!isCorrect('pop', find('Poo')));
});

test('every character has an answer, a source and three clues, with no duplicates', () => {
  const seen = new Set();
  for (const p of puzzles) {
    assert.ok(p.answer && p.from, `missing fields in ${JSON.stringify(p)}`);
    assert.equal(p.clues.length, 3, `${p.answer} needs 3 clues`);
    assert.ok(!seen.has(p.answer.toLowerCase()), `duplicate ${p.answer}`);
    seen.add(p.answer.toLowerCase());
  }
});

test('shuffle keeps every character exactly once', () => {
  const out = shuffle(puzzles);
  assert.equal(out.length, puzzles.length);
  assert.deepEqual(new Set(out), new Set(puzzles));
});

test('the summary adds points and counts guesses, skips and accuracy', () => {
  const s = summarize([
    { status: 'guessed', points: 3, wrong: 0 },
    { status: 'guessed', points: 1, wrong: 2 },
    { status: 'skipped', points: 0, wrong: 1 },
    { status: 'timeout', points: 0, wrong: 0 },
  ]);
  assert.deepEqual(s, { score: 4, guessed: 2, skipped: 1, seen: 4, accuracy: 40 });
  assert.equal(summarize([]).accuracy, 0);
});
