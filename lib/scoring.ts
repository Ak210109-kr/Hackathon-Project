import type { Locality } from './data/areas'
import type { Operator, Plan } from './data/plans'

export type NetworkPref = '4G' | '5G'
export type UsagePlace = 'home' | 'campus' | 'office' | 'commute'

export const USAGE_PLACES: { value: UsagePlace; label: string; indoor: boolean }[] = [
  { value: 'home', label: 'Home', indoor: true },
  { value: 'campus', label: 'College', indoor: false },
  { value: 'office', label: 'Office', indoor: true },
  { value: 'commute', label: 'Commute', indoor: false },
]

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))

export function costPerGB(plan: Plan) {
  return plan.price / plan.totalDataGB
}

export function costPerDay(plan: Plan) {
  return plan.price / plan.validityDays
}

// Recharge value is computed from price, data and validity only — network quality is scored separately.
export function valueScore(plan: Plan) {
  const best = Math.log(3.5)
  const worst = Math.log(100)
  const gbScore = ((worst - Math.log(costPerGB(plan))) / (worst - best)) * 100
  const dayScore = ((14 - costPerDay(plan)) / (14 - 8)) * 100
  return Math.round(clamp(0.75 * clamp(gbScore) + 0.25 * clamp(dayScore)))
}

export type Suitability = {
  score: number
  usedFallback: boolean
  indoorPenalty: boolean
}

export function suitabilityFor(
  operator: Operator,
  locality: Locality | null,
  network: NetworkPref,
  place: UsagePlace,
): Suitability | null {
  if (!locality) return null
  const reading = locality.signals[operator]
  const indoor = USAGE_PLACES.find((p) => p.value === place)?.indoor ?? false

  let raw = reading.g4
  let usedFallback = false
  let indoorPenalty = false

  if (network === '5G') {
    if (reading.g5 === null) {
      raw = reading.g4 * 0.8
      usedFallback = true
    } else {
      raw = reading.g5
      if (indoor) {
        raw -= 0.4
        indoorPenalty = true
      }
    }
  }

  return { score: Math.round(clamp((raw / 5) * 100)), usedFallback, indoorPenalty }
}

export function scoreLabel(score: number) {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 45) return 'Fair'
  return 'Weak'
}

export function scoreTone(score: number) {
  if (score >= 80) return 'text-primary'
  if (score >= 65) return 'text-primary'
  if (score >= 45) return 'text-warning-foreground'
  return 'text-destructive'
}

export function barTone(score: number) {
  if (score >= 65) return 'bg-primary'
  if (score >= 45) return 'bg-warning'
  return 'bg-destructive'
}
