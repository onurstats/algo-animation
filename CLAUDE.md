# AlgoAnimation — Project Instructions

## Project Overview

Educational content platform that brings LeetCode problems to life through step-by-step animated visualizations.

**Tagline:** "See the algorithm. Understand the solution."

## Tech Stack

- Next.js 14+ (App Router, Turbopack)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion + HTML5 Canvas / D3.js (animation engine)
- Shiki or Prism.js (code highlighting)
- Zustand (state management)
- MDX or JSON configs (problem content)
- pnpm (package manager)
- Deployed on Vercel: https://algo-animation-delta.vercel.app
- GitHub: https://github.com/onurstats/algo-animation

## Key Architecture

### Core Directories

- `src/app/problems/[slug]/page.tsx` — Dynamic problem animation page
- `src/lib/algorithms/` — Step generators (one file per problem, exports `generateSteps`)
- `src/lib/problems/data/` — Problem metadata configs
- `src/lib/problems/registry.ts` — Central problem registry
- `src/lib/animation/` — Animation engine (types, engine, interpolation)
- `src/components/animation/` — Animation UI (canvas, controls, visualizers)
- `src/components/code/` — Code panel with line highlighting
- `src/stores/animationStore.ts` — Zustand playback store
- `src/hooks/` — useAnimation, useKeyboardShortcuts, useResponsiveCanvas
- `tests/algorithms/` — Unit tests for step generators

### Adding a New Problem

1. Create problem config: `src/lib/problems/data/{slug}.ts`
2. Create step generator: `src/lib/algorithms/{slug}.ts`
3. Register in `src/lib/problems/registry.ts`
4. Write tests: `tests/algorithms/{slug}.test.ts`
5. Dynamic route handles rendering automatically

### Design System

- Dark theme default (bg: #0F1117, surface: #1A1D2E)
- Colors: blue=current, purple=secondary, green=success, red=removed, yellow=comparing, gray=processed
- Fonts: Inter (body), JetBrains Mono (code)
- Smooth 300ms transitions between steps

### Code Style

- Functional components with hooks
- Animation logic separate from rendering
- Human-friendly step descriptions
- Pre-generate all steps before playback
- Use `requestAnimationFrame` for canvas
- Memoize expensive calculations
- Lazy load problem data

## Git Branching Strategy — Git Flow

This project uses **git-flow** (`git flow` CLI). Always use git flow commands.

### Branches

- `main` — Production. Only receives merges from `release/*` and `hotfix/*`. Never commit directly.
- `develop` — Integration branch. All features merge here. This is the default working branch.
- `feature/<name>` — New features. Branch from `develop`, merge back to `develop`.
- `release/<version>` — Release prep. Branch from `develop`, merge to both `main` and `develop`.
- `hotfix/<name>` — Urgent production fixes. Branch from `main`, merge to both `main` and `develop`.

### Common Commands

```bash
# Start a new feature
git flow feature start <feature-name>

# Finish a feature (merges to develop)
git flow feature finish <feature-name>

# Start a release
git flow release start <version>

# Finish a release (merges to main + develop, tags)
git flow release finish <version>

# Start a hotfix
git flow hotfix start <fix-name>

# Finish a hotfix (merges to main + develop)
git flow hotfix finish <fix-name>
```

### Rules

- Always push `develop` after finishing a feature: `git push origin develop`
- Always push `main` and tags after a release: `git push origin main develop --tags`
- Use HTTPS remote (SSH key for `oxo-fi-fi` doesn't have access to this repo)
- Remote URL: `https://github.com/onurstats/algo-animation.git`
