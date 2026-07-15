# BreakRoom — Build Plan

> Stages are sequential. A stage is DONE only when its acceptance criteria pass and the owner
> has approved the PR(s) after testing the Vercel preview on a phone.
> One stage may span multiple small PRs. Never bundle multiple stages into one PR.

## The Loop (applies to every stage)

1. **Plan** — Claude Code session reads VISION.md, STACK.md, this file; posts a short plan for the stage; owner OKs it.
2. **Build** — work on a feature branch (`stage-N/short-name`). Implementer writes code; `test-writer` subagent writes/extends tests alongside; `db-guardian` subagent reviews any schema/RLS change before it's committed.
3. **Self-review** — `code-reviewer` subagent reviews the full diff before the PR opens.
4. **PR** — open PR with a description of what changed + how to test on the preview URL.
5. **CI gates** — GitHub Actions: lint → typecheck → unit tests → build. All must pass.
6. **Agent review** — claude-code-action auto-reviews the PR; findings addressed or explicitly waived.
7. **Owner review** — owner tests the Vercel preview on a phone; comments (can tag @claude for fixes).
8. **Merge** — owner approves → squash-merge to `main` → Vercel auto-deploys production.

## Stages

### Stage 0 — Foundations
Repo + Next.js (TS, App Router) + Tailwind + shadcn/ui scaffold; retro theme tokens; Supabase project wired (env vars in Vercel); CI workflows live; branch protection on; deployed.
**Accept:** themed landing page at production URL; a deliberately failing test blocks a demo PR (gates proven); preview deploys work.

### Stage 1 — Accounts & Profiles
Google + email/password auth; unique-handle picker on first login; profile page (avatar upload to Supabase Storage, bio, region placeholder); `profiles` table with RLS.
**Accept:** owner signs up on phone, sets handle + avatar; second account cannot take the same handle; RLS verified (user A cannot edit user B's profile via API).

### Stage 2 — Casual Match Logging
Log a match vs another registered player: game type (8/9/10-ball), detail level (quick win-loss / race score / detailed stats); opponent confirm-or-dispute flow; pending vs confirmed states; match history on profiles.
**Accept:** full log→confirm cycle between two real accounts on phones; disputed match never shows as confirmed; detailed stats persist correctly.

### Stage 3 — Ratings & Leaderboards
Glicko-2 engine (server-side, unit-tested against published reference values); per-game-type ratings updated on confirmation; global + regional leaderboards; region via browser geolocation (permission-based, store city/region only) with manual fallback picker.
**Accept:** rating moves correctly after confirmed match; reference-value tests pass; leaderboards filter by region; denying location still allows manual region.

### Stage 4 — Roles, Admin & Venues
Role system (player/organizer/admin); organizer application + admin approval queue; admin panel skeleton; venue CRUD (organizer/admin only).
**Accept:** player applies → admin approves → player gains organizer powers; non-organizer blocked from venue creation at BOTH the UI and the database (RLS) layer.

### Stage 5 — Tournaments: Single Elimination
Tournament CRUD (organizer): name, game, format, venue, date, race lengths, entry-fee note, cap; player registration + organizer walk-in add; random or rating-seeded draw with byes; bracket render (mobile-first); organizer score entry; auto-advance; champion + results recorded; tournament matches feed stats/ratings.
**Accept:** owner runs a fake 8-player event end-to-end on a phone, including a bye and a walk-in; bracket-generation unit tests pass for sizes 3–64.

### Stage 6 — Going Live (Realtime)
Supabase Realtime on brackets — all viewers update in ~1s; "you're up next / on deck" banners; player-reported scoring mode (winner reports, opponent confirms, organizer overrides); reconnect logic (resubscribe + re-fetch, no silent staleness).
**Accept:** two phones side-by-side — score entered on one appears on the other without refresh; airplane-mode toggle test recovers cleanly; both reporting modes work.

### Stage 7 — Double Elimination
Winners + losers brackets; correct loser-drop routing; grand final incl. bracket reset; per-side race lengths.
**Accept:** fake double-elim event start-to-finish; routing unit tests pass for 4–32 players incl. byes; the double-final (bracket reset) case works.

### Stage 8 — Social Layer
Friends (request/accept); comments on matches + tournaments; activity feed (friends' results, milestones, upcoming events); privacy toggle (private = stats/history hidden from non-friends; bracket entries remain public).
**Accept:** two accounts friend each other; feed shows friend activity; private profile hides stats from strangers but not friends; comments post and render.

### Stage 9 — Notifications
In-app notification center (bell); Web Push (VAPID) via Supabase Edge Function; events: match up-next/on-deck, confirm requests, friend requests, comments, organizer decisions, tournament reminders; PWA install prompt targeting tournament players; notification preferences.
**Accept:** phone locked in pocket → push arrives when match is up (Android browser + iOS installed-PWA both verified); bell works with push denied.

### Stage 10 — Moderation & Launch Polish
Report button (comments/profiles); admin review queue (hide/delete, warn/ban); PWA polish (icons, splash, offline shell); empty states, error states, loading skeletons; Playwright E2E on the golden path; launch checklist (RLS audit on every table, Lighthouse pass, backup/export note).
**Accept:** report→admin resolution cycle works; banned user is actually locked out; E2E suite green in CI; owner declares it stranger-ready.

## Future (explicitly parked)
Payments/entry fees · native apps · more game types · round robin/Swiss/chip formats · leagues/seasons · automated moderation · venue pages/leaderboards.
