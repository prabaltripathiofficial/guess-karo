import { GAME_SECONDS, POINTS_BY_CLUES } from '../../lib/game.mjs';

export default function Home({ best, onStart }) {
  return (
    <section className="screen home">
      <div className="hero">
        <p className="eyebrow">A {GAME_SECONDS}-second challenge</p>
        <h1>
          Guess the character.
          <br />
          <span className="hl">Funny clues.</span> Zero mercy.
        </h1>
        <p className="lede">
          Read a ridiculous clue, type who it is. Need help? Take another hint, but it costs you points. How many can you
          get before the clock runs out?
        </p>
      </div>

      <div className="start-row">
        <button className="btn start" onClick={onStart} autoFocus>
          Start the clock
        </button>
        {best > 0 && <span className="best-pill">Your best: {best}</span>}
      </div>

      <ol className="how">
        <li>
          <b>Read the clue.</b> Gabbar, Doraemon, Iron Man… anyone from films, TV and cartoons.
        </li>
        <li>
          <b>Type your guess.</b> Small typos are fine. Wrong guesses cost nothing but time.
        </li>
        <li>
          <b>Score fast.</b> Right on the 1st clue: {POINTS_BY_CLUES[0]} points, 2nd: {POINTS_BY_CLUES[1]}, 3rd:{' '}
          {POINTS_BY_CLUES[2]}. Skip anytime.
        </li>
      </ol>
    </section>
  );
}
