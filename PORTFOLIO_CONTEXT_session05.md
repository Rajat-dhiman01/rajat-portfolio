# Portfolio — Master Context File
# For AI Assistant — Read This Entire File Before Doing Anything

Generated: 2026-04-10
Last completed session: Session 04 — All sections built. Bugs identified. Polish items queued.

---

## AI Behaviour Instructions
You are a senior frontend engineer working on Rajat Dhiman's personal portfolio — a portfolio-quality, production-grade website targeting full-time SDE and AI engineering roles.

### Rules you must follow without exception:
- Work step by step. One section at a time. Show a plan first. Wait for confirmation before writing any code.
- Never create UI elements from scratch. Always use shadcn/ui or Aceternity UI components. Tell Rajat which component to install and how, then build on top of it.
- Never use emojis as icons anywhere. Use real icon libraries only. See Icon Sources section below. Always ask Rajat which icon he wants before using one.
- Never use project placeholder logos. Always ask Rajat to provide the real logo file for each project before building the project card.
- Never guess at file contents. If you need to see a file, ask Rajat to paste it.
- Always explain what changed and why after providing code — not before.
- Mobile-first, responsive from day one. Every single component must work perfectly at 390px. Test mentally at 390px, 768px, and 1440px before finalising any code.
- Smooth is non-negotiable. Every animation must use Framer Motion. No janky CSS transitions on layout-critical elements. All scroll reveals, page transitions, and hover states must feel premium.
- Never use AI-slop fonts. Fonts are locked: Playfair Display (headings) + JetBrains Mono (labels/tags/mono details) + DM Sans (body). Never suggest Inter, Roboto, Arial, Space Grotesk, or system fonts.
- Never use color accents. Design language is strictly: `#060608` background, white text, muted grays, glassmorphism. No purple gradients, no blue accents, no rainbow pills.
- Never redo something already marked Complete in this context file.
- Always use shadcn and Aceternity components. When a new UI element is needed, look up the correct shadcn or Aceternity component first, provide the install command, and then build on top of it.
- Always ask before picking icons. Suggest 2-3 icon options from the approved sources, show the name, and let Rajat choose.
- Security first. EmailJS keys go in `.env`. Never hardcode keys. Never commit `.env`.
- The production domain is [Rajat's custom domain]. Update this when domain is confirmed.
- vercel.json goes in project root for this project (not inside a subfolder).
- This website must be smooth and fully responsive from Session 1, Day 1. Not a future concern — a day-one requirement.
- CRITICAL — always ask for file contents before writing fix code. Do not guess. If a fix is needed, say "paste your current X file" first.
- CRITICAL — always give complete file replacements, never partial snippets that require the user to find-and-replace inside a broken file. Partial edits have caused cascading corruption in Session 02.
- CRITICAL — before writing any code, mentally check for JSX syntax errors. Every `<a` tag must have the `<` character. Every arrow function inside JSX props must use `{ }` body syntax.
- CRITICAL — Aceternity registry is now auth-gated. Do NOT attempt `npx shadcn@latest add https://ui.aceternity.com/...` — it returns 401 Unauthorized. Always create Aceternity component files manually using `New-Item` and paste clean code directly.
- CRITICAL — never use `motion/react` import anywhere. Always use `framer-motion`. The standalone `motion` package conflicts with `framer-motion` and crashes React's hook dispatcher. See Session 03 bug history for full explanation.
- CRITICAL — after installing any new Aceternity component, check its import line. If it says `from "motion/react"`, replace with `from "framer-motion"` immediately before using it.
- CRITICAL — the card border glow (useCardGlow) in Projects.jsx bleeds outside the left edge of cards. This is a known bug — fix is Priority 1 next session. The `inset: "-1px"` on the glow div combined with the grid layout causes overflow on the left. Fix by adding `overflow: hidden` to the grid container or switching to `outline` approach. Ask Rajat to paste Projects.jsx before fixing.
- CRITICAL — Stars background is NOT yet implemented. Rajat wants animated twinkling stars in the background of every dark section (bg and bg2). Build a `Stars` component in `src/components/ui/stars.jsx` — pure CSS, no external package, similar pattern to Meteors. Add it to Hero, About, Projects, ProblemSolver, Contact, WhatIBuild sections.

---

## Icon Sources — Approved List
Always use icons from these sources only. Never use emojis. Always ask Rajat which icon he prefers before using one.

| Source | Best for | URL |
|---|---|---|
| Lucide React | UI icons — nav, buttons, arrows, social | https://lucide.dev/icons |
| Tabler Icons | General purpose — clean, consistent stroke | https://tabler.io/icons |
| Simple Icons | Brand logos — GitHub, Twitter/X, LeetCode, Firebase, React, etc. | https://simpleicons.org |
| Iconify | Massive library — covers everything | https://icon-sets.iconify.design |
| Phosphor Icons | Expressive UI icons — multiple weights | https://phosphoricons.com |

Installed icon packages (already done — do not reinstall):
```bash
npm install @icons-pack/react-simple-icons   # Simple Icons — SiGithub etc.
npm install @tabler/icons-react              # Tabler — IconMenu2, IconX etc.
# lucide-react already installed with shadcn
```

---

## Project Identity
| Field | Value |
|---|---|
| Project Name | Rajat Dhiman — Portfolio |
| Type | Personal portfolio website |
| Purpose | Impress recruiters for full-time SDE + AI/Full-Stack engineering roles |
| Target users | Recruiters, hiring managers, tech leads |
| Portfolio goal | Show production-grade projects, AI engineering depth, DSA problem-solving mindset |
| Project root path | `F:\RAJAT\portfolio-root\Rajat_dhiman` |
| OS | Windows 11 |
| Editor | VS Code |
| Terminal | PowerShell |
| Frontend runs on | `http://localhost:5173` (dev) |
| GitHub repo | `https://github.com/Rajat-dhiman01/rajat-portfolio.git` |
| Production domain | `[Rajat's custom domain — fill in before deployment session]` |

---

## How To Run
```powershell
# Install dependencies
npm install

# Start dev server
npm run dev
```
Open browser at `http://localhost:5173`
If you get a hook crash or blank white screen:
```powershell
# Step 1 — kill dev server (Ctrl+C)
# Step 2 — clear Vite cache
Remove-Item -Recurse -Force node_modules\.vite
# Step 3 — restart
npm run dev
```

---

## Design System — Locked In
### Colors
```css
--bg:       #060608   /* page background */
--bg2:      #0d0d10   /* alternate section bg */
--bg3:      #13131a   /* card inner bg */
--border:   #1e1e28   /* default border */
--border2:  #2a2a38   /* hover border */
--white:    #ffffff
--muted:    #6b6b80   /* secondary text */
--muted2:   #3a3a50   /* placeholder / disabled */
--glass:    rgba(255,255,255,0.03)
--glass2:   rgba(255,255,255,0.06)
```

### Typography
| Role | Font | Weight |
|---|---|---|
| Headings / Display | Playfair Display | 700, 900 |
| Labels / Tags / Mono details | JetBrains Mono | 300, 400, 500 |
| Body / UI text | DM Sans | 300, 400, 500 |

Never use: Inter, Roboto, Arial, Space Grotesk, system-ui, or any other font.

### Motion Rules
- All scroll reveals: Framer Motion `fadeInUp` — `y: 30 → 0`, `opacity: 0 → 1`, `duration: 0.7`
- Stagger children: `0.1s` between items
- Hover states: `duration: 0.2s`
- Page load: staggered hero reveal
- 3D tilt on project cards: `rotateX` + `rotateY` via `useMotionValue` in Framer Motion
- Navbar blur: triggered at `scrollY > 50`
- All animations must feel smooth — never janky, never abrupt
- Always wrap Framer Motion animations with `useReducedMotion()` check — accessibility requirement

### Glassmorphism Recipe
```css
background: rgba(255,255,255,0.03);
border: 1px solid #1e1e28;
border-radius: 16px;
backdrop-filter: blur(12px);
```

### Card Glow Recipe (useCardGlow — in Projects.jsx)
```
A conic-gradient ring that rotates to follow cursor angle.
Only paints the 1px border track using CSS mask-composite.
Variables: --ga (angle in deg), --go (opacity 0 or 1).
BUG: glow div bleeds outside left edge — fix in Session 05.
```

---

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Aceternity UI |
| Animations | Framer Motion |
| Icons | Lucide React + Tabler Icons + Simple Icons |
| Contact form | EmailJS (keys not wired yet — Session 06) |
| Fonts | Google Fonts (Playfair Display, JetBrains Mono, DM Sans) |
| Hosting | Vercel |
| Domain | Custom domain (Rajat's) |

### Important — Tailwind v4 note
This project uses Tailwind CSS v4. There is NO `tailwind.config.js` file. Custom keyframes and utility classes go directly in `src/index.css` using standard CSS, not in a config file.

### Important — Aceternity registry note
Aceternity's shadcn registry (`ui.aceternity.com/registry/...`) now requires authentication and returns 401 Unauthorized. Never attempt to install via the registry. Always create the file manually with `New-Item` and paste clean converted code (TypeScript stripped, `motion/react` → `framer-motion`).

---

## File Structure — Current State
```
F:\RAJAT\portfolio-root\Rajat_dhiman\
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── meteors.jsx             ← ✅ Done — Aceternity, framer-motion, clean JSX
│   │   │   ├── typewriter-effect.jsx   ← ✅ Done — converted from .tsx, motion/react fixed
│   │   │   ├── 3d-card.jsx             ← ✅ Done — Aceternity, manually created Session 03
│   │   │   ├── glowing-effect.jsx      ← ✅ Done — Aceternity, manually created Session 03
│   │   │   └── button.tsx              ← ✅ shadcn button
│   │   ├── Navbar.jsx                  ← ✅ Complete — 0 errors, blur on scroll, mobile menu
│   │   ├── Hero.jsx                    ← ✅ Complete — meteors bg, typewriter, CTAs, scroll indicator
│   │   ├── About.jsx                   ← ✅ Complete — photo ring, two-col, stats, meteors bg
│   │   ├── Projects.jsx                ← ✅ Built — ⚠️ card glow bleeds left edge (bug, fix Session 05)
│   │   ├── Skills.jsx                  ← ✅ Built — skill groups, animated bars
│   │   ├── ProblemSolver.jsx           ← ✅ Built — LeetCode card, two-column layout
│   │   ├── WhatIBuild.jsx              ← ✅ Built — 3 cards, meteors bg
│   │   ├── Contact.jsx                 ← ✅ Built — social links, form, toast notification
│   │   └── Footer.jsx                  ← ✅ Built — name, copyright, nav links
│   ├── data/
│   │   ├── projects.js                 ← ✅ Done — 2 projects (NotesMind, Yatri Baba)
│   │   ├── skills.js                   ← ✅ Done
│   │   └── socials.js                  ← ✅ Done — all real values filled in
│   ├── lib/
│   │   └── utils.ts                    ← ✅ Done — cn() utility
│   ├── assets/
│   │   └── logos/                      ← ⚠️ Yatri Baba logo needed at /assets/logos/yatribaba-logo.png
│   ├── App.jsx                         ← ✅ Done — clean shell
│   ├── main.jsx                        ← ✅ Done
│   ├── App.css                         ← ✅ Cleared
│   └── index.css                       ← ✅ Done — CSS vars + base styles + animations
├── public/
│   ├── resume.pdf                      ← ❌ Not added yet
│   ├── favicon.ico                     ← ❌ Not added yet (404 — harmless for now)
│   └── og-image.png                    ← ❌ Not added yet
├── .env                                ← ✅ Created (EmailJS keys empty — wire up Session 06)
├── .env.example                        ← ✅ Created
├── .gitignore                          ← ✅ Present
├── components.json                     ← ✅ shadcn config
├── vercel.json                         ← ✅ Done — SPA routing fix
├── tsconfig.json                       ← ✅ Fixed
├── vite.config.js                      ← ✅ Present
└── package.json                        ← ✅ Present
```

---

## Installed Packages — Full List
```bash
# Core
react@19.2.4, react-dom@19.2.4, vite

# Styling
tailwindcss (v4 — NO config file)

# Animation
framer-motion@12.38.0

# UI
shadcn/ui (init done, components.json present)
# Aceternity components installed MANUALLY (registry auth-gated):
#   src/components/ui/meteors.jsx
#   src/components/ui/typewriter-effect.jsx
#   src/components/ui/3d-card.jsx
#   src/components/ui/glowing-effect.jsx

# Icons
lucide-react                      # comes with shadcn
@tabler/icons-react               # IconMenu2, IconX
@icons-pack/react-simple-icons    # SiGithub, SiX, SiLeetcode etc.

# Other
radix-ui, class-variance-authority, clsx, tailwind-merge
```

WARNING — do NOT install the standalone `motion` package
The `motion` package appears in `npm ls` as a transitive dependency. Never import from `motion/react`. Always use `framer-motion`.

EmailJS — NOT yet installed
`@emailjs/browser` is imported dynamically in `Contact.jsx` but not installed yet. Wire up in Session 06:
```powershell
npm install @emailjs/browser
```
Then fill `.env` keys: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

---

## Socials — All Confirmed
```js
export const socials = {
  email: "rajatdhimaan01@gmail.com",
  twitter: "https://twitter.com/Rajat_dhiman01",
  github: "https://github.com/Rajat-dhiman01",
  leetcode: "https://leetcode.com/u/rajat_dhiman/",
  resume: "/resume.pdf",
};
```

---

## Config Files — Current State
### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### vite.config.js
```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### vercel.json
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### index.css — current animations defined
```css
@keyframes meteor { ... }           /* meteor fall animation */
.animate-meteor-effect { ... }      /* used by meteors.jsx */
/* statusPulse and spin are defined inline in Contact.jsx <style> tag */
/* scroll-pulse and blink-cursor defined in Hero.jsx or index.css */
```

---

## Sections — Full Status
| # | Section | Component Stack | Status |
|---|---|---|---|
| — | Navbar | Framer Motion blur on scroll, Tabler + Simple Icons | ✅ Complete |
| 1 | Hero | Meteors bg + custom useTypewriter hook + Framer Motion | ✅ Complete |
| 2 | About | Photo ring + Framer Motion + Meteors bg | ✅ Complete |
| 3 | Projects | 3D Card + custom useCardGlow + filter tabs + NextProjectCard | ✅ Built ⚠️ glow bug |
| 4 | Skills | Skill groups grid + animated bars on scroll | ✅ Built |
| 5 | Problem Solver | Two-column + LeetCode card + DSA topics | ✅ Built |
| 6 | What I Build | 3-card grid + Meteors bg | ✅ Built |
| 7 | Contact | Social links + form + toast + open badge | ✅ Built |
| — | Footer | Name + copyright + nav links | ✅ Built |

---

## Known Bugs — Fix in Session 05
### Bug 1 — Project card glow bleeds outside left edge ⚠️ HIGH PRIORITY
Symptom: The `useCardGlow` border-trace glow div (with `inset: "-1px"`) overflows the left boundary of each project card, creating a visible artifact at the card's left edge.
Root cause: The glow element uses `position: absolute; inset: -1px` which extends 1px beyond the card boundary on all sides. In a CSS grid with no gap on the left for the first column, there's nothing clipping this overflow, so it bleeds into the section padding area.
Fix approach: Add `overflow: hidden` to the `motion.div` wrapper in `ProjectCard`, OR change `inset: "-1px"` to `inset: 0` and use `padding: "1px"` differently. Ask Rajat to paste `Projects.jsx` before writing fix code.

### Bug 2 — Stars background not implemented ⚠️ MEDIUM PRIORITY
Symptom: No star/twinkle background exists on any section. Rajat wants it on all dark sections.
Fix approach:
Create `src/components/ui/stars.jsx` — pure JS/CSS, no external package. Generate 80–120 random star positions on mount using `useMemo`. Each star is a tiny `div` with `position: absolute`, random size (0.5–2px), random opacity, and a `twinkle` CSS animation with random duration and delay.
Add `<Stars />` to: Hero (already has meteors — use low count ~80), About, Projects, ProblemSolver, Contact, WhatIBuild.
Stars keyframe goes in `index.css` (Tailwind v4 — no config file).
Keep stars subtle — opacity max 0.6, never distracting from content.

### Bug 3 — Card glow not on LeetCode card and WhatIBuild cards ⚠️ MEDIUM PRIORITY
Symptom: The `useCardGlow` border-trace glow effect exists on project cards but is not applied to the LeetCode card in ProblemSolver.jsx or the build cards in WhatIBuild.jsx.
Fix approach: Extract `useCardGlow` into a shared utility file `src/lib/useCardGlow.js` so it can be imported by Projects, ProblemSolver, and WhatIBuild without code duplication. Then add the glow wrapper and handler to the LeetCode card and each BuildCard. Ask Rajat to paste each file before modifying.

### Bug 4 — Hero dead space above pill ⚠️ LOW PRIORITY
Symptom: Small gap above the "Available for full-time roles" pill in Hero section. Likely Navbar height (64px) pushing flex content down.
Fix approach: Add `paddingTop: "64px"` to the Hero section, or use `minHeight: "calc(100vh)"` with the flex centering accounting for navbar height. Deferred to polish pass.

### Bug 5 — EmailJS not wired ⚠️ BLOCKS CONTACT FORM
Symptom: Contact form UI is built but `@emailjs/browser` is not installed and `.env` keys are empty. Submitting the form will throw a module not found error.
Fix: Session 06 — install `@emailjs/browser`, fill `.env`, test form end-to-end.

---

## What Is NOT Done Yet — START HERE NEXT SESSION
### Priority 0 — Confirm clean state
Run `npm run dev`, confirm 0 console errors
Scroll through full site, confirm all sections render

### Priority 1 — Fix project card glow bleed (Bug 1)
Ask Rajat to paste current `Projects.jsx`
Fix overflow on glow div
Confirm fix at 390px and 1440px

### Priority 2 — Build Stars component (Bug 2)
Create `src/components/ui/stars.jsx`
Add `@keyframes twinkle` to `index.css`
Add `<Stars />` to all dark sections

### Priority 3 — Extend card glow to ProblemSolver + WhatIBuild (Bug 3)
Extract `useCardGlow` to `src/lib/useCardGlow.js`
Ask Rajat to paste `ProblemSolver.jsx` and `WhatIBuild.jsx` before modifying
Add glow to LeetCode card and BuildCards

### Priority 4 — Polish pass
Hero spacing fix (Bug 4)
Mobile check at 390px — all sections
Add resume.pdf to /public
Add favicon.ico to /public

### Priority 5 — EmailJS wiring (Bug 5)
`npm install @emailjs/browser`
Fill `.env` keys
Test form end-to-end

### Priority 6 — SEO + OG image + Domain + Vercel deploy
### Priority 7 — Final review

---

## Problems Solved — Full History
### Session 1 (April 05, 2026): Planning + Mockup
Full blueprint finalised — 9 sections
HTML mockup built and approved
Design language locked
Font stack locked
Component stack locked per section
Tracing Beam rejected

### Session 2 (April 06, 2026): Project Setup + Navbar
Errors fixed:
| Error | Cause | Fix |
|---|---|---|
| `useState` null crash | Old shadcn App.jsx boilerplate + App.css override | Replaced App.jsx, cleared App.css |
| All stubs named `Navbar` | Copy-paste error | Fixed each stub function name |
| `@icons-pack/react-simple-icons` not found | Not installed | npm install |
| `[PARSE_ERROR] Unexpected token` | Arrow functions in JSX missing `{ }` | Wrapped handlers in `{ }` |
| `<a` tags broken | Find-and-replace stripped `<` | Restored all 5 tags |
| meteors.tsx JSX flag error | tsconfig missing compiler options | Added full options |
| meteors.tsx imports motion/react | Aceternity registry ships wrong import | Changed to framer-motion, renamed to .jsx |
| animate-meteor-effect not found | Tailwind v4 no config | Added keyframe to index.css |

### Session 3 (April 09, 2026): Critical Bug Fix + Hero + About + Components
Root bug — `useState` null at App.jsx:12:
`typewriter-effect.tsx` imported from `motion/react` (standalone package)
Both `motion` and `framer-motion` initialize React internally → two hook dispatchers → useState returns null
NOT a duplicate React instance (`npm ls react` showed clean deduplication)
Fix: delete `.tsx`, recreate as `.jsx` with `framer-motion` import, wipe Vite cache
Cache wipe required: `Remove-Item -Recurse -Force node_modules\.vite`

Other work:
Navbar: phantom TS errors cleared after cache wipe
Hero: verified — meteors, typewriter, CTAs, scroll indicator
About: verified — photo ring, layout, stats
3d-card.jsx + glowing-effect.jsx: created manually (registry auth-gated)

Key lessons:
`motion/react` ≠ `framer-motion` — never mix them
Aceternity registry requires auth — always create files manually
Always wipe Vite cache when file fix doesn't take effect
Check ALL src/ files for motion/react when diagnosing hook crashes

### Session 4 (April 10, 2026): All Sections Built
What was built:
`Projects.jsx` — 3D card tilt, custom useCardGlow border glow, filter tabs (All/Full-Stack/AI RAG), NextProjectCard placeholder, data from projects.js
`Skills.jsx` — 4 skill groups, animated progress bars on scroll, data from skills.js
`ProblemSolver.jsx` — two-column layout, LeetCode card, DSA topics, link to LeetCode profile
`WhatIBuild.jsx` — 3 build cards, Meteors background added
`About.jsx` — Meteors background added, section label restored
`Contact.jsx` — two-column, social links (email/X/GitHub/LeetCode), contact form, toast notification, open badge, EmailJS dynamic import (not wired yet)
`Footer.jsx` — name, copyright, nav links (Twitter/GitHub/LeetCode/Resume)
`socials.js` — all real values confirmed: email, Twitter, GitHub, LeetCode

Bugs identified this session (not yet fixed):
Project card glow bleeds outside left edge of cards
Stars background not implemented on any section
Card glow not applied to LeetCode card or WhatIBuild cards
Hero spacing gap above pill (deferred)
EmailJS not installed/wired (deferred to Session 06)

---

## Session Roadmap
| Session | Goal | Status |
|---|---|---|
| 1 | Planning + Mockup + Context file | ✅ Complete |
| 2 | Project setup + Navbar | ✅ Complete |
| 3 | Bug fix + Hero + About + Components | ✅ Complete |
| 4 | All sections built | ✅ Complete |
| 5 | Bug fixes + Stars + Glow extension + Polish | Next |
| 6 | EmailJS wiring + Resume + Favicon | Planned |
| 7 | SEO + OG image + Domain + Vercel deploy | Planned |
| 8 | Final review + performance | Planned |

---

## Instruction Prompt For Next Session
Paste this at the start of every new chat session:
```
You are a senior frontend engineer working on Rajat Dhiman's portfolio website.

Read PORTFOLIO_CONTEXT_session04.md fully before doing anything.

Rules — never break these:
- Work step by step. One thing at a time. Show plan first, wait for confirmation, then write code.
- Never create UI elements from scratch — always use shadcn/ui or Aceternity UI. Provide install commands.
- Aceternity registry is auth-gated (401) — NEVER use npx shadcn add with aceternity URLs. Always create files manually with New-Item and paste clean converted code.
- Never use motion/react import ANYWHERE — always framer-motion. Using motion/react alongside framer-motion crashes React's hook dispatcher. Non-negotiable.
- After installing any new component, immediately check its imports for motion/react and replace with framer-motion.
- Never use emojis as icons — use Lucide, Tabler, Simple Icons, Phosphor, or Iconify only.
- Always ask Rajat before picking an icon — suggest 2-3 options from approved sources.
- Never use project placeholder logos — ask Rajat for the real logo file first.
- Font stack is locked: Playfair Display + JetBrains Mono + DM Sans. No other fonts ever.
- Design is locked: #060608 bg, white text, no color accents, glassmorphism cards.
- Mobile-first — 390px must work perfectly before moving on.
- All animations via Framer Motion — only animate transform and opacity, never width/height/top/left.
- Always wrap Framer Motion animations with useReducedMotion() — accessibility requirement.
- Never hardcode data in JSX — everything goes through src/data/ files.
- Never commit .env — keys in environment variables only.
- Never redo anything already marked Complete in the context file.
- Always ask for file contents before writing fix code — never guess.
- Always provide complete file replacements — never partial edits on JSX files.
- Tailwind v4 has no config file — all custom CSS goes in src/index.css.
- Stars component: create src/components/ui/stars.jsx — pure CSS/JS, no package, twinkle keyframe in index.css.
- Card glow: extract useCardGlow to src/lib/useCardGlow.js before applying to new components.
- If app shows white screen or useState null error: check ALL src/ files for motion/react imports, fix to framer-motion, then run: Remove-Item -Recurse -Force node_modules\.vite
- Follow industry best practices: semantic HTML, aria labels, OG tags, no layout shift, lazy load images.

Start by reading "What Is NOT Done Yet" section and "Known Bugs" section before doing anything.
Confirm app runs clean at 0 errors before touching any file.
```
