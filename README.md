# Chhim Heng Heng — Terminal Portfolio

A personal portfolio website built with a retro **Linux terminal** aesthetic. The page mimics a macOS-style terminal window complete with a boot sequence, animated typing, and section transitions.

---

## Live Preview

Open `index.html` in any modern browser, or serve the folder with a local HTTP server:

```bash
# Python (built-in)
python3 -m http.server 8000
# then open http://localhost:8000

# Node.js
npx http-server
```

No build step is required — all dependencies are loaded from CDN at runtime.

---

## Tech Stack

| Concern | Library / Tool |
|---|---|
| UI framework | [React 18](https://react.dev/) (CDN, UMD build) |
| JSX transpilation | [Babel Standalone](https://babeljs.io/docs/babel-standalone) |
| Animations | [GSAP 3](https://gsap.com/) + `TextPlugin` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) (CDN) + custom CSS |
| Icons | Inline SVG components |

---

## Project Structure

```
portfolio/
├── index.html          # HTML shell — loads all CDN deps and mounts React
├── css/
│   └── styles.css      # Three custom utility classes (glow-text, glow-border, scanline)
└── js/
    ├── app.jsx         # Main React component — all UI and content
    ├── animations.js   # GSAP animation helpers (plain JS, no JSX)
    └── icons.jsx       # Inline SVG icon components
```

### `index.html`

The single HTML page that glues everything together:

- Loads CDN scripts in order: GSAP → Babel → React → ReactDOM → Tailwind.
- Provides `<div id="root">` for React to mount into.
- Adds a full-screen `<div class="scanline">` overlay that creates the CRT scanline effect.
- Includes `js/animations.js` as a plain `<script>` (must load *before* the Babel script so that `createBootTimeline` etc. are in scope).
- Includes `js/icons.jsx` and `js/app.jsx` as `<script type="text/babel">` so Babel can transpile JSX in the browser.

### `css/styles.css`

Contains three classes used throughout `app.jsx`:

| Class | Purpose |
|---|---|
| `.glow-text` | Green neon `text-shadow` on the name heading |
| `.glow-border` | Green neon `box-shadow` on the active nav tab |
| `.scanline` | Fixed full-viewport overlay with a repeating gradient that mimics CRT scan lines |

### `js/icons.jsx`

Pure SVG functional components — no external icon library dependency:

- `Terminal` — nav tab icon for *About*
- `Code` — nav tab icon for *Skills*
- `Briefcase` — nav tab icon for *Projects*
- `GraduationCap` — nav tab icon for *Education*
- `Mail` — contact link
- `Phone` — (defined but not used in current UI)
- `Linkedin` — contact link
- `ChevronRight` — section command prompt indicator

### `js/animations.js`

Plain JavaScript module (no JSX) that exports three GSAP-powered functions. It is loaded before React boots so the functions are available globally.

#### `createBootTimeline(refs, onComplete)`

Orchestrates the startup animation sequence. Called once on mount via `useEffect`.

| Step | What happens |
|---|---|
| 1 | Terminal container scales from 0.8 → 1 and fades in |
| 2 | Traffic-light title-bar dots pop in with a spring ease |
| 3 | Boot log lines stagger in from the left, then fade out |
| 4 | `$ whoami` is typed character-by-character using `TextPlugin` |
| 5 | Blinking block cursor appears |
| 6 | Name slides up and skews in, then pulses with a green glow |
| 7 | Subtitle fades in below the name |
| 8 | Contact links slide in from the left with a stagger |
| 9 | Nav buttons scale/fade in with a stagger |
| 10 | Content area and footer fade in; `onComplete` fires → `setBootComplete(true)` |

**Parameters:**
- `refs` — object containing DOM refs for every animated element (passed from `app.jsx`).
- `onComplete` — callback invoked when the full sequence finishes (used to flip the `bootComplete` state flag).

#### `createSectionTransition(contentEl)`

Runs whenever `activeSection` changes (after boot is complete). Uses `gsap.context()` so all selectors are scoped to `contentEl` and the context can be cleanly reverted when the section unmounts.

| Selector | Animation |
|---|---|
| `.section-cmd` | Slides in from the left |
| `.content-card` | Fades + scales up, staggered |
| `.skill-tag` | Scales from 0 with a spring |
| `.project-bullet` | Slides in from the left |
| `.tech-tag` | Fades up |

#### `animateNavHover(element, isEnter)`

Scales a nav button to `1.05` on mouse-enter and back to `1` on mouse-leave.

### `js/app.jsx`

The single React component `PortfolioTerminal` that renders the entire UI.

**State:**

| Variable | Type | Purpose |
|---|---|---|
| `activeSection` | `string` | Which of the four content sections is visible (`'about'` \| `'skills'` \| `'projects'` \| `'education'`) |
| `bootComplete` | `boolean` | Set to `true` when the boot animation finishes; gates section-transition animations |

**Refs** — one `useRef` per animated DOM element, passed to `createBootTimeline`.

**Effects:**

1. `useEffect(() => { createBootTimeline(…) }, [])` — runs once on mount.
2. `useEffect(() => { createSectionTransition(…) }, [activeSection, bootComplete])` — re-runs every time the active section changes.

**Sections** (`sections` object):

| Key | Tab label | Icon |
|---|---|---|
| `about` | `about.sh` | `Terminal` |
| `skills` | `skills.json` | `Code` |
| `projects` | `projects.log` | `Briefcase` |
| `education` | `education.txt` | `GraduationCap` |

**Content rendered per section:**

- **About** — Two short paragraphs describing focus areas (Full-Stack Engineering + AI/ML).
- **Skills** — Five `content-card` grids: *Programming Languages*, *Web Development*, *Cloud & DevOps*, *Tools & Technologies*, *Database*. Each skill renders as a `.skill-tag` span.
- **Projects** — One featured card: *Peer to Peer Lending Marketplace Platform* (Laravel + Nuxt.js, Backend Developer role). Each bullet point uses the `.project-bullet` class for the slide-in animation.
- **Education** — Three cards: BSc Computer Science (Paragon International University, exp. 2028), GEP 12 (ACE), High School Baccalaureate (Preah Sisowath).

---

## How Animations & React Connect

```
index.html
  └─ loads js/animations.js   (global functions: createBootTimeline, ...)
  └─ loads js/icons.jsx       (global SVG components)
  └─ loads js/app.jsx
       └─ PortfolioTerminal mounts
            ├─ useEffect (mount)  → createBootTimeline(refs, () => setBootComplete(true))
            └─ useEffect (update) → createSectionTransition(contentRef.current)
                                    (scoped to content div, reverted on cleanup)
```

GSAP operates directly on DOM nodes via refs — React never re-renders elements to change visual state during animations; GSAP mutates styles/transforms directly. React's role is limited to swapping section content and toggling Tailwind classes on the active nav button.

---

## Extending the Portfolio

### Add a new section

1. Add an entry to the `sections` object in `app.jsx`:
   ```js
   contact: { title: 'contact.sh', icon: <Mail /> }
   ```
2. Add a conditional render block inside the `<div ref={contentRef}>`:
   ```jsx
   {activeSection === 'contact' && (
       <div className="space-y-4">
           <div className="section-cmd …"> … </div>
           <div className="content-card …"> … </div>
       </div>
   )}
   ```
   The section-transition animation picks up `.section-cmd` and `.content-card` automatically.

### Add a new skill category

Inside the `skills` conditional, copy one of the existing `content-card` `<div>` blocks and update the heading and the array passed to `.map()`.

### Change the color theme

The green palette comes from Tailwind's `green-*` / `cyan-*` utilities and from the `rgba(74, 222, 128, …)` values hardcoded in `animations.js` and `styles.css`. To switch to a different color, update both sources.
