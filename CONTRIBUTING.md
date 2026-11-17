# Contributing to Guess Karo

Thanks for helping! This project is a practice ground for your first open-source contribution. The game works, but some screens have **design bugs**: things that look broken, hard to read, or out of place. Your job is to find one, report it, and fix it.

Only change how things **look** (CSS and the text or markup in `app/`). Please don't change the game rules in a design fix.

## 1. Find a design bug

Run the game (see the [README](README.md)) and play a few rounds. Try it:

- on a laptop **and** at phone width (browser DevTools → device toolbar),
- right up to the last 10 seconds,
- until the results screen,
- using only the keyboard (Tab and Enter).

Look for anything that seems off: text you can't read, things that overlap or don't line up, typos, odd colours.

## 2. Check it isn't already reported

Search the [issues](../../issues) and [pull requests](../../pulls), including closed ones. If someone already reported it, don't open a duplicate. Pick another bug.

## 3. Open an issue

Click **New issue → Design bug** and fill in:

- which screen it's on,
- what you see and what you expected,
- your device or screen width,
- a **screenshot**.

## 4. Claim it

Comment “I’d like to work on this” on the issue and wait for a maintainer to assign you. One person per issue keeps things fair.

## 5. Fix it

```bash
# fork the repo on GitHub first (top-right "Fork" button), then:
git clone https://github.com/<your-username>/guess-karo.git
cd guess-karo
git remote add upstream https://github.com/prabaltripathiofficial/guess-karo.git
git checkout -b fix/<short-description>      # e.g. fix/start-button-contrast
npm install
npm run dev                                   # http://localhost:3000
```

Make your change. The page reloads on its own. Check it on a laptop and at phone width, then run:

```bash
npm test
npm run build
```

## 6. Commit and push

Use a short, clear commit message that starts with `fix:`

```bash
git add app/globals.css
git commit -m "fix: make the start button's text readable"
git push origin fix/<short-description>
```

## 7. Open a pull request

On GitHub, open a pull request from your branch. In the description:

- write `Fixes #<issue number>` so the issue closes when it's merged,
- add **before and after screenshots**,
- keep it to **one bug per pull request**.

A maintainer will review it. If they ask for changes, push more commits to the same branch, and the pull request updates on its own.

## Keeping your fork up to date

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

## Tips

- Keep the change small. Don't reformat files or touch unrelated lines.
- Use the existing colours from the `:root` variables at the top of `app/globals.css`.
- Be kind in comments. Everyone here is learning. See the [Code of Conduct](CODE_OF_CONDUCT.md).
