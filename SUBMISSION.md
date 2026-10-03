# Submission Handoff Guide

## Live app

Existing deployment URL:

https://airbnb-clone-umber-two.vercel.app/

If this URL is unavailable or belongs to an older deployment, deploy the current project again using the steps below.

## Create the upload zip

The prepared archive is:

`C:\Users\tirth\airbnb-clone-submission.zip`

It includes the project source, public assets, documentation, AI configuration, prompt history, and architecture diagram. It excludes `node_modules/` and `dist/`.

## Upload checklist

1. Upload `airbnb-clone-submission.zip` to the assignment portal.
2. Confirm the archive contains:
   - `README.md`
   - `ARCHITECTURE.md`
   - `architecture-diagram.svg`
   - `PROMPT.md`
   - `PROMPT_LOG.md`
   - `AGENTS.md`
   - `src/`
   - `public/`
   - `package.json`
   - `package-lock.json`
3. Do not upload `node_modules/`.
4. Include the live URL in the portal's demo/link field or submission notes.

## Deploy the current project to Vercel

1. Open https://vercel.com/new.
2. Import the project folder or push the project to a Git repository first.
3. Use these build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy the project.
5. Open the generated Vercel URL and confirm the listing page loads.
6. Submit that generated URL with the zip file.

The included `vercel.json` supports SPA fallback routing for the static Vite app.

## Local final check

```powershell
cd C:\Users\tirth\airbnb-clone
npm install
npm run lint
npm run build
npm run dev -- --host 127.0.0.1
```

Then open `http://127.0.0.1:5173/`.
