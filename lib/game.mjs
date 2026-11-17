export const GAME_SECONDS = 90;
export const POINTS_BY_CLUES = [3, 2, 1];

export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const up = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = up;
    }
  }
  return row[b.length];
}

export function isCorrect(guess, puzzle) {
  const g = normalize(guess);
  if (!g) return false;
  const answers = [puzzle.answer, ...(puzzle.aliases || [])].map(normalize);
  return answers.some((a) => a === g || (a.length >= 5 && distance(a, g) <= 1));
}

export function pointsFor(cluesSeen) {
  return POINTS_BY_CLUES[cluesSeen - 1] || 0;
}

export function shuffle(list, random = Math.random) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function summarize(results) {
  const guessed = results.filter((r) => r.status === 'guessed');
  const attempted = results.filter((r) => r.status !== 'unseen');
  const wrong = results.reduce((sum, r) => sum + r.wrong, 0);
  const tries = guessed.length + wrong;
  return {
    score: guessed.reduce((sum, r) => sum + r.points, 0),
    guessed: guessed.length,
    skipped: results.filter((r) => r.status === 'skipped').length,
    seen: attempted.length,
    accuracy: tries === 0 ? 0 : Math.round((guessed.length / tries) * 100),
  };
}
