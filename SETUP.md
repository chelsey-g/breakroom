# SETUP.md — One-Time Setup (Owner Tasks)

Everything here is done once, mostly clicking. After this, the loop runs itself.
Claude Code walks you through each step live during Stage 0 — this doc is the reference.

## 1. Accounts (all free)
- [ ] **GitHub** account → create a repository (public repo = unlimited free CI minutes; private = 2,000/mo, still plenty).
- [ ] **Supabase** account (sign in with GitHub) → create project. Save the **Project URL** and **anon key** (Settings → API). The **service-role key** exists too — it bypasses all security; it goes ONLY into server-side env vars, never the repo, never the client.
- [ ] **Vercel** account (sign in with GitHub) → import the repo. Every push to `main` auto-deploys; every PR gets a preview URL.

## 2. Repo configuration
- [ ] Drop this bundle's files into the repo root (CLAUDE.md, VISION.md, STACK.md, PLAN.md, SETUP.md, `.claude/`, `.github/`).
- [ ] **Branch protection** on `main` (Settings → Branches): require a pull request before merging + require status checks to pass (select the CI job once it has run once).
- [ ] **Secrets** (Settings → Secrets and variables → Actions):
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from step 1)
  - `ANTHROPIC_API_KEY` — or `CLAUDE_CODE_OAUTH_TOKEN` if you have Claude Pro/Max (generate with `claude setup-token` locally; then edit the two claude workflows to use it instead of the API key).
- [ ] In Vercel project settings → Environment Variables: add the same two Supabase public vars (+ later, server-only vars as stages need them).

## 3. Claude GitHub app
- [ ] Easiest path: open Claude Code in the repo and run `/install-github-app` — it installs the GitHub app and wires secrets for you.
  (Manual alternative: install the app from github.com/apps/claude and add the secret yourself.)
- [ ] Test: open an issue, comment `@claude hello` — Claude should respond.

## 4. Google sign-in (Stage 1, ~10 minutes)
- [ ] Google Cloud Console → create OAuth client (Web) → authorized redirect URL from Supabase Auth settings → paste client ID/secret into Supabase → Auth → Providers → Google. Claude Code will give exact click-by-click instructions when Stage 1 starts.

## 5. Costs sanity check
GitHub, Vercel, Supabase, Web Push: **$0.** The only metered thing is the Claude GitHub agents,
which use your Anthropic API key (pay-per-use) or your Claude Pro/Max plan (included limits).
CI reviews on a hobby project's PR volume are modest.

## Your role in the loop, ongoing
1. Kick off each stage in Claude Code ("start Stage N").
2. When a PR opens: open the Vercel **preview URL on your phone**, poke at it.
3. Comment findings on the PR (or tag `@claude fix ...` and it will).
4. Approve + merge when happy. Production updates itself.
