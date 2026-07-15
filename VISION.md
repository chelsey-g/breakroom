# BreakRoom — Project Vision

> **Status:** Vision locked (2026-07-15). Name "BreakRoom" is a PLACEHOLDER — final name TBD.
> **Purpose of this doc:** Complete, self-contained project definition. A fresh AI session or developer
> should be able to read this and fully understand what is being built without asking the owner anything.

---

## 1. One-Paragraph Summary

BreakRoom is a **public, mobile-first web app (PWA)** for billiards players. Anyone can sign up to
log matches (8-ball, 9-ball, 10-ball), build a skill rating, climb global and regional leaderboards,
and participate in **in-person tournaments** run by approved organizers. The app replaces the
whiteboard bracket at live events with a **real-time digital bracket** that spectators and players
watch update live. It includes a full social layer: profiles, friends, comments, and an activity feed.
It is a hobby project built for fun, must run on **free hosting tiers**, and has a
**retro vintage-billiards-poster** visual identity.

## 2. Core Facts & Constraints

| Item | Decision |
|---|---|
| Audience | Public — open signups, anyone can join |
| Platform | Responsive web app, mobile-first, installable PWA. Native apps possible later; not now |
| Budget | $0/month — free tiers only, as long as possible |
| Developer | AI (Claude) writes all code; owner tests, directs, makes decisions |
| Visual style | Retro / vintage billiards poster (deep felt green, cream, classic ornamental type) |
| Name | Placeholder "BreakRoom" — designed for easy rename |
| Payments | NONE at launch. App may note entry fee amount as text; cash handled in person. In-app payments = future phase |

## 3. User Roles

1. **Player (default)** — any signed-up user. Can log casual matches, join tournaments, add friends,
   comment, appear on leaderboards.
2. **Organizer** — a player who has been approved by an admin. Can create/run tournaments and add venues.
3. **Admin** — app owner + trusted users. Approves organizer applications, reviews content reports,
   manages venues, full moderation powers.

Role model: Admins approve new organizers (application/request flow required).

## 4. Games & Match Logging

- Supported games: **8-ball, 9-ball, 10-ball**. Each tracked separately for stats/ratings.
- Match detail is **configurable per match** — three depth levels:
  1. **Quick:** win/loss only
  2. **Standard:** race score (e.g., won 5–3 in a race to 5)
  3. **Detailed:** innings, break-and-runs, safeties, and similar per-game stats
- **Casual matches** (outside tournaments): a player logs the match; it counts toward stats and
  **affects rating ONLY after the opponent confirms the result** (anti-abuse: prevents fake wins).
  Unconfirmed matches show as "pending" and never touch ratings.
- **Tournament matches**: reported per the tournament's reporting setting (see §6); count toward
  stats and ratings automatically once final.

## 5. Ratings & Leaderboards

- Rating system: **Glicko-2** (modern Elo successor; handles new/infrequent players gracefully).
  Displayed to users as a simple number, Elo-style.
- **Separate rating per game type** (8-ball, 9-ball, 10-ball) + a displayed overall average.
- Leaderboards: **global** (whole app) and **regional** (geographic area — city/region level,
  NOT per-venue).
- Region source: **auto-detected from device location with user permission**; store region
  (city/state), never precise coordinates. Fallback: manual region selection if permission denied
  (required fallback — cannot strand users who deny location).

## 6. Tournaments (Centerpiece Feature)

- **In-person events.** The app is the bracket + scorekeeping tool, not an online play platform.
- Formats at launch: **single elimination** and **double elimination**.
- Created and run by **organizers** (admin-approved).
- Entry: **both** pre-event in-app signup AND day-of walk-ins added manually by the organizer.
- Seeding: organizer chooses per event — **random draw** or **seeded by rating**.
- Score reporting: organizer setting per event —
  - **Organizer-only:** organizer enters all results, OR
  - **Player-reported:** winner reports, opponent confirms; organizer can override/correct.
- **Live brackets:** bracket updates in real time for every viewer (players and spectators) without
  refreshing.
- Tournament attributes: name, game type, format, venue, date/time, race lengths (can differ by
  round/side), entry fee (display text only), participant cap, status (draft → registration →
  live → complete).

## 7. Venues (Lightweight)

- Venues = real locations (pool halls, bars) attached to tournaments.
- Created by **organizers/admins only**.
- Fields: name, address/city/region, optional photo/notes.
- No venue pages beyond basic info; NO per-venue leaderboards.

## 8. Social Layer

- **Profiles:** display name, avatar, bio, region, ratings, stats, match history, trophies.
- **Privacy:** public by default; per-user toggle to go private (private = stats/history hidden from
  non-friends; still appears in tournament brackets they enter — brackets are inherently public).
- **Friends:** mutual friend/follow system.
- **Comments:** on matches and tournaments.
- **Activity feed:** friends' recent matches, rating milestones, tournament results, upcoming
  tournaments.
- **Moderation at launch:** report button on comments/profiles → admin review queue (hide/delete
  content, warn/ban users). No automated filtering at launch.

## 9. Notifications (Launch-Critical)

- **Web push notifications** (PWA), with in-app notification center as fallback.
- Key notification: **"Your match is up next"** during live tournaments (+ "you're on deck").
- Others: match confirmation requests, friend requests, tournament registration open/reminders,
  comments on your content, organizer approval decisions.

## 10. Explicitly OUT of Scope (for now)

- In-app payments / entry fee collection (future phase)
- Native iOS/Android apps (future phase, PWA first)
- Games beyond 8/9/10-ball (straight pool, one-pocket, snooker)
- Round robin / Swiss / chip tournament formats
- Per-venue leaderboards or rich venue pages
- Automated content moderation
- Online/remote play of any kind
- Leagues/seasons (possible future)

## 11. Success Criteria (Hobby-Project Edition)

1. Owner can run a real Friday-night tournament start-to-finish from a phone.
2. Spectators can watch the bracket update live on their own phones.
3. Players check their rating/leaderboard position and want to come back.
4. Runs at $0/month at small-community scale.

## 12. Decisions Log

| # | Decision | Rationale |
|---|---|---|
| 1 | Public app, not private group | Owner wants open community |
| 2 | PWA over native | Free, one codebase, installable; native later if traction |
| 3 | Glicko-2 per game type | Fair seeding + meaningful leaderboards; better than raw Elo for sparse play |
| 4 | Opponent-confirm for casual matches | Prevents rating fraud in a public app |
| 5 | Admin-approved organizers | Prevents spam/fake tournaments |
| 6 | Regional (not venue) leaderboards | Owner preference; venues stay lightweight |
| 7 | Free-tier-only infrastructure | Hobby budget: $0/month |
| 8 | No payments at launch | Legal/complexity/cost; cash in person works fine |
| 9 | Report-based moderation | Right-sized for launch scale |
| 10 | Retro poster visual identity | Owner preference |
