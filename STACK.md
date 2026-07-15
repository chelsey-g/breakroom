# BreakRoom — Technical Stack & Decisions

> All decisions below were agreed with the owner on 2026-07-15. Do not change without owner sign-off.
> Hard-to-undo ratings indicate how carefully changes must be treated.

## The Stack (one line)
**Next.js (React) + Tailwind CSS + shadcn/ui, hosted on Vercel, with Supabase for database (Postgres), auth, realtime, storage, and edge functions. $0/month target.**

## Decisions

### 1. Backend: Supabase — HARD TO UNDO: HIGH
- Postgres database, Supabase Auth, Realtime (live brackets), Storage (avatars/venue photos), Edge Functions (push sending, Glicko-2 recalc).
- **Row Level Security (RLS) is mandatory on every table.** Public app — the database is the security boundary, not the client.
- Free tier limits to respect: 500MB DB, 1GB storage, 200 concurrent realtime connections, 2M realtime messages/mo. Project pauses after ~1 week of zero activity (acceptable).
- Rationale: only free bundle with relational DB + realtime + auth. Data is deeply relational.

### 2. Frontend: Next.js (App Router) + TypeScript — HARD TO UNDO: MEDIUM
- TypeScript strict mode, always.
- Server-rendered public pages (tournaments, brackets, profiles) for shareable links with previews and fast loads.
- PWA: installable, service worker, web push. Mobile-first — assume a phone in a dim pool hall on bad wifi.

### 3. Styling: Tailwind CSS + shadcn/ui — HARD TO UNDO: LOW-MEDIUM
- shadcn/ui components are copied into the repo (`components/ui/`) and owned by us; customize freely.
- **Retro vintage billiards poster theme** via Tailwind/shadcn theme tokens:
  - Deep felt green primary, cream/off-white background tones, wood/brass accents, chalk-blue highlight.
  - Classic display typeface for headings (vintage poster feel), highly readable body font.
  - Define once in the theme; components inherit. No hardcoded colors in components.

### 4. Hosting: Vercel — HARD TO UNDO: LOW
- Free (Hobby) tier, non-commercial use. Auto-deploy from GitHub `main`. Preview deployment per PR (owner tests on phone before merge).

### 5. Auth: Supabase Auth — HARD TO UNDO: LOW-MEDIUM
- Methods at launch: **Google OAuth + email/password.** No Apple (requires $99/yr dev account — violates budget; only needed if native iOS someday). No SMS (costs money).
- Post-signup requirement: choose a unique player handle before using the app.

### 6. Realtime: Supabase Realtime — HARD TO UNDO: LOW
- Live bracket updates for all viewers; "up next / on deck" banners.
- Must handle flaky connections: auto-resubscribe + full re-fetch on reconnect. Never show a stale bracket silently.

### 7. Ratings: Glicko-2 — implemented in-repo
- One rating per player per game type (8-ball, 9-ball, 10-ball) + displayed overall average.
- Only confirmed/final matches affect ratings. Rating math runs server-side (edge function or server action) — never trust the client.

### 8. Notifications: Web Push + in-app center
- Web Push via VAPID (free, standard). Sending logic in Supabase Edge Functions.
- iOS caveat: push requires PWA installed to home screen. Mitigations: in-app notification bell (works everywhere), live "up next" banners on the bracket screen, install prompt targeted at tournament participants.

## Engineering Toolchain
- **GitHub** — source of truth. Branch protection on `main`: PRs only, CI must pass.
- **GitHub Actions** — CI on every PR: lint (ESLint), typecheck (tsc), unit tests (Vitest), build. Plus Claude Code agents (see AGENTS section in CLAUDE.md).
- **Vitest** — unit tests (bracket logic, Glicko-2 math are the crown jewels — heavily tested).
- **Playwright** — E2E smoke tests for critical flows (added Stage 5+).
- **Claude Code** — primary development happens in Claude Code sessions with project subagents in `.claude/agents/`.
- **claude-code-action@v1** — GitHub-side agent: auto-reviews PRs, responds to @claude mentions. Requires `ANTHROPIC_API_KEY` or `CLAUDE_CODE_OAUTH_TOKEN` repo secret (see SETUP.md).

## Cost Ledger (keep at $0)
| Service | Tier | Cost |
|---|---|---|
| Supabase | Free | $0 |
| Vercel | Hobby | $0 |
| GitHub + Actions | Free (public repo = unlimited CI minutes; private = 2,000 min/mo) | $0 |
| Web Push (VAPID) | Standard | $0 |
| Google OAuth | Standard | $0 |
| Claude GitHub agents | Uses owner's Anthropic API key or Claude Pro/Max token | owner's existing plan |
| Custom domain (optional, later) | — | ~$10–15/yr |
