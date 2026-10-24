import { BadgeCheck, FlaskConical } from 'lucide-react'
import type { Locality } from '@/lib/data/areas'
import { OPERATORS, type Operator } from '@/lib/data/plans'
import { type NetworkPref, USAGE_PLACES, type UsagePlace, suitabilityFor } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { ScoreMeter } from './score-meter'

export function AreaSnapshot({
  locality,
  city,
  network,
  place,
  verified,
}: {
  locality: Locality | null
  city: string
  network: NetworkPref
  place: UsagePlace
  verified: boolean
}) {
  const placeLabel = USAGE_PLACES.find((p) => p.value === place)?.label.toLowerCase()
  const operators = Object.keys(OPERATORS) as Operator[]
  const scored = operators
    .map((op) => ({ op, s: suitabilityFor(op, locality, network, place) }))
    .sort((a, b) => (b.s?.score ?? 0) - (a.s?.score ?? 0))

  return (
    <section aria-labelledby="snapshot-title" className="rounded-2xl border bg-card p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 id="snapshot-title" className="font-semibold">
            {network} network suitability · {locality ? locality.name : 'Unlisted area'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {city} · used mostly at {placeLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning bg-warning-muted px-2.5 py-1 text-xs font-medium text-warning-foreground">
            <FlaskConical className="size-3.5" aria-hidden="true" />
            Demo data
          </span>
          {verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              {locality?.demoReports} sample reports
            </span>
          )}
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {scored.map(({ op, s }, index) => {
          const hint = !s
            ? 'No data for this area'
            : s.usedFallback
              ? 'No 5G reported — scored on 4G'
              : s.indoorPenalty
                ? 'Adjusted for indoor 5G'
                : undefined
          return (
            <li
              key={op}
              className={cn(
                'flex flex-col gap-3 rounded-xl border p-4',
                index === 0 && s && 'border-primary/40 bg-accent/40',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <span className={cn('size-2 rounded-full', OPERATORS[op].dotClass)} aria-hidden="true" />
                  {OPERATORS[op].name}
                </span>
                {index === 0 && s && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Best here</span>
                )}
              </div>
              <ScoreMeter label="Signal fit" score={s?.score ?? null} hint={hint} />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
