# AlgoAnimation — Project Instructions

## Project Overview
Educational content platform that brings LeetCode problems to life through step-by-step animated visualizations.

## Tech Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Deployed on Vercel: https://algo-animation-delta.vercel.app
- GitHub: https://github.com/onurstats/algo-animation

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
