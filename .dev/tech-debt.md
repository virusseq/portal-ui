# Tech debt

Known issues, scope-adjacent problems, and deferred work. Format per `conventions/session-discipline.md` § Tech-debt entry format.

---

`global/utils/arrangerExport.ts`'s `resolveExportColumns` duplicates `@overture-stack/arranger-components`'s own internal `saveTSV` column-customizer logic verbatim (not part of that package's public API, confirmed by tracing its real source). It exists because the "Metadata only" download exporter needs to fire a `file_download` tracking event, and `{ function: 'saveTSV' }` accepts only one callback, so the shorthand had to be replaced with a function that reproduces what it does. This can silently drift from Arranger's real behavior if that internal logic ever changes with no corresponding public API change to notice.
fix: remove `resolveExportColumns` once Arranger ships either a public `onExport` hook (fired for any exporter, built-in or custom) or exports `saveTSV` directly; both were raised with an Arranger-focused peer session and logged on their end as an open API decision, not committed yet. Until then, re-check this function against Arranger's source on any `@overture-stack/arranger-components` upgrade that touches `Table/DownloadButton`.
standalone: yes

Two Arranger components used by this app (`Aggregations`'s `onValueChange` prop, `DownloadButton`'s internal `saveTSV`) are plain JS with no corresponding TypeScript props interface, so real capabilities they have are invisible to anyone discovering the API through types rather than reading source directly. Confirmed both cases directly with an Arranger-focused peer session tracing the actual source, not the compiled `dist` output this project depends on.
fix: no local fix available, this is upstream. When integrating a new Arranger component, don't conclude a capability doesn't exist just because it's absent from the `.d.ts` files; check the compiled `dist` JS directly or ask someone with source access first.
standalone: yes
