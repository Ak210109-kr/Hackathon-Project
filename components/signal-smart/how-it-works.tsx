const STEPS = [
  {
    n: '01',
    title: 'Recharge value',
    body: 'Scored only from price, total data and validity. Cost per GB carries most weight, with cost per day as a tiebreaker. Network quality never inflates this number.',
  },
  {
    n: '02',
    title: 'Network suitability',
    body: 'Scored from signal reports for your chosen area and network. If you prefer 5G but none is reported, we fall back to 4G and tell you. Indoor use adjusts 5G, which struggles through walls.',
  },
  {
    n: '03',
    title: 'Coverage check',
    body: 'Areas with fewer than 25 reports are marked unverified. You’ll see a warning and practical next steps instead of a confident-looking score.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-14 border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <h2 className="max-w-xl text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Two scores, kept apart on purpose
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Blending price and signal into one number hides trade-offs. We show both, so you decide what matters more.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-3 border-t-2 border-foreground pt-4">
              <span className="font-mono text-sm text-primary">{step.n}</span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
