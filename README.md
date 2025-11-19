# HCER Relationship Typology Quiz

An opinionated, single-page quiz that helps people discover their four-letter HCER relationship type (Hope, Connection, Expression, Resolution). Everything is vanilla HTML/CSS/JS and deploys cleanly to GitHub Pages.

---

## Live Demo

https://liu00david.github.io/personalityquiz  
(Update the URL if you fork this project.)

---

## What’s inside

- **50 Likert questions** that map to four weighted dimensions (Idealist/Realist, Physical/Emotional, Social/Private, Forgiving/Critical).
- **Real-time scoring** in `quiz.js`; results persist in `sessionStorage` and flow straight into `results.html`.
- **Pixel avatar generator** that paints an 8×8 grid with trait colors defined in `colors.css`.
- **Dimension breakdowns** with dominant/balanced callouts plus long-form archetype copy from `questions.js`.
- **Shareable PNG export** built on `<canvas>` so users can download or share their result.
- **Responsive styling** handled in `styles.css` with a centralized palette in `colors.css`.

---

## Directory overview

```
personality-quiz/
├── index.html          # Quiz UI + Likert flow
├── quiz.js             # Question rendering, scoring, storage
├── results.html        # Results layout
├── results.js          # Avatar, breakdowns, sharing logic
├── questions.js        # Question bank + 16 type descriptions
├── colors.css          # Brand + trait color tokens
├── styles.css          # Global styles and responsive rules
├── PERSONALITY.md      # HCER framework explainer
└── README.md           # You are here
```

No bundler or build step—open `index.html` in a browser or run a tiny static server for live reload.

```bash
python -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`.

---

## Customizing the quiz

| Task | Where to edit | Notes |
|------|---------------|-------|
| Update questions / weights | `questions.js` | Each object has `text` plus a `[IR, PE, SV, FC]` weight array. |
| Rewrite archetypes | `typeDescriptions` in `questions.js` | Content feeds both results copy and documentation. |
| Tweak colors | `colors.css` | Trait colors power avatars, bars, and docs—update once, use everywhere. |
| Change layout | `styles.css` | Uses CSS variables heavily; responsive blocks at the bottom. |
| Modify sharing output | `shareResults()` in `results.js` | Canvas dimensions, fonts, and colors are easy to adjust. |

For deeper framework details (dimensions, color mapping, and type summaries) see `PERSONALITY.md`.

---

## Deployment (GitHub Pages)

1. Push the repo to GitHub.  
2. Repo **Settings → Pages**.  
3. Choose the `main` branch and root folder, save.  
4. After Pages finishes building, your site is live at `https://<username>.github.io/<repo>/`.

Because everything is client-side, no extra configuration is required.

---

## License

MIT — remix, restyle, and extend as long as you keep the attribution.

Colors reference for quick copy/paste:  
`I #ffc6ff · R #caffbf · P #ffadad · E #bdb2ff · S #ffd6a5 · V #9bf6ff · F #a0c4ff · C #fdffb6`