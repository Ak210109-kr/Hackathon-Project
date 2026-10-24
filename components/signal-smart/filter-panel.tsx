'use client'

import { useId } from 'react'
import { Slider } from '@/components/ui/slider'
import { CITIES, LOCALITIES } from '@/lib/data/areas'
import { OPERATORS, type Operator } from '@/lib/data/plans'
import { type NetworkPref, USAGE_PLACES, type UsagePlace } from '@/lib/scoring'
import { cn } from '@/lib/utils'
import { Segmented } from './segmented'

export const UNLISTED = 'unlisted'

export type Filters = {
  budget: number
  validity: 'any' | 'month' | 'quarter' | 'year'
  operators: Operator[]
  network: NetworkPref
  city: string
  localityId: string
  place: UsagePlace
}

const MIN_BUDGET = 150
const MAX_BUDGET = 4000

const selectClass =
  'h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
      ) : (
        <span className="text-sm font-medium">{label}</span>
      )}
      {children}
    </div>
  )
}

export function FilterPanel({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  const ids = { budget: useId(), city: useId(), area: useId() }
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) => onChange({ ...filters, [key]: value })
  const localities = LOCALITIES.filter((l) => l.city === filters.city)

  const toggleOperator = (op: Operator) => {
    const next = filters.operators.includes(op)
      ? filters.operators.filter((o) => o !== op)
      : [...filters.operators, op]
    if (next.length > 0) update('operators', next)
  }

  return (
    <aside
      aria-label="Plan filters"
      className="flex flex-col gap-6 rounded-2xl border bg-card p-5 lg:sticky lg:top-20"
    >
      <fieldset className="flex flex-col gap-6">
        <legend className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          1 · Budget
        </legend>
        <Field label="Maximum price" htmlFor={ids.budget}>
          <div className="flex items-baseline justify-between">
            <output htmlFor={ids.budget} className="font-mono text-2xl font-semibold">
              ₹{filters.budget.toLocaleString('en-IN')}
            </output>
            <span className="text-xs text-muted-foreground">up to ₹{MAX_BUDGET.toLocaleString('en-IN')}</span>
          </div>
          <Slider
            id={ids.budget}
            aria-label="Maximum price in rupees"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={50}
            value={[filters.budget]}
            onValueChange={(v) => update('budget', Array.isArray(v) ? v[0] : v)}
            className="py-2"
          />
        </Field>
        <Field label="Validity">
          <Segmented
            label="Validity"
            value={filters.validity}
            onChange={(v) => update('validity', v)}
            options={[
              { value: 'any', label: 'Any' },
              { value: 'month', label: '1 mo' },
              { value: 'quarter', label: '3 mo' },
              { value: 'year', label: '1 yr' },
            ]}
          />
        </Field>
        <Field label="Operators">
          <div className="flex gap-2">
            {(Object.keys(OPERATORS) as Operator[]).map((op) => {
              const active = filters.operators.includes(op)
              return (
                <button
                  key={op}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleOperator(op)}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'border-foreground/30 bg-card' : 'border-dashed text-muted-foreground opacity-60',
                  )}
                >
                  <span className={cn('size-2 rounded-full', OPERATORS[op].dotClass)} aria-hidden="true" />
                  {OPERATORS[op].name}
                </button>
              )
            })}
          </div>
        </Field>
      </fieldset>

      <div className="h-px bg-border" />

      <fieldset className="flex flex-col gap-6">
        <legend className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          2 · Network &amp; location
        </legend>
        <Field label="Preferred network">
          <Segmented
            label="Preferred network"
            value={filters.network}
            onChange={(v) => update('network', v)}
            options={[
              { value: '4G', label: '4G' },
              { value: '5G', label: '5G' },
            ]}
          />
        </Field>
        <Field label="City" htmlFor={ids.city}>
          <select
            id={ids.city}
            className={selectClass}
            value={filters.city}
            onChange={(e) => {
              const city = e.target.value
              const first = LOCALITIES.find((l) => l.city === city)
              onChange({ ...filters, city, localityId: first?.id ?? UNLISTED })
            }}
          >
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Main usage area" htmlFor={ids.area}>
          <select
            id={ids.area}
            className={selectClass}
            value={filters.localityId}
            onChange={(e) => update('localityId', e.target.value)}
          >
            {localities.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
            <option value={UNLISTED}>My area isn&apos;t listed</option>
          </select>
        </Field>
        <Field label="Where you use it most">
          <Segmented
            label="Where you use your phone most"
            value={filters.place}
            onChange={(v) => update('place', v)}
            options={USAGE_PLACES.map(({ value, label }) => ({ value, label }))}
            className="flex-wrap"
          />
        </Field>
      </fieldset>
    </aside>
  )
}
