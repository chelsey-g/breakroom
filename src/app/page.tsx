import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center sm:max-w-2xl">
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-accent uppercase">
          Rack &apos;em
        </span>

        <h1 className="font-heading text-6xl leading-none text-primary sm:text-8xl">
          BreakRoom
        </h1>

        <p className="max-w-md text-balance text-lg text-foreground/80">
          Log your matches, climb the ratings, and run live tournament
          brackets from your phone &mdash; 8-ball, 9-ball, and 10-ball.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="px-6 text-base">
            Sign up
          </Button>
          <Button size="lg" variant="outline" className="px-6 text-base">
            Find a tournament
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Ratings via Glicko-2 &middot; Live brackets &middot; Free to play
        </p>
      </main>
    </div>
  );
}
