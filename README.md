# INFINIDRA

An endless, deterministic universe of digital identities. Static site: `index.html`, `style.css`, `script.js`. No backend, no dependencies, no network requests.

## Publish on GitHub Pages

1. Create a new public repository on GitHub (e.g. `infinidra`).
2. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root (**Add file → Upload files**), then commit.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select branch `main` and folder `/ (root)`, and save.
4. After a minute your site is live at `https://<your-username>.github.io/infinidra/`.

Any static host (Netlify, Cloudflare Pages, a plain web server) works the same way.

## How it works

- **Identifiers** are exact decimal strings. No `Number` or rounding is involved, so no digit is ever truncated, and there is no length limit. Stepping to the next or previous profile uses exact string arithmetic.
- **Identity derivation:** the complete identifier (plus its length and a generator-version tag) is hashed to 128 bits and seeds a PRNG. That PRNG drives the name (syllable and ending grammar), palette, one of seven structurally different SVG archetypes, the radial emblem and the description. A given identifier yields the same identity on every device and session, independent of scroll position or order of visits. Visiting `#<id>` reproduces it.
- **Uniqueness:** collisions are not mathematically excluded. A 128-bit hash over a very large combinatorial space makes accidental duplicates extremely unlikely, but this is probabilistic, not a guarantee.
- **Infinite feed:** each profile occupies one fixed-height row. Only the rows around the viewport exist in the DOM (about 8–10). Rows are appended ahead of the reader, trimmed behind, and the scroll offset is corrected by exactly one row height per trim, so position is preserved. Going upward re-creates lower identifiers until identifier 1 is reached. Nothing ever ends in the downward direction.
- **Search:** the search icon in the top-right opens a field. Any positive integer is accepted. The feed is rebuilt around that identifier directly, with no scrolling through earlier profiles. Zero, negatives and non-digits show an inline message. Leading zeros are dropped (`007` → `7`).
- **Performance:** there are no animation loops, timers or libraries. Work happens only on scroll (throttled with `requestAnimationFrame`) and on debounced resize. A fade-in is disabled under `prefers-reduced-motion`.

Changing any generation rule changes identities, so bump the `INFINIDRA/1` version tag in `script.js` if you do.

## Testing note

Verify in your own browser: scroll fast (no blank gaps), search `1`, `999999` and a 1000-digit number, reload a `#<id>` URL, and check the console. DevTools → Elements should keep a small, constant number of `article` nodes during long sessions. Momentum scrolling on some iOS versions can briefly stutter when rows are trimmed.
