<!-- agentics-template-version: 0.10.0 | synced: 6313e587222772d8ef9c111ae3d4637678acff89 -->
# Agent collaboration conventions

**For AI agents:** this file is instructions your agent reads and follows; it is not documentation written for people. If you're a person looking for how this project works, see [README.md](README.md) instead.

Adapted from [softeng/agentics](https://github.com/oicr-softeng/agentics). This is the canonical source for this project's conventions, agent-neutral by design. `CLAUDE.md` exists only because Claude Code loads it automatically; it points here rather than keeping its own copy of anything.

This developer's global context (`~/.claude/CLAUDE.md`) already defines role (AI engineering), team (softeng), and the universal conventions (interaction parameters, critical constraints, session discipline, testing, code style, security, documentation, code review). This file holds only what's specific to this project, plus the parts of the canonical structure (dispatch table, version tag) that must live in a real project file rather than a global one.

## Interaction parameters
- Ask clarifying questions before making large assumptions about intent
- Surface ideas, improvements, or next steps you already see, unprompted: don't wait for an open-ended question to draw them out. Covers alternatives to what's about to be implemented, a shipped fix that still has the weakness it just fixed, or anything else obvious in hindsight; let the user decide
- Push back on bad ideas and identify blind spots before they are baked into code: lead with the objection, not a neutral trade-off list; don't wait to be asked
- Sanity check requests: not just the literal phrase. A yes/no-shaped question ("does this make sense," "am I right," "am I missing anything") is still a sanity check when its actual function is inviting scrutiny of the user's own idea, reasoning, or plan, not a literal yes/no about the world. Answer the intent, not the grammar: review the whole conversation as relevant, not just the latest message, and surface gaps, blind spots, unresolved threads, and edge cases plainly; a shallow "yes" isn't an answer
- Verify purpose alignment before implementing: when a task names a goal, check whether the chosen approach achieves that goal directly, not just something adjacent to it; lead with that gap as an objection before writing anything
- Flag scope-adjacent issues verbally, then document them in `.dev/tech-debt.md`

## Critical constraints
- No credentials, secrets, or private URLs in any file: ever
- Library/module code must not read from the environment; configuration belongs at the application boundary, passed in as typed parameters
- Do not modify `CLAUDE.md`, `AGENTS.md`, or other instruction files without explicit instruction from the developer: surface suggestions, do not self-edit
- No machine- or user-specific absolute paths, usernames, or individuals' real names in committed files. Before committing, grep the diff for your own OS username, git identity, and any personal fork name you know is yours
- Name code, not people: attribute work to features, modules, and systems, not individuals

## When to read what

Every path below is a live pointer into agentics or your own global context, never a local copy to create in this project.

- Starting a session -> read `conventions/session-discipline.md` (in this developer's local agentics clone), then the `.dev/` files it specifies
- Writing or reviewing tests -> read `conventions/testing.md`
- Writing code -> read `conventions/code-style.md`
- Reviewing a PR or change -> read `conventions/code-style.md`, `conventions/code-review.md`, `conventions/review-conduct.md`
- Writing or updating docs -> read `conventions/documentation.md`
- Security-relevant work -> read `conventions/security.md` (credentials policy, supply chain, quick threat model), then `conventions/security-guidelines.md` (full OWASP patterns and code review triggers)
- softeng team member -> read `CLAUDE.softeng.md` (this developer's global context) at session start
- Overture project -> read `CLAUDE.overture.md` (this developer's global context) at session start: this project depends on `@overture-stack/arranger-components` and is tracked as an Overture project (confirmed 2026-07-24)
- Adding or improving a convention -> read `conventions/convention-levels.md`
- Upgrading this project's agentics integration -> read `conventions/upgrading-adoption.md`

## Memory and contribution hygiene
When writing to project memory: keep entries concise; store no content derivable from code or files. If an insight could apply to all your projects, offer to promote it to your agent's global context. If a convention could benefit other teams, flag it as a potential PR to the agentics repo.

## This project

Next.js 12 (React 17, TypeScript) frontend for the VirusSeq Data Portal: browsing, exploring, and submitting viral sequence data. Built on Arranger (`@overture-stack/arranger-components`) for search/exploration UI.

- `pages/`: route entry points (Next.js file-based routing) — `submission/`, `explorer/`, `releases/`, `studies/`, `virusseq/`, `visualization/`, `login/`, `user/`, `policies/`, etc.
- `components/`: shared UI components, organized by feature (e.g. `components/pages/submission/`) and by generic reusable widgets at the top level (`Button.tsx`, `Modal.tsx`, `GenericTable/`, `Pagination/`)
- `global/`: cross-cutting app-level config/context
- `tests/`: currently a single `index.test.js`; new tests should be co-located with source per the global testing convention, not added there
- This project's test runner is Jest (`npm test`), not `node:test`: match Jest's `describe`/`it` API to the same BDD shape `conventions/testing.md` describes (`describe` groups, `it` states expected behaviour in plain language, body follows Given/When/Then)

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
2. Ask: "Is this an Overture project?": yes, confirmed 2026-07-24 (depends on `@overture-stack/arranger-components`; see `CLAUDE.overture.md`).
3. Ask: "Do you already have agent conventions for this project?": no, as of this file's creation — this is the initial agentics adoption.
4. `propagation_suggestions` defaults to the global setting (`yes`); ask only if the developer wants a project-specific override.
Record answers in project memory. Do not ask again.
