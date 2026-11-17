'use client';

import { useState } from 'react';
import { GAME_SECONDS, summarize } from '../../lib/game.mjs';

const STATUS = {
  guessed: 'Got it',
  skipped: 'Skipped',
  timeout: 'Time ran out',
};

export default function Results({ results, best, newBest, onPlayAgain }) {
  const [copied, setCopied] = useState(false);
  const s = summarize(results);

  const share = async () => {
    const text = `I scored ${s.score} in Guess Karo: ${s.guessed} characters in ${GAME_SECONDS} seconds. Can you beat me?`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="screen results">
      <div className="card score-card">
        <p className="eyebrow">Time’s up!</p>
        <p className="score-big">{s.score}</p>
        <p className="muted">points</p>
        <div className="best-row">
          <span className="best-badge">{newBest ? 'NEW' : 'BEST'}</span>
          <span>{newBest ? 'A new personal best!' : `Your best is ${best}`}</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <b>{s.guessed}</b>
          <span>Guessed</span>
        </div>
        <div className="stat">
          <b>{s.skipped}</b>
          <span>Skipped</span>
        </div>
        <div className="stat">
          <b>{s.seen}</b>
          <span>Characters seen</span>
        </div>
        <div className="stat">
          <b>{s.accuracy}%</b>
          <span>Acuracy</span>
        </div>
      </div>

      <div className="card">
        <h3>Your round</h3>
        <ol className="result-list">
          {results.map((r, i) => (
            <li key={i} className={`result-row ${r.status}`}>
              <div className="who">
                <b>{r.puzzle.answer}</b>
                <span className="from">{r.puzzle.from}</span>
              </div>
              <span className="chip">
                {STATUS[r.status]}
                {r.status === 'guessed' && ` · hint ${r.cluesSeen}`}
              </span>
              <span className="pts">+{r.points}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="end-actions">
        <button className="btn primary big" onClick={onPlayAgain}>
          Play again
        </button>
        <button className="btn" onClick={share}>
          {copied ? 'Copied!' : 'Copy my score'}
        </button>
      </div>
    </section>
  );
}
