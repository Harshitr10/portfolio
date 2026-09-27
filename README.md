# Harshit Rai — Portfolio (React + Vite)

## Run it

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for deployment

```bash
npm run build
```

Outputs a static site to `dist/` — deploy that folder to Vercel, Netlify,
GitHub Pages, or your own domain (e.g. `harshitr10.in`).

## Structure

- `src/App.jsx` — the whole page (hero, experience, projects, skills,
  education, contact)
- `src/components/ScatteredTechStack.jsx` — the scattered background
  logos, pulled live from the Simple Icons CDN (see notes in that file
  about the Java/Spring AI icon situation)
- `src/index.css` — theme tokens, animations, hover states
- `public/photo.png` — your photo
- `public/Harshit_Rai_Resume.pdf` — your résumé, served at `/Harshit_Rai_Resume.pdf`

## To edit

- **Colors**: CSS custom properties at the top of `src/index.css`
  (`--bg`, `--ink`, `--accent`, `--muted`, `--line`, `--panel`)
- **Content**: plain text/JSX in `src/App.jsx` — no CMS, just edit directly
- **Fonts**: Google Fonts `<link>` in `index.html`
