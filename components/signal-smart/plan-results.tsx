'use client'

import { useState } from 'react'
import type { Plan } from '@/lib/data/plans'
import type { NetworkPref, Suitability } from '@/lib/scoring'
import { PlanCard } from './plan-card'
import { Segmented } from './segmented'

export type RankedPlan = { plan: Plan; value: number; suitability: Suitability | null }

type SortMode = 'balanced' | 'value' | 'network'

function sortPlans(list: RankedPlan[], mode: SortMode) {
  const key = (r: RankedPlan) => {
    const s = r.suitability?.score
    if (mode === 'value') return r.value
    if (mode === 'network') return s ?? r.value
    return s === undefined ? r.value : r.value * 0.5 + s * 0.5
  }
  return [...list].sort((a, b) => key(b) - key(a) || a.plan.price - b.plan.price)
}

export function PlanResults({
  ranked,
  network,
  areaKnown,
}: {
  ranked: RankedPlan[]
  network: NetworkPref
  areaKnown: boolean
}) {
  const [mode, setMode] = useState<SortMode>('balanced')
  const sorted = sortPlans(ranked, mode)

  return (
    <section aria-labelledby="results-title" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="results-title" className="font-semibold">
          {ranked.length} {ranked.length === 1 ? 'plan' : 'plans'} in your budget
        </h3>
        <Segmented
          label="Sort plans by"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'balanced', label: 'Balanced' },
            { value: 'value', label: 'Best value' },
            { value: 'network', label: 'Best signal' },
          ]}
          className="w-full sm:w-auto"
        />
      </div>

      {!areaKnown && mode !== 'value' && (
        <p className="text-sm text-muted-foreground">
          Network data is unavailable for this area, so ranking falls back to recharge value.
        </p>
      )}

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card p-8 text-center">
          <p className="font-medium">No plans match these filters</p>
          <p className="mt-1 text-sm text-muted-foreground">Try raising your budget or choosing “Any” validity.</p>
        </div>
      ) : (
        <ol className="grid gap-4 md:grid-cols-2">
          {sorted.map((r, index) => (
            <li key={r.plan.id}>
              <PlanCard ranked={r} network={network} rank={index + 1} />
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
