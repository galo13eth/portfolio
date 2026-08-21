# lucasfranca.dev

![The portfolio hero: a particle constellation beside the name Lucas Franca](docs/screenshot.png)

**Live: [lucasfranca.dev](https://lucasfranca.dev)**

Single-page developer portfolio. Static files, no build step: Three.js loads
from a CDN via an import map. The proof-forward layout pairs the particle
identity with a public flagship, live release evidence, and scannable work
cards on desktop without changing the single-column mobile reading order.

One particle field runs behind the whole page and reorganizes as you scroll
into the shape of each career chapter — constellation (hero), quorum ring
(governance), execution lattice (agent platform), d20 wireframe (onchain
games) — then back to the constellation.

## Run

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. (A server is needed because `main.js` is an
ES module; `file://` won't work.)

## Validate

```sh
cd tests
npm install
npm run validate   # html-validate on index.html
npm run links      # internal link/asset check
npm test           # Playwright smoke: desktop + mobile, axe accessibility scan
```

(Tooling lives in `tests/` so the repo root stays a plain static site —
Railway's static deploy breaks if a `package.json` sits at the root.)

The same three checks run in CI on every push.

## Accessibility & motion

- The canvas is `aria-hidden` and never intercepts input; all content is
  plain HTML that works without WebGL or JavaScript.
- The flagship status panel validates the public `evm-migration-lab`
  `status.json` before rendering it and retains static release links when the
  artifact is unavailable.
- `prefers-reduced-motion`: the continuous render loop is replaced by
  single frames on scroll — no ambient drift, no idle spin.
- Rendering pauses when the tab is hidden.
- Case studies use native `<details>` — no JS.
- Visible keyboard focus throughout.

## Performance decisions

- Particle count derives from the lattice grid: 2,496 on desktop, ~1,000 on
  narrow viewports; device pixel ratio is clamped to 2.
- Formation morphs are computed in the vertex shader from two buffered
  attribute sets; the CPU rebuffers only when the scroll segment changes.
- No post-processing — additive blending and soft sprites do the glow.

## Browser support

Any evergreen browser with WebGL. Without WebGL the page renders as a
readable static document.

## Deploy

A Railway service is connected to this repo; every push to `main`
auto-deploys. No config files needed — the static files are served as-is.

## Files

- `index.html` — all content, copy, and metadata
- `style.css` — design tokens at the top of `:root`
- `main.js` — the Three.js scene: formations, scroll-driven morphing, shaders
- `status.js` — validated public flagship status with fail-safe fallback
- `assets/` — locally hosted public project evidence
- `resume/` — downloadable PDF résumés
- `tests/` — Playwright smoke tests

## License

MIT — see [LICENSE](LICENSE).
