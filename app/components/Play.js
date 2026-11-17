'use client';

import { useEffect, useRef, useState } from 'react';
import { pointsFor } from '../../lib/game.mjs';

export default function Play({ puzzle, number, cluesSeen, secondsLeft, fraction, score, feedback, onGuess, onHint, onSkip }) {
  const [text, setText] = useState('');
  const [shake, setShake] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    setText('');
    input.current?.focus();
  }, [puzzle]);

  useEffect(() => {
    if (feedback?.kind !== 'wrong') return undefined;
    setShake(true);
    const t = setTimeout(() => setShake(false), 400);
    return () => clearTimeout(t);
  }, [feedback]);

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    if (onGuess(value)) setText('');
    else input.current?.select();
  };

  const low = secondsLeft <= 10;

  return (
    <section className="screen play">
      <div className="play-head">
        <div>
          <p className="eyebrow">Character #{number}</p>
          <p className="score-now">
            Score <b>{score}</b>
          </p>
        </div>
        <p className={`timer${low ? ' low' : ''}`} aria-live="off">
          {secondsLeft}s
        </p>
      </div>
      <div className={`timer-bar${low ? ' low' : ''}`}>
        <span style={{ width: `${fraction * 100}%` }} />
      </div>

      <div className="hints">
        {puzzle.clues.map((clue, i) =>
          i < cluesSeen ? (
            <div key={i} className="hint">
              <span className="label">Hint {i + 1}</span>
              <p>{clue}</p>
            </div>
          ) : (
            <div key={i} className="hint locked">
              <span className="label">Hint {i + 1}</span>
              <p>
                Locked. Opening it makes this one worth {pointsFor(i + 1)} {pointsFor(i + 1) === 1 ? 'point' : 'points'}.
              </p>
            </div>
          ),
        )}
      </div>

      <form className={`answer-row${shake ? ' shake' : ''}`} onSubmit={submit} autoComplete="off">
        <input
          ref={input}
          className="answer-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={60}
          placeholder="Who is it?"
          aria-label="Your guess"
        />
        <button className="btn primary" type="submit">
          Guess
        </button>
        <button className="btn skip" type="button" onClick={onSkip}>
          Skip
        </button>
      </form>

      <div className="play-actions">
        <button className="btn ghost" type="button" onClick={onHint} disabled={cluesSeen >= puzzle.clues.length}>
          {cluesSeen >= puzzle.clues.length
            ? 'No more hints'
            : `Show hint ${cluesSeen + 1} (drops to ${pointsFor(cluesSeen + 1)} ${pointsFor(cluesSeen + 1) === 1 ? 'point' : 'points'})`}
        </button>
        <span className="worth">
          Right now worth <b>{pointsFor(cluesSeen)}</b>
        </span>
      </div>

      {feedback && (
        <p key={feedback.at} className={`feedback ${feedback.kind}`} role="status">
          {feedback.text}
        </p>
      )}
    </section>
  );
}
