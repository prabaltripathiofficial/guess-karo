# Guess Karo 🎭

Guess the character from funny clues. You have **90 seconds**. Every right answer scores points, and the fewer hints you use, the more you get.

**Play it now:** https://guess-karo-eta.vercel.app

> **Learning open source?** This repo is built for practice. The game works, but a few things *look* wrong. Play it, spot a design bug, open an issue, and send a pull request. Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## How to play

1. Press **Start the clock**. You have 90 seconds.
2. Read the clue and type who it is. Small typos are fine, and wrong guesses only cost time.
3. Stuck? Open another hint (up to 3), or skip to the next character.
4. Points per right answer:

| Guessed after | Hint 1 | Hint 2 | Hint 3 |
|---|---|---|---|
| Points | 3 | 2 | 1 |

When the clock hits zero you see your score, your accuracy and every character you met. Your best score is saved in your browser.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
git clone https://github.com/prabaltripathiofficial/guess-karo.git
cd guess-karo
npm install
npm run dev
```

Open http://localhost:3000. Changes you save show up in the browser straight away.

Other commands:

```bash
npm test         # run the tests
npm run build    # check that the production build works
```

## What's inside

```
app/layout.js              page frame: fonts, header, footer
app/page.js                the home page
app/components/Game.js     game state: timer, score, which character is next
app/components/Home.js     start screen
app/components/Play.js     clue cards, guess box, hint and skip buttons
app/components/Results.js  score, stats and the list of characters
app/globals.css            all the styles (most design bugs live here)
lib/game.mjs               rules: answer checking, points, summary
lib/puzzles.mjs            the characters and their clues
test/                      tests for the rules
```

Built with [Next.js](https://nextjs.org) and plain CSS.

## Adding a character

Add an entry to `lib/puzzles.mjs` with an `answer`, optional `aliases`, a `from`, and exactly three `clues`, from vague to obvious. Keep the clues funny and friendly. Run `npm test` to check it.

## License

[MIT](LICENSE)
