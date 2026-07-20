<!-- agentics-template-version: 0.1.0 | synced: de6fe07d51467c6873fcc1cc0c8e647bcbdc6c6d -->
# Agent collaboration conventions

**For AI agents:** this file is instructions your agent reads and follows; it is not documentation written for people. If you're a person looking for how this project works, see [README.md](README.md) instead.

Adapted from [softeng/agentics](https://github.com/oicr-softeng/agentics). This is the comprehensive reference for agents that do not load files on demand. If you are Claude, prefer `CLAUDE.md`: it dispatches to more detailed convention files (and to this developer's global context, which already covers most of what's inlined below).

## Interaction parameters
- Ask clarifying questions before making large assumptions about intent
- Surface better alternatives as options; let the user decide
- Push back on bad ideas and identify blind spots before they are baked into code
- Verify purpose alignment before implementing: when a task names a goal, check whether the chosen approach achieves that goal directly, not just something adjacent to it; lead with that gap as an objection before writing anything
- Flag scope-adjacent issues verbally, then document them in `.dev/tech-debt.md`

## Critical constraints
- No credentials, secrets, or private URLs in any file: ever
- Library/module code must not read from the environment; configuration belongs at the application boundary, passed in as typed parameters
- Do not modify `CLAUDE.md`, `AGENTS.md`, or other instruction files without explicit instruction from the developer: surface suggestions, do not self-edit
- No machine- or user-specific absolute paths, usernames, or individuals' real names in committed files
- Name code, not people: attribute work to features, modules, and systems, not individuals

## Session-start signals

A session is a work period: not necessarily a new chat thread. Treat greetings ("good morning", "hi again"), resumption phrases ("let's continue", "back to it", "where were we"), and on-demand requests ("sync up", "refresh context", "re-read your instructions") as session-start signals even mid-thread.

## Starting a session

On a session-start signal, before touching any code:
1. If a cross-project map exists in your agent's global context (for Claude: `~/.claude/projects.md`), read it.
2. Check whether instruction files changed since your last session file: `git log --oneline -1 -- CLAUDE.md AGENTS.md`. Re-read only changed files. When you do, say: "I've re-read [file]: the prior version in this thread is superseded."
3. Read `.dev/roadmap.md`: check current focus and any `[in progress]` items
4. Read `.dev/tech-debt.md`: note `standalone: yes` entries relevant to today's work
5. Read the most recent 1-2 files in `.dev/sessions/` (sort filenames; ISO timestamps sort chronologically) for context on recent work and open threads
6. If `propagation_suggestions: yes` is set, or you're an agentics contributor (`agentics_contributor: yes` in your global context) without `agentics_upstream_check: no` set for this project or globally, check whether this project has adopted agentics at all (this tag, or just a mention of agentics) and, if so, check for upstream updates against a local agentics clone or `https://github.com/oicr-softeng/agentics`. A missing or incomplete tag means this project needs the tag added, not that the check should be skipped. For contributors this is mandatory and recurs every session for an unresolved gap, not just once
7. softeng team member → also read `CLAUDE.softeng.md` if present in this project, or your global context's softeng layer

**On context efficiency:** re-reading mid-thread adds content: it does not replace the prior version. Both consume tokens. Only re-read files that actually changed (step 2). If many instruction files changed at once, a new thread is cheaper than accumulating both versions.

## Keeping `.dev/` current

Update `.dev/roadmap.md` or `.dev/tech-debt.md` within the same session whenever a roadmap item's status changes, a tech-debt entry is resolved, or a meaningful decision is made.

Before writing any of these updates: marking an item done, closing a tech-debt entry, changing a status: verify against the actual current code or file state, not against a prior description or session summary. An assumption carried forward unverified is exactly how these documents drift from what they claim.

After any meaningful unit of work: code written, bug fixed, tech-debt logged, roadmap updated, docs changed: add or extend the dated entry in your session file. Do not wait for a "session over" signal; work rarely ends cleanly. Do not log conversational activity (discussions, PR reviews with no local changes, waiting states) — but see "Session file entry format" below for the mixed case: a review that also produced one real local change.

When `.dev/` documents are updated, remind the developer to commit them: this history matters for avoiding double work across sessions.

## Verifying conformance, not just structure

Reading a convention and holding it as an active constraint while generating content several steps later in the same turn are not the same act. A convention's example shows shape; matching that shape can happen while missing a prose requirement stated right next to it.

This matters most producing several governed artifacts in one batch (initialization, a migration, a multi-file update). Before finalizing each one, re-read it once against the convention's specific prose requirement, as a discrete final step, not a background assumption carried from reading the rule earlier. If a convention's own example under-specifies a requirement stated nearby, that's a defect worth fixing, not something to route around silently.

## Session file identity

Each session's log lives in its own file under `.dev/sessions/`, named `YYYY-MM-DDTHHMMSS.md`, keyed by contributor and day rather than one shared file: this is what prevents merge conflicts when several people work the same project the same day. No descriptive slug in the filename: the timestamp's only job is uniqueness.

A session-start signal doesn't by itself mean create a file: it means run the check below. A different contributor always needs their own file; the same contributor picking work back up later the same day extends their existing file instead.

To find your file for today: list `.dev/sessions/` for today's date prefix, then check authorship of any match (`git log -1 --format=%ae -- <file>` vs `git config user.email`; an uncommitted match is yours by definition). If a match is yours, extend it, no new file or timestamp. Otherwise create a new file (see "Get the actual time" below for the timestamp). This gives at most one file per (day, contributor), not one per session. Two concurrent sessions by the same person can still race on the same file: that's a self-conflict for that person to resolve, not the cross-contributor case this targets.

**Get the actual time, don't pad with zeros.** Once the check above says a new file is actually needed: you have no innate sense of the current time of day. Run a shell command to get it (e.g. `date +%Y-%m-%dT%H%M%S`) before creating the file. If every file created going forward carries `T000000`, that's not several coincidentally-round timestamps, it's this step being skipped every time.

**Exception: migrating or backfilling historical entries.** The real time genuinely isn't recoverable after the fact there, and `T000000` is a legitimate placeholder — not something to retroactively fix once real times are being fetched for new files.

**Never rename an already-created file, today's own included.** Fetch the real time before creating a file, never after.

## Session file entry format

One lean context sentence (what + why), a blank line, then one bullet per file or logical group of changes. No date header (the filename carries it), no prose paragraphs, no "Next:" line (open work belongs in `roadmap.md`). Bullet separator is `: ` (colon-space); no em dashes or space-hyphen-space.

```
[One sentence: what the work was and why.]

- `path/to/file`, `path/to/other`: what changed; decision or constraint if non-obvious
- `path/to/file`: what changed
```

**Write about effects, not style.** Describe what the code now does or enables for operators, users, or callers. Not how it was written.

**Bullets carry decisions or constraints only when non-obvious.** Don't annotate established conventions.

**Mixed reviews: log the local effect, not the investigation.** A PR review that turns up one real local change alongside a lot of no-op verification work: log the local change like any other change, drop the investigation narrative entirely. External references describing another repository's state (commit SHAs on someone else's branch, a PR number) don't belong here.

**A session file is immutable once its day is done.** Extend it for as long as that contributor's work continues that day. Once a new day (or a different contributor) starts, it's closed.

**Exception: a Critical Constraint violation overrides immutability.** Fix it regardless of which day produced it, the same as scrubbing a leaked credential from an old commit.

## Tech-debt entry format

```
[short description of the issue]
fix: [what the fix actually is, in one sentence, even if the full detail lives elsewhere]
standalone: yes | no
context: [roadmap item reference or brief note: required when standalone: no]
```

Separate the issue from the fix, even in this minimal form. At scale (dozens of entries), consider a richer structure: `**File:** ... **Severity:** ... **Kind:** ... **Issue:** ... **Fix:** ... **Standalone:** ...`.

## Testing

Co-locate test files with the source file they test: `validation.test.ts` next to `validation.ts`, not in a sibling `__tests__/` directory. This project's current `tests/index.test.js` predates the convention; new tests should be co-located, not added there.

For non-trivial work: plan first → define behaviour as tests → implement. Tests are the specification.

BDD style using `node:test` and `assert` where the test runner allows it:

```ts
import { suite, test } from 'node:test';
import assert from 'node:assert/strict';

suite('getNetworkPassthroughHeaders', () => {
  test('returns an empty array when no headers are configured', () => {
    assert.deepEqual(getNetworkPassthroughHeaders({ passthroughHeaders: [] }), []);
  });
});
```

This project runs tests via `npm test` (Jest, not `node:test`): match Jest's `describe`/`it` API to the same BDD shape (`describe` groups, `it` states expected behaviour in plain language, body follows Given/When/Then).

## Code style

**Comments:** write none by default. Add one only when the WHY is non-obvious. Never explain WHAT the code does; never reference the current task or callers.

**Scope:** stick to stated scope. Surface weaknesses verbally. If a scope-adjacent issue is small enough to fix in place without meaningful risk, fix it immediately: tech-debt is for genuinely deferred work, not one-line fixes. Three similar lines is better than a premature abstraction.

**Search before writing:** before implementing something new, search the codebase for existing patterns.

**Library awareness:** when a well-established library would do more thorough work than a hand-rolled solution, surface it as an option.

**Checking in:** check in before non-trivial direction changes; not on mechanical steps.

**Property ordering:** alphabetize properties in config objects and YAML/JSON files at all nesting levels.

**Language:** flag typos and language issues when spotted. Don't fix silently.

**Git:** never stage changes without explicit request; always state a change's actual git state (staged vs. unstaged) plainly.

## Code review

Before examining how a PR is written, establish whether the proposed change is the right response to the problem:

1. **What problem does this solve?** If the PR description doesn't state it, ask before reviewing anything else.
2. **Does the solution belong at this layer?** Could the problem be solved in the caller, the consumer, or the component on the other side of this boundary without any change here?
3. **Is any code change needed at all?** Documentation, a usage example, or a configuration option sometimes replaces a feature.
4. **Only then:** review the implementation against the code-style conventions above.

## Documentation

Two layers, for projects that publish docs externally: `/docs` for what a consumer needs (published externally); `.dev/docs` for internal design rationale (repo-only). Keep the full explanation in one location and cross-link from the other.

**Writing for a cold reader:** one idea per sentence, state the conclusion first, restate rather than reference "the earlier version," give worked examples their own block. Applies to design docs, tech-debt entries, roadmap items; does not apply to `.dev/sessions/` logs.

## Structured logging

Emit logs as structured key-value pairs or JSON objects, not interpolated strings. Include timestamp, severity, event type, actor identity where known, resource identifier, outcome. Never log secrets, credentials, or PII.

## Security

Be aware of the current OWASP Top 10. Apply during implementation, flag when reviewing adjacent code, surface when making design decisions touching authentication, access control, input handling, session management, or dependency management.

**Quick threat model (A06):** before building anything with security implications, answer: what are we building? what could go wrong? what are we doing about it? Record in `.dev/sessions/`.

## Convention placement and propagation

Conventions live at one of three levels: always ask which level is correct:
- **Project-specific**: applies to this project only; goes in `CLAUDE.md` or `.dev/tech-debt.md`
- **Global**: applies to all the developer's projects; belongs in your agent's global context directory (for Claude: `~/.claude/CLAUDE.md`)
- **Shareable**: could benefit other teams; flag as a potential PR to [oicr-softeng/agentics](https://github.com/oicr-softeng/agentics)

## Memory hygiene

When writing to project memory: keep entries concise; store no content derivable from code or files. If an insight could apply to all your projects, offer to promote it to your agent's global context. If a convention could benefit other teams, flag it as a potential PR to the agentics repo.

## This project

Next.js 12 (React 17, TypeScript) frontend for the VirusSeq Data Portal: browsing, exploring, and submitting viral sequence data. Built on Arranger (`@overture-stack/arranger-components`) for search/exploration UI.

- `pages/`: route entry points (Next.js file-based routing) — `submission/`, `explorer/`, `releases/`, `studies/`, `virusseq/`, `visualization/`, `login/`, `user/`, `policies/`, etc.
- `components/`: shared UI components, organized by feature (e.g. `components/pages/submission/`) and by generic reusable widgets at the top level (`Button.tsx`, `Modal.tsx`, `GenericTable/`, `Pagination/`)
- `global/`: cross-cutting app-level config/context
- `tests/`: currently a single `index.test.js`; new tests should be co-located with source per the testing convention above, not added there

**Commands:**
- `npm run dev`: local dev server
- `npm run dev:submission`: dev server + local SSL proxy, needed for auth-reliant features (submission dashboard) — see README § Development Authentication Setup
- `npm test`: runs Jest
- `npm run lint`: `eslint --ext .ts,.tsx '.'`
- `npm run build`: production build

**Feature flags:** `NEXT_PUBLIC_ENABLE_DOWNLOADS`, `NEXT_PUBLIC_ENABLE_LOGIN`, `NEXT_PUBLIC_ENABLE_REGISTRATION` (see README). Default to `false`.

## Initialization

If no project memory exists for you in this project yet:
1. Check whether a cross-project map is accessible (see Starting a session, step 1).
2. Ask: "What best describes your primary work on this project?": developer / bioinformatician / AI engineering / general (or describe it).
3. Ask: "Are you part of the softeng team?": if yes, apply softeng conventions on top of role conventions.
4. Ask: "Do you already have agent conventions for this project?": no, as of this file's creation.
5. Ask: "Would you like me to suggest when conventions could be useful beyond this project?": record as `propagation_suggestions: yes | no`.
Record all answers in project memory. Do not ask again.
