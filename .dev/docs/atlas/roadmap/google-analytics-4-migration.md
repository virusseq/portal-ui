# Migrating Google Analytics from `react-ga` to `react-ga4`

## Status

Package swap and three custom events (`explorer_view`, `file_download`, `facet_filter`) are
implemented and tested, verified against a dev GA4 property. Remaining: a PIPEDA-driven consent
banner, disabling Google's ad-personalization signals, pushing the dev infra change, then
promoting to prod using the already-confirmed prod measurement ID.

## Verdict: `react-ga` cannot reach a GA4 property

`react-ga@3.3.1` cannot send data to a GA4 property. This isn't a version gap, it's a different
product: `react-ga`'s own README states it "is designed to work with [Universal Analytics] and
will not support the older `ga.js` implementation" (no newer statement anywhere in the package; it
was never updated for GA4). Universal Analytics stopped processing hits in mid-2023. `react-ga4`
(a separate package, not a version bump of `react-ga`) is the replacement; its own README frames
itself explicitly as the migration path: "Simply replace `react-ga` with `react-ga4` and remove
`ReactGA.pageview()`."

`@next/third-parties/google`, the more "native" option for a Next.js app, requires Next.js
`^13.0.0` or later (peer dependency, confirmed via `npm view`). This project is on Next.js
`^12.3.7`, so it isn't viable without a Next.js major upgrade first, out of scope here.

## Where GA lived in this codebase before the migration

Only one file imported `react-ga` directly: `global/hooks/useTrackingContext/index.tsx` (plus its
`types.ts` sibling). Seven other files consumed the hook (`components/Root.tsx`, both
`NavBar.tsx` files, `components/pages/clinical/RepoTable/index.tsx`, `pages/logged-in.tsx`,
`global/hooks/useAuthContext.tsx`) but never touched `react-ga` directly, so the whole migration
stayed contained to the hook itself.

What was tracked before this initiative, all still in place today:

- Automatic pageview on every SPA route change
- User ID association at init and again once the user becomes available post-init
- `{ category: 'Page', action: 'VirusSeq Landing Page visited' }` (`virusseq/NavBar/NavBar.tsx`)
- `{ category: 'Downloads', action: 'Archive Build' }` / `'Archive Download'`
  (`clinical/RepoTable/index.tsx`)
- `{ category: 'User', action: 'Logged in' }` / `'Invalid JWT provided by Ego/Keycloak'` /
  `'Failed to login'` (`pages/logged-in.tsx`)
- `{ category: 'User', action: 'Logged out using dropdown' }` (`useAuthContext.tsx`)

`addTracker`/`removeTracker` existed on the hook (wrapping `ReactGA.addTrackers([...])`) but no
consumer anywhere in the app called either one; confirmed dead code, removed rather than ported
(see Implementation notes).

## API mapping

| Current (`react-ga`) | `react-ga4` equivalent | Notes |
|---|---|---|
| `ReactGA.initialize(id, { debug, gaOptions })` | `ReactGA.initialize(id, { gaOptions })` | `debug` isn't a top-level option in `react-ga4` (see Gaps below) |
| `ReactGA.pageview(url, trackers)` | `ReactGA.send({ hitType: 'pageview', page: url })` | `.pageview()` doesn't exist in `react-ga4`; confirmed via source, becomes a `page_view` event with `page_path` set |
| `ReactGA.set({ page: url }, trackers)` | `ReactGA.set({ page: url })` | `page` still maps to `page_path` internally |
| `ReactGA.event({ category, action, label, value }, trackers)` | `ReactGA.event({ category, action, label, value })` | Same options-object shape still works, just drop the second argument |
| `ReactGA.addTrackers([{ trackingId, gaOptions: { name } }])` | No equivalent after init | See Gaps below |
| second `trackerNames` argument on `.set()`/`.event()`/`.pageview()` | **not supported at all** | Confirmed in `react-ga4`'s source (`src/ga4.ts`): all take a single argument, no per-call tracker targeting |

## Gaps and behavior changes handled

1. **Per-call tracker targeting is gone, but usage never needed it.** This app only ever
   initialized a single default tracker, so the second `trackers` argument was always empty in
   real usage; dropping it changed nothing observable. Would only matter if multi-property
   tracking gets added later.
2. **Dynamic runtime `addTracker`/`removeTracker` has no `react-ga4` equivalent**, since its
   multiple-"products" model is init-time only. Safe to drop since nothing called either one. A
   future multi-property need would need a fresh design (re-`initialize()` with a new config
   array), not a reintroduction of these.
3. **`initialize()` throws on a falsy measurement ID**, where `react-ga` only warned and returned.
   The hook calls `initialize()` unconditionally inside a `useEffect`, and
   `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` defaults to `''` when unset. Fixed with a guard
   (`if (!NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) return;`) before calling `.initialize()`.
4. **No double-counting on the first page load.** GA4's `gtag('config', ...)` (fired once at
   `initialize()`) already sends an automatic `page_view` for the initial load. The manual
   pageview-on-route-change handler only fires on subsequent client-side navigations (Next.js
   Router's `routeChangeComplete`), never on the initial load, so the two don't overlap.
5. **`debug` isn't a first-class `initialize()` option in `react-ga4`.** It has `testMode`
   (suppresses the network/script load, for tests) instead. This codebase's own
   `NEXT_PUBLIC_DEBUG && console.log(...)` calls needed no changes; runtime debugging of what's
   actually sent to GA4 is better done via the [Google Analytics Debugger Chrome
   extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   or GA4's own DebugView, not a package option.

## Package health

`react-ga4` (npm, `3.0.1`, last published 2026-03-24): 327 GitHub stars, 36 open issues, and a
multi-year gap between its last pre-2023 commit and a burst of activity in March 2026 that rewrote
it to TypeScript/ESM and published `3.0.0`/`3.0.1` same day. Not abandoned, but not a large team
either; worth a periodic glance rather than a "set and forget" dependency.

## Environment IDs and rollout plan

Four distinct measurement/tracking IDs were scattered across this codebase and
`virusseq-infra-sd4h` before this initiative: prod's env var commented out entirely (an abandoned
candidate ID, tagged `# TODO: figure out a new code`, i.e. no analytics running in prod at all),
dev deployed pointing at a dead Universal Analytics ID, `.env.local` pointing at a different dead
UA ID with yet another commented-out candidate, and a fourth, empty `.env.sanbi.local` for a
deployment not otherwise documented here. (IDs themselves aren't recorded in this doc; see the
deployed config in each environment.)

**Resolved scope:**
- **Prod ID**: confirmed, held for later, not deployed until dev is proven out.
- **Dev ID**: a new GA4 property/data stream, created and wired into `.env.local` and
  `virusseq-infra-sd4h`'s dev values (the latter still uncommitted).
- **Other deployments** (`.env.sanbi.local`, etc.): explicitly deferred, not addressed here.

**Sequencing**: implement and verify against the dev ID first; once dev is confirmed working,
promote the same code change to prod using the confirmed prod ID. The code itself doesn't depend
on which ID is used, only the deployed env var value differs per environment.

## Custom events: `explorer_view`, `file_download`, `facet_filter`

A product spec ("IMS Metrics") drove this, asking for three metrics beyond parity with what
`react-ga` tracked: **visitors** (unique/new/returning visits, unique page views per explorer,
visits by country, all GA4-automatic, no custom code needed), **monthly downloads** (count of
export actions by download type and result size), and **session data** (time per session, filter
interactions per session, whether a session ended in a download, to derive a
search-to-download conversion rate via GA4's own session ID, joined automatically).

**Architecture**: despite the spec's own wording, this is direct GA4/`gtag.js` integration (what
was already implemented), not actual Google Tag Manager (a separate container/`dataLayer`
pattern); the spec's mention of GTM was a misstatement of what was actually wanted. Revisit only
if a real need for GTM's container/UI model comes up later.

**Abstraction**: `useTrackingContext` exposes a generic `trackEvent(name, params)` (GA4-native
named events) alongside the older `logEvent({category, action, ...})` kept for the pre-existing
call sites listed above. `global/hooks/useTrackingContext/events.ts` holds one small typed
function per named event (`trackExplorerView`, `trackFileDownload`, `trackFacetFilter`), each just
shaping its own parameters and calling `trackEvent`. Adding a new event elsewhere means adding one
function here in the same shape; the dispatch mechanism itself never needs touching.

**`explorer_view`**: fired from a mount effect in `components/pages/clinical/index.tsx` and
`components/pages/environmental/index.tsx`; parameter is the explorer name. No external blocker.

**`file_download`**: fired for both download menu options (metadata only / metadata + file
manifest); parameters are download type, result count, selected rows, and active filter count.
The "metadata only" exporter used Arranger's `{ function: 'saveTSV' }` shorthand, which resolves
internally to a function that isn't part of the package's public API. `global/utils/
arrangerExport.ts`'s `resolveExportColumns` is a faithful reproduction of that internal
column-customizer logic, wrapped by `createTrackedMetadataOnlyExporter` to fire the event first,
then perform the same export `saveTSV` would have. The "metadata + file manifest/fasta" exporter
already used its own custom function, so it only needed one added line. `resultCount` for both
paths falls back to selection size when nothing's selected, no whole-dataset total count is
available at that point without an extra Arranger query, a known simplification.

**`facet_filter`**: fired when a facet value is selected or deselected; parameters are facet
field, add-or-remove, and result count. `<Aggregations>` (from `@overture-stack/arranger-
components`) has a working, undocumented `onValueChange` prop. It reports `isActive` per *field*,
not per *value*, which isn't precise enough for this app's multi-select facets (deselecting one
value while others stay checked still reports the field as active). `getFacetActionType`/
`isFacetValueActive` in `events.ts` diff the pre-click `sqon` (from `useArrangerData()`) against
the clicked value instead of trusting `isActive` directly.

**Both `file_download` and `facet_filter` share one root cause**: `Aggregations` and
`DownloadButton`'s `saveTSV` are both plain JS components with no corresponding TypeScript props
interface, invisible to anyone discovering their real capabilities through types rather than
reading source directly. See `.dev/tech-debt.md` for the standing risk this creates, and for the
`onExport` API now on Arranger's own roadmap (higher priority, prompted by this work) that would
remove the `saveTSV` duplication once it ships.

## Consent and compliance (PIPEDA)

This is a Canadian deployment, so PIPEDA is the relevant framework, not primarily GDPR/EEA.
Current OPC (Office of the Privacy Commissioner of Canada) guidance: implied consent (a clear
notice, no blocking gate) can be enough for non-advertising analytics, but the OPC has moved
toward requiring real opt-in consent for anything used for advertising or profiling. The product
spec commits to the stricter version regardless: a lightweight cookie consent banner with
analytics gated behind consent, not a notice-only banner. Not yet implemented.

- **Disabling Google's ad-personalization signals** maps directly to `gaOptions.allowAdFeatures:
  false` and `allowAdPersonalizationSignals: false`, both already supported by `react-ga4`. A
  one-line config addition once the consent gating exists.
- **IP anonymization**: GA4 doesn't collect full IP addresses at all by default (unlike Universal
  Analytics, where `anonymizeIp` was an explicit opt-in field), so this may already be satisfied
  structurally; worth confirming rather than assuming before treating it as done.
- **`react-ga4` provides no help implementing the banner itself beyond a raw passthrough**:
  checked its full source (`ga4.ts`, `gtag.ts`, `index.ts`), zero mentions of "consent" anywhere.
  Its API is `initialize`/`set`/`event`/`send`/`ga` plus a generic `gtag(...args)` passthrough, no
  `.consent()` method, no consent-state tracking, no banner UI. Implementing this means: building
  the actual banner/UI (or bringing in a separate consent-management library, neither is
  supplied), calling `ReactGA.gtag('consent', 'default', {...})` before `initialize()` runs
  (order matters: gtag.js requires the default state set before the config tag loads), calling
  `ReactGA.gtag('consent', 'update', {...})` when the user actually chooses, and persisting that
  choice (cookie or localStorage) entirely in this codebase.
- **The privacy policy needs updating** to document the analytics in use, once the banner design
  is settled enough to describe accurately.

**Reporting** (GA4 dashboard access, and/or an automatic monthly export) is property
administration, not application code; noted so it doesn't silently become an expected code
deliverable.

## Broader GA4 capabilities worth adopting later

Beyond the three events above, researched directly against Google's current documentation (2026):

- **Enhanced Measurement**: GA4 can automatically track scrolls, outbound link clicks, site
  search, video engagement, and file downloads with *zero code changes*, a toggle per event type
  in the GA4 property's Admin UI. Deliberately not enabled for file downloads specifically, since
  the custom `file_download` event already covers that interaction with richer parameters
  (download type, result count) the automatic version can't capture, and enabling both would just
  duplicate data. Scroll and outbound-click tracking (covering the many external links in this
  portal: DataHarmonizer, GISAID, external partner sites) remain open, low-effort additions.
- **User properties**: up to 25 per GA4 property, for traits like organization affiliation or
  clinical-vs-environmental submitter role, not just the `userId` already set. This portal already
  distinguishes clinical/environmental access and admin/write scopes
  (`userHasEnvironmentalAccess`, `userIsEnvironmentalAdmin`, etc.), which map naturally onto GA4
  user properties for segmenting portal usage by user type.
- **BigQuery export**: a GA4-exclusive capability Universal Analytics never had at this tier, free
  daily export of raw, event-level data to BigQuery. Worth flagging to whoever owns the GA4
  property; it's a GA4-admin-side setting, not something this codebase configures.

## Testing strategy

Test the boundary this codebase owns, not the third party it doesn't.

**Testable and tested:**
- The initialization guard (empty measurement ID skips `ReactGA.initialize()` entirely):
  `global/hooks/useTrackingContext/index.test.tsx`.
- The event-shape mapping for each named event (`trackExplorerView`/`trackFileDownload`/
  `trackFacetFilter`) and the `facet_filter` add/remove sqon-diffing logic: `global/hooks/
  useTrackingContext/events.test.ts`.
- `resolveExportColumns`'s column-customizer resolution and `createTrackedMetadataOnlyExporter`'s
  event-before-download ordering: `global/utils/arrangerExport.test.ts`.

**Not unit-testable, and not forced into being:**
- Whether Google's servers actually received an event: verify via GA4 DebugView or the Analytics
  Debugger extension, not a test suite.
- Enhanced Measurement firing correctly: Google's injected script behavior, opaque from the app's
  side; verify manually in DebugView if enabled.
- Consent Mode gating, once implemented: the app's own `gtag('consent', ...)` call happening
  before other tags fire is testable with the same boundary-mocking approach as above; Google's
  actual behavior in response to it is again a DebugView/manual check.

## Implementation notes

Non-obvious findings from actually building this, not covered above:

- **First React-rendering test in this codebase**: added `@testing-library/react@^12.1.5` (the
  last major supporting React <18, this project is on React 17), `jest-environment-jsdom@^29.7.0`
  (matching the installed `jest@^29` major), `@types/jest@^29.5.14`, and a new `jest.config.js`
  (`testEnvironment: 'jsdom'`), since none of that existed before. The pre-existing plain
  `.test.js` files needed no changes and still pass under jsdom.
- **`react-ga4` ships only an `"exports"` field, no `"main"` fallback**, unlike
  `@overture-stack/sqon` (which has both). This project's ESLint resolver
  (`eslint-import-resolver-babel-module@5.3.2`, already latest) can't follow exports-only
  packages, producing a false `import/no-unresolved` error despite the package resolving fine at
  build time (webpack) and type-check time (`tsc`). Fixed with `settings['import/core-modules']:
  ['react-ga4']` in `.eslintrc.js`, not a resolver upgrade, none exists. Relevant again if another
  exports-only, no-main package gets added later.
- **`react-ga4`'s own `UaEventOptions` type isn't actually exported** from the package (declared
  internally, missing from its public `export` statement), confirmed against the shipped
  `.d.mts`. `LogEventFunctionType` is defined locally in `types.ts` rather than aliased from
  `typeof ReactGA.event`, both because the real type is unreachable and because `react-ga4`'s
  `event()` accepts `UaEventOptions | string` while this app only ever calls it with the object
  form; aliasing directly would have falsely widened the app's own callback type.
