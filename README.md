# lucasfranca — portfolio

Single-page developer portfolio for Lucas Franca. Static files, no build step:
Three.js loads from a CDN via an import map.

One particle field runs behind the whole page and reorganizes as you scroll
into the shape of each career chapter — constellation (hero), quorum ring
(Agora governance), execution lattice (TakeAIt), d20 wireframe (onchain
games) — then back to the constellation.

## Run

Any static server, e.g.:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. (A server is needed because `main.js` is an
ES module; `file://` won't work.)

## Deploy

Live at https://lucasfranca.dev — a Railway service connected to this repo. Every push to `main` auto-deploys. No config
files needed; Railway serves the static files as-is.

## Files

- `index.html` — all content and copy
- `style.css` — design tokens at the top of `:root`
- `main.js` — the Three.js scene: formations, scroll-driven morphing, shaders
- `resume/` — downloadable PDF résumés
