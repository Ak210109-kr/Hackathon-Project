import { Lock, MessageSquareText, Smartphone, Users } from 'lucide-react'

const FEATURES = [
  { icon: Smartphone, title: 'Quick signal check-ins', text: 'Rate your network indoors and outdoors in two taps.' },
  { icon: Users, title: 'Neighbourhood averages', text: 'Scores built from real users near you, refreshed weekly.' },
  { icon: MessageSquareText, title: 'Time-of-day insight', text: 'See if speeds drop in the evening rush near your home.' },
]

export function CommunityReports() {
  return (
    <section id="community" className="scroll-mt-14 bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-6 md:py-20">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-background/25 px-3 py-1 font-mono text-xs uppercase tracking-widest text-background/80">
            Coming soon
          </span>
          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            User-reported signal quality
          </h2>
          <p className="mt-3 max-w-lg leading-relaxed text-background/70">
            Today every signal score on SignalSmart is clearly labelled demo data. Next, we&apos;ll let people share how
            their network actually performs — so recommendations reflect real streets, hostels and offices.
          </p>
          <ul className="mt-8 grid gap-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-[oklch(0.8_0.1_168)]" aria-hidden="true" />
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-background/65">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-background p-5 text-foreground" aria-disabled="true">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold">Report your signal</p>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="size-3.5" aria-hidden="true" />
              Preview only
            </span>
          </div>
          <fieldset disabled className="grid gap-4 opacity-70">
            <div className="grid grid-cols-3 gap-2">
              {['Jio', 'Airtel', 'Vi'].map((name) => (
                <span key={name} className="rounded-lg border px-3 py-2 text-center text-sm">
                  {name}
                </span>
              ))}
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Indoor signal</p>
              <div className="flex gap-1.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className="h-8 flex-1 rounded-md bg-muted" style={{ opacity: 0.4 + n * 0.12 }} />
                ))}
              </div>
            </div>
            <button
              type="button"
              className="cursor-not-allowed rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Submit report
            </button>
          </fieldset>
        </div>
      </div>
    </section>
  )
}
