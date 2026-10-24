import { Info, Zap } from 'lucide-react'
import { OPERATORS } from '@/lib/data/plans'
import { type NetworkPref, costPerDay, costPerGB } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import type { RankedPlan } from './plan-results'
import { ScoreMeter } from './score-meter'

function formatData(gb: number) {
  return Number.isInteger(gb) ? `${gb} GB` : `${gb.toFixed(1)} GB`
}

export function PlanCard({ ranked, network, rank }: { ranked: RankedPlan; network: NetworkPref; rank: number }) {
  const { plan, value, suitability } = ranked
  const op = OPERATORS[plan.operator]

  const notes: string[] = []
  if (network === '5G' && !plan.unlimited5G) notes.push('No unlimited 5G — 5G usage counts against your data quota.')
  if (suitability?.usedFallback) notes.push(`${op.name} 5G not reported in this area; scored on 4G.`)

  return (
    <article
      className={cn(
        'flex h-full flex-col gap-4 rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md',
        rank === 1 && 'border-primary/50 ring-1 ring-primary/20',
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className={cn('size-2 rounded-full', op.dotClass)} aria-hidden="true" />
            {op.name}
            {rank === 1 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                Top pick
              </span>
            )}
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold tracking-tight">
            ₹{plan.price.toLocaleString('en-IN')}
          </p>
        </div>
        {plan.unlimited5G && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            <Zap className="size-3.5" aria-hidden="true" />
            Unlimited 5G
          </span>
        )}
      </header>

      <dl className="grid grid-cols-3 gap-2 rounded-xl bg-muted/60 p-3 text-center">
        <div>
          <dt className="text-xs text-muted-foreground">Validity</dt>
          <dd className="font-medium">{plan.validityDays} days</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Data</dt>
          <dd className="font-medium">
            {plan.dataPerDayGB ? `${formatData(plan.dataPerDayGB)}/day` : formatData(plan.totalDataGB)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Per GB</dt>
          <dd className="font-mono font-medium">₹{costPerGB(plan).toFixed(1)}</dd>
        </div>
      </dl>

      <div className="grid gap-3">
        <ScoreMeter
          label="Recharge value"
          score={value}
          tone="value"
          hint={`₹${costPerDay(plan).toFixed(1)}/day · ${formatData(plan.totalDataGB)} total`}
        />
        <ScoreMeter label={`${network} fit in your area`} score={suitability?.score ?? null} />
      </div>

      {notes.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {notes.map((note) => (
            <li key={note} className="flex gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {note}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-auto border-t pt-3 text-xs text-muted-foreground">{plan.perks.join(' · ')}</p>
    </article>
  )
}
