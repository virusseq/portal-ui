# Development guide

## Repository structure

- `pages/`: Next.js file-based routes (`submission/`, `explorer/`, `releases/`, `studies/`, `virusseq/`, `visualization/`, `login/`, `user/`, `policies/`, etc.)
- `components/`: shared UI components, organized by feature (`components/pages/<feature>/`) and generic reusable widgets at the top level (`Button.tsx`, `Modal.tsx`, `GenericTable/`, `Pagination/`)
- `global/`: cross-cutting app-level config/context
- `tests/`: legacy single-file test location; new tests should be co-located with the source they test (see `AGENTS.md` § Testing)
- `.env.schema`: documents every environment variable this app reads (Arranger endpoints per data type, feature flags, auth config); copy to `.env` and fill in values for local dev

## Prerequisites

- Node.js and npm (see `package.json` for dependency versions; no `.nvmrc`/`engines` field is pinned yet)
- [`mkcert`](https://github.com/FiloSottile/mkcert) if working on auth-reliant features (see § Auth setup below)
- GitHub CLI (`gh`), authenticated: any agent working in this repo uses `gh` for PRs and issues on your behalf; without it, your first GitHub-related request will stall on an auth prompt instead of just working

## Setup

1. `npm install`
2. Copy `.env.schema` to `.env` and fill in the required values (Arranger API URLs, feature flags, etc.)
3. If `gh auth status` doesn't already show you logged in, run `gh auth login` once per machine

## Running the project

- `npm run dev`: starts the dev server at `http://localhost:3000`
- `npm run dev:submission`: dev server plus a local SSL proxy, required for auth-reliant features (e.g. the submissions dashboard); see § Auth setup below before using this

### Auth setup (submission dashboard and other auth-reliant features)

1. Install `mkcert` and run `mkcert -install` (restart your browser afterward)
2. Generate a dev certificate: `mkcert local.dev.virusseq-dataportal.ca`
3. Add `127.0.0.1 localhost.dev.virusseq-dataportal.ca` to your system hosts file (e.g. `/etc/hosts`)
4. Run `npm run dev:submission`

## Running tests

`npm test` runs the Jest suite.

## Feature flags

| Variable                          | Default | Description                                                          |
| ---------------------------------- | ------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_ENABLE_DOWNLOADS`      | `false` | Enables downloading data at the "Exploration" and "Data Releases" pages |
| `NEXT_PUBLIC_ENABLE_LOGIN`          | `false` | Allows submitters to log in                                            |
| `NEXT_PUBLIC_ENABLE_REGISTRATION`   | `false` | Allows new submitters to register                                      |

See `.env.schema` for the full list of environment variables, including per-data-type Arranger configuration.

## Working documents

The `.dev/` directory contains living documents maintained alongside the codebase:

- `.dev/roadmap.md`: planned features and architectural direction; read at session start
- `.dev/tech-debt.md`: known issues, scope-adjacent problems, and deferred work
- `.dev/sessions/`: one file per contributor per day (`YYYY-MM-DDTHHMMSS.md`), brief log of what changed and why
- `.dev/docs/atlas/`: agent-generated reference material (lessons learned, a roadmap entry's deeper reasoning); indexed at `.dev/docs/atlas/index.md`

Read the `.dev/` files at the start of each session before beginning work. Update these at the end of any session that produces meaningful output.
