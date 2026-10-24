import { IndianRupee, MapPin, RadioTower } from 'lucide-react'

const POINTS = [
  { icon: IndianRupee, title: 'Recharge value', text: 'Cost per GB and per day, scored on its own.' },
  { icon: RadioTower, title: 'Network suitability', text: '4G or 5G strength where you actually use your phone.' },
  { icon: MapPin, title: 'Honest coverage', text: 'A clear warning whenever your area is not verified.' },
]

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr] md:items-end md:px-6 md:py-20">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary">
            Jio · Airtel · Vi — network-aware comparison
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            The cheapest plan is worthless if there&apos;s no signal at your desk.
          </h1>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            SignalSmart compares prepaid recharges by budget, then checks how each network performs where you live,
            study or work — so you pick a plan that is good value <em>and</em> actually connects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#compare"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Compare plans for my area
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              How we score
            </a>
          </div>
        </div>
        <ul className="grid gap-3">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3 rounded-xl border bg-card p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
