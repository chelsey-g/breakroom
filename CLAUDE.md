# CLAUDE.md — BreakRoom

Billiards match-tracking + live tournament PWA. Public app, $0/month infra, hobby project.
**Read VISION.md (what & why), STACK.md (tech decisions), PLAN.md (stages & loop) before doing anything.**

## Prime Directives
1. **Follow the current stage in PLAN.md.** Do not build ahead. Do not bundle stages into one PR.
2. **Never push to `main`.** Feature branches (`stage-N/short-name`) → PR → CI green → owner approval → squash-merge.
3. **RLS on every table, always.** This is a public app; the database is the security boundary. Every new table ships with row-level security policies and a test proving they hold.
4. **Server-side truth.** Ratings math, bracket advancement, role checks, match confirmation — all enforced server-side. The client is untrusted.
5. **$0 budget.** No new paid services or paid tiers without explicit owner approval. Check STACK.md cost ledger.
6. **Mobile-first, bar-wifi-first.** Design for a phone in a dim pool hall on flaky wifi. Realtime code must recover from disconnects without silent staleness.
7. **Owner sign-off decisions:** anything in STACK.md, anything rated hard-to-undo MEDIUM+, schema changes to core entities, and anything touching money or legal.

## Conventions
- TypeScript strict; no `any` without a comment justifying it.
- Next.js App Router; server components by default, client components only when interactive.
- shadcn/ui components live in `components/ui/` and may be customized. Theme tokens only — no hardcoded colors/fonts in feature code (retro poster theme is defined centrally).
- Database changes ONLY via migration files in `supabase/migrations/` — never hand-edit the hosted DB.
- Tests: Vitest colocated `*.test.ts`. Bracket logic and Glicko-2 are the crown jewels — exhaustive tests required (all bracket sizes 3–64, byes, double-elim routing, bracket reset, Glicko-2 reference values).
- Commits: conventional (`feat:`, `fix:`, `test:`, `chore:`, `docs:`). Small, reviewable PRs (< ~400 lines diff when feasible).
- "BreakRoom" is a placeholder name — keep it in one config constant + theme so renaming is trivial.

## Subagents (.claude/agents/)
Delegate proactively:
- **code-reviewer** — MUST review the full diff before every PR opens. Read-only.
- **test-writer** — writes/extends tests for any logic change; owns coverage of brackets + ratings.
- **db-guardian** — MUST review every migration and RLS policy before commit. Read-only.

## GitHub agents (.github/workflows/)
- `ci.yml` — lint, typecheck, test, build on every PR. All required to merge.
- `claude.yml` — @claude mentions in issues/PRs get handled by Claude.
- `claude-review.yml` — automatic Claude review on every PR.

## Definition of Done (any PR)
- [ ] CI green (lint, typecheck, tests, build)
- [ ] code-reviewer subagent reviewed; db-guardian reviewed if schema/RLS touched
- [ ] New logic has tests; RLS changes have policy tests
- [ ] Works on a phone-sized viewport; loading/empty/error states handled
- [ ] PR description says what changed + how to test on the preview URL
