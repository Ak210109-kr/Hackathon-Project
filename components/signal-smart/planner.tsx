'use client'

import { useMemo, useState } from 'react'
import { LOCALITIES, isVerified } from '@/lib/data/areas'
import { PLANS } from '@/lib/data/plans'
import { suitabilityFor, valueScore } from '@/lib/scoring'
import { AreaSnapshot } from './area-snapshot'
import { CoverageWarning } from './coverage-warning'
import { FilterPanel, type Filters, UNLISTED } from './filter-panel'
import { PlanResults, type RankedPlan } from './plan-results'

const VALIDITY_RANGES: Record<Filters['validity'], [number, number]> = {
  any: [0, Infinity],
  month: [0, 31],
  quarter: [50, 100],
  year: [300, Infinity],
}

const DEFAULT_FILTERS: Filters = {
  budget: 500,
  validity: 'any',
  operators: ['jio', 'airtel', 'vi'],
  network: '5G',
  city: 'Bengaluru',
  localityId: LOCALITIES[0].id,
  place: 'home',
}

export function Planner() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

  const locality = filters.localityId === UNLISTED ? null : (LOCALITIES.find((l) => l.id === filters.localityId) ?? null)
  const verified = locality ? isVerified(locality) : false

  const ranked = useMemo<RankedPlan[]>(() => {
    const [minDays, maxDays] = VALIDITY_RANGES[filters.validity]
    return PLANS.filter(
      (plan) =>
        plan.price <= filters.budget &&
        plan.validityDays >= minDays &&
        plan.validityDays <= maxDays &&
        filters.operators.includes(plan.operator),
    ).map((plan) => ({
      plan,
      value: valueScore(plan),
      suitability: suitabilityFor(plan.operator, locality, filters.network, filters.place),
    }))
  }, [filters, locality])

  return (
    <section id="compare" className="scroll-mt-14 border-b bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Compare plans for your area</h2>
          <p className="max-w-2xl text-muted-foreground">
            Set your budget and where you use your phone most. Recharge value and network suitability are scored
            separately, so a cheap plan never hides a weak signal.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
          <FilterPanel filters={filters} onChange={setFilters} />

          <div className="flex min-w-0 flex-col gap-6">
            {!verified && <CoverageWarning locality={locality} city={filters.city} />}
            <AreaSnapshot
              locality={locality}
              city={filters.city}
              network={filters.network}
              place={filters.place}
              verified={verified}
            />
            <PlanResults ranked={ranked} network={filters.network} areaKnown={locality !== null} />
          </div>
        </div>
      </div>
    </section>
  )
}
