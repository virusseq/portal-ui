<!-- agentics-template-version: 0.1.0 | synced: de6fe07d51467c6873fcc1cc0c8e647bcbdc6c6d -->
# Agent collaboration conventions

**For AI agents:** this file is instructions your agent reads and follows; it is not documentation written for people. If you're a person looking for how this project works, see [README.md](README.md) instead.

Adapted from [softeng/agentics](https://github.com/oicr-softeng/agentics). To get updates, compare this file's version tag against the agentics CHANGELOG.

This developer's global context (`~/.claude/CLAUDE.md`) already defines role (AI engineering), team (softeng), and the universal conventions (interaction parameters, critical constraints, session discipline, testing, code style, security, documentation, code review). This file holds only what's specific to this project.

## Project

Next.js 12 (React 17, TypeScript) frontend for the VirusSeq Data Portal: browsing, exploring, and submitting viral sequence data. Built on Arranger (`@overture-stack/arranger-components`) for search/exploration UI.

- `pages/`: route entry points (Next.js file-based routing) — `submission/`, `explorer/`, `releases/`, `studies/`, `virusseq/`, `visualization/`, `login/`, `user/`, `policies/`, etc.
- `components/`: shared UI components, organized by feature (e.g. `components/pages/submission/`) and by generic reusable widgets at the top level (`Button.tsx`, `Modal.tsx`, `GenericTable/`, `Pagination/`)
- `global/`: cross-cutting app-level config/context
- `tests/`: currently a single `index.test.js`; new tests should be co-located with source per the global testing convention, not added here

**Commands:**
- `npm run dev`: local dev server (also runs `nuke:nextTemp` first)
- `npm run dev:submission`: dev server + local SSL proxy, needed for auth-reliant features (submission dashboard) — see README § Development Authentication Setup for the `mkcert` setup
- `npm test`: runs `jest`
- `npm run lint`: `eslint --ext .ts,.tsx '.'`
- `npm run build`: production build

**Feature flags:** `NEXT_PUBLIC_ENABLE_DOWNLOADS`, `NEXT_PUBLIC_ENABLE_LOGIN`, `NEXT_PUBLIC_ENABLE_REGISTRATION` (see README for the full list). Default to `false`, consistent with the security-guidelines default-false rule for feature flags.

## Initialization

If no project memory exists for you in this project yet:
1. Role and softeng-team status are already known from global context: skip those questions.
2. Ask: "Do you already have agent conventions for this project?": no, as of this file's creation — this is the initial agentics adoption.
3. `propagation_suggestions` defaults to the global setting (`yes`); ask only if the developer wants a project-specific override.
Record answers in project memory. Do not ask again.
