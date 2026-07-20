# BreakRoom

Billiards match-tracking + live tournament PWA. See [VISION.md](./VISION.md) for what this is,
[STACK.md](./STACK.md) for tech decisions, and [PLAN.md](./PLAN.md) for the build stages.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

These four are what CI runs on every PR (`.github/workflows/ci.yml`).
