# Roadmap

Planned work and architectural direction for virusseq-portal-ui. Read at session start.

---

## Active initiatives

**Google Analytics 4 migration** (package swap and custom events done; consent banner ahead): `react-ga` replaced with `react-ga4`; `explorer_view`, `file_download`, and `facet_filter` events implemented and tested, verified against a dev measurement ID. Remaining: a PIPEDA-driven consent banner gating analytics, disabling Google's ad-personalization signals, and pushing the dev infra change (uncommitted) on a feature branch before prod promotion. Depth: [`.dev/docs/atlas/roadmap/google-analytics-4-migration.md`](docs/atlas/roadmap/google-analytics-4-migration.md).

---

## Parked / future

(none yet)
