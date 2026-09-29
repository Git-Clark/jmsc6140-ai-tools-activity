# JMSC6140 Activity Portal

A 3-activity classroom web app for JMSC6140 AI & Media Innovation (School of
Future Media, HKU): a subtitle-accuracy checker, a story-pitch builder, and a
"Data Leak Investigation" group exercise. Built with Next.js (App Router),
React, and TypeScript. All state is saved in each browser's local storage —
there is no backend or database.

This project is a faithful port of the working, tested prototype
(published as a Claude Artifact) into a standalone Next.js codebase you can
push to GitHub and deploy yourself.

## Running it locally

You'll need [Node.js](https://nodejs.org) 20 or newer installed.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Putting it on GitHub

1. Create a new, empty repository on GitHub (don't initialize it with a README).
2. In this folder, run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploying with Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with your
   GitHub account.
2. Import the repository you just pushed.
3. Leave every setting on its default (Vercel detects Next.js
   automatically) and click **Deploy**.
4. After a minute or two you'll get a live URL you can share with students.

Any time you push a new commit to the `main` branch, Vercel automatically
rebuilds and redeploys the site.

## Project structure

- `app/` — the Next.js page shell (layout, global styles, the single route).
- `components/` — the three activities (`Module1.tsx`, `Module2.tsx`,
  `components/module3/`) plus shared UI (`Modal.tsx`, `Home.tsx`, `Credits.tsx`,
  the instructions and AI-policy pop-ups).
- `lib/` — plain data and logic with no UI: the Activity 1 scoring engine and
  answer key (`wer.ts`), Activity 2's topics (`module2-data.ts`), Activity 3's
  case-file manifest and answer key (`module3-data.ts`), page copy
  (`content.ts`), and small hooks for theme and local-storage state.
- `public/` — audio clips, the HKU logo (used in the exported PDF), and the
  Activity 3 reveal images.

## Known placeholders (intentional, not bugs)

- **Activity 3's case files are a placeholder list.** The real ~700+ file
  leaked packet has not been uploaded yet; `lib/module3-data.ts` has a
  smaller stand-in manifest students can still search and pick file names
  from. Swap in the real list there once it's ready.
- **Activity 3 Stage 1's "how many files are in the database?" answer key
  is set to 620,** left exactly as-is per the professor's instruction — the
  real packet was later rebuilt to 720 files, and he'll update the check in
  `checkStage1()` inside `components/module3/state.ts` himself when ready.
- **Activity 1's two audio clips** (`public/audio/*.mp3`) were generated to
  match the locked answer-key transcripts in `lib/wer.ts`, so the activity is
  fully testable out of the box. Swap in the real source clips whenever you
  have them, at the same file names.
- The **"Download Case Files"** button in Activity 3 is intentionally
  disabled until the real packet is ready.
