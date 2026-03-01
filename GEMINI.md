# GEMINI.md - Context for Rhodium-X

This file provides context and instructions for AI agents working on the **rhodium-x** project.

## Project Overview

- **Name:** rhodium-x
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Runtime:** [Bun](https://bun.sh/) (indicated by `bun.lock`)
- **Core Technologies:**
  - **Language:** [TypeScript](https://www.typescriptlang.org/)
  - **UI Library:** [React 19](https://react.dev/)
  - **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
  - **Linting:** [ESLint](https://eslint.org/)

## Architecture

This project follows the standard Next.js App Router structure:
- `app/`: Contains routes, layouts, and components.
- `public/`: Static assets.
- `next.config.ts`: Next.js configuration.
- `tailwind.config.mjs` / `postcss.config.mjs`: Styling configuration.

## Building and Running

The project uses `bun` as the primary package manager.

- **Development Server:** `bun dev`
- **Build for Production:** `bun run build`
- **Start Production Server:** `bun start`
- **Linting:** `bun run lint`

## Development Conventions

- **Type Safety:** Use TypeScript for all new components and logic. Ensure `strict` mode is maintained.
- **Styling:** Use Tailwind CSS v4 utility classes. Prefer standard Tailwind patterns for responsive design and dark mode.
- **Components:** Functional components with React 19 features (e.g., Server Components by default in `app/`).
- **Imports:** Use the `@/*` alias for root-level imports (configured in `tsconfig.json`).
- **Fonts:** Geist and Geist Mono are the primary font families, configured in `app/layout.tsx`.

## Key Files

- `app/layout.tsx`: Root layout with font and global style configuration.
- `app/page.tsx`: The main entry page.
- `app/globals.css`: Global CSS and Tailwind imports.
- `package.json`: Dependency and script management.
- `bun.lock`: Bun lockfile.

## Frontend Design & Workflow

### Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

### Reference Images & Matching
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

### Local Server & Screenshot Workflow
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`). `serve.mjs` lives in the project root. Start it in the background before taking any screenshots. If already running, do not start a second instance.
- **Screenshotting:** `node screenshot.mjs http://localhost:3000 [label]`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png`.
- Puppeteer is installed at `~/home/notdonk/node_modules/puppeteer`. Chrome cache is at `~/home/notdonk/.cache/puppeteer`.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool for analysis.
- When comparing, be specific about spacing, padding, font size/weight/line-height, colors, alignment, border-radius, shadows, and image sizing.

### Anti-Generic Design Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

### Hard Rules
- Do not add sections, features, or content not in the reference.
- Do not "improve" a reference design — match it exactly.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
- Output Default: Single `index.html` file, all styles inline, unless user says otherwise. Use Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`.
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`.
- Mobile-first responsive.
