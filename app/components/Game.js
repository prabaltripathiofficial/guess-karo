'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import puzzles from '../../lib/puzzles.mjs';
import { GAME_SECONDS, isCorrect, pointsFor, shuffle, summarize } from '../../lib/game.mjs';
import Home from './Home';
import Play from './Play';
import Results from './Results';

const BEST_KEY = 'guess-karo:best';

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {}
}

export default function Game() {
  const [screen, setScreen] = useState('home');
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [cluesSeen, setCluesSeen] = useState(1);
  const [wrong, setWrong] = useState(0);
  const [results, setResults] = useState([]);
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    setBest(readBest());
  }, []);

  const finish = useCallback(
    (all) => {
      if (finished.current) return;
      finished.current = true;
      const score = summarize(all).score;
      const previous = readBest();
      setNewBest(score > previous);
      if (score > previous) saveBest(score);
      setBest(Math.max(score, previous));
      setResults(all);
      setScreen('results');
    },
    [],
  );

  const start = () => {
    finished.current = false;
    setDeck(shuffle(puzzles));
    setIndex(0);
    setCluesSeen(1);
    setWrong(0);
    setResults([]);
    setFeedback(null);
    const t = Date.now();
    setNow(t);
    setEndsAt(t + GAME_SECONDS * 1000);
    setScreen('play');
  };

  const advance = (entry) => {
    const all = [...results, entry];
    setResults(all);
    setCluesSeen(1);
    setWrong(0);
    if (index + 1 >= deck.length) {
      finish(all);
      return;
    }
    setIndex(index + 1);
  };

  useEffect(() => {
    if (screen !== 'play') return undefined;
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, [screen]);

  useEffect(() => {
    if (screen === 'play' && now >= endsAt) {
      finish([...results, { puzzle: deck[index], status: 'timeout', points: 0, cluesSeen, wrong }]);
    }
  }, [screen, now, endsAt, results, deck, index, cluesSeen, wrong, finish]);

  const guess = (text) => {
    const puzzle = deck[index];
    if (isCorrect(text, puzzle)) {
      const points = pointsFor(cluesSeen);
      setFeedback({ kind: 'right', text: `${puzzle.answer}! +${points}`, at: Date.now() });
      advance({ puzzle, status: 'guessed', points, cluesSeen, wrong });
      return true;
    }
    setWrong(wrong + 1);
    setFeedback({ kind: 'wrong', text: `Nope, not “${text}”. Try again or take a hint.`, at: Date.now() });
    return false;
  };

  const hint = () => setCluesSeen((c) => Math.min(c + 1, deck[index].clues.length));

  const skip = () => {
    setFeedback({ kind: 'skip', text: `Skipped. It was ${deck[index].answer}.`, at: Date.now() });
    advance({ puzzle: deck[index], status: 'skipped', points: 0, cluesSeen, wrong });
  };

  if (screen === 'play' && deck[index]) {
    return (
      <Play
        puzzle={deck[index]}
        number={index + 1}
        cluesSeen={cluesSeen}
        secondsLeft={Math.max(0, Math.ceil((endsAt - now) / 1000))}
        fraction={Math.max(0, (endsAt - now) / (GAME_SECONDS * 1000))}
        score={summarize(results).score}
        feedback={feedback}
        onGuess={guess}
        onHint={hint}
        onSkip={skip}
      />
    );
  }

  if (screen === 'results') {
    return <Results results={results} best={best} newBest={newBest} onPlayAgain={start} />;
  }

  return <Home best={best} onStart={start} />;
}
