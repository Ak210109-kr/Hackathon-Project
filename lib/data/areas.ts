import type { Operator } from './plans'

export type SignalReading = { g4: number; g5: number | null }

export type Locality = {
  id: string
  name: string
  city: string
  demoReports: number
  signals: Record<Operator, SignalReading>
}

export const VERIFIED_REPORT_THRESHOLD = 25

function loc(
  city: string,
  name: string,
  demoReports: number,
  jio: [number, number | null],
  airtel: [number, number | null],
  vi: [number, number | null],
): Locality {
  return {
    id: `${city}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    city,
    demoReports,
    signals: {
      jio: { g4: jio[0], g5: jio[1] },
      airtel: { g4: airtel[0], g5: airtel[1] },
      vi: { g4: vi[0], g5: vi[1] },
    },
  }
}

// DEMO DATA: signal scores (0–5) are illustrative, not real measurements.
export const LOCALITIES: Locality[] = [
  loc('Bengaluru', 'Koramangala', 142, [4.3, 4.5], [4.4, 4.2], [3.6, null]),
  loc('Bengaluru', 'Whitefield', 96, [4.1, 3.9], [3.8, 4.3], [3.2, null]),
  loc('Bengaluru', 'Electronic City', 61, [3.9, 4.2], [3.5, 3.1], [2.8, null]),
  loc('Bengaluru', 'Yelahanka', 9, [3.4, 2.6], [3.7, null], [2.9, null]),

  loc('Mumbai', 'Andheri West', 188, [4.2, 4.4], [4.5, 4.6], [4.0, 3.4]),
  loc('Mumbai', 'Powai', 77, [4.4, 4.1], [4.0, 4.3], [3.7, null]),
  loc('Mumbai', 'Thane West', 54, [4.0, 3.8], [3.9, 3.5], [3.8, 2.9]),
  loc('Mumbai', 'Kharghar', 12, [3.6, 3.0], [3.2, null], [3.4, null]),

  loc('Delhi NCR', 'Connaught Place', 164, [4.5, 4.6], [4.4, 4.5], [3.9, 3.2]),
  loc('Delhi NCR', 'Dwarka', 83, [4.1, 4.0], [4.2, 3.8], [3.3, null]),
  loc('Delhi NCR', 'Noida Sector 62', 70, [4.0, 4.3], [3.7, 4.0], [3.0, null]),
  loc('Delhi NCR', 'Sohna Road', 14, [3.2, 2.4], [3.6, 3.0], [2.6, null]),

  loc('Pune', 'Hinjewadi', 88, [3.8, 3.6], [4.2, 4.4], [3.1, null]),
  loc('Pune', 'Kothrud', 59, [4.2, 4.0], [4.0, 3.7], [3.9, 3.0]),
  loc('Pune', 'Wagholi', 7, [3.1, null], [3.4, 2.7], [2.5, null]),

  loc('Hyderabad', 'Gachibowli', 121, [4.3, 4.4], [4.1, 4.2], [3.4, null]),
  loc('Hyderabad', 'Secunderabad', 66, [4.0, 3.7], [4.2, 3.9], [3.5, null]),

  loc('Kolkata', 'Salt Lake', 72, [4.1, 3.9], [3.9, 3.6], [3.7, null]),
  loc('Kolkata', 'Howrah', 11, [3.5, 2.8], [3.3, null], [3.0, null]),

  loc('Chennai', 'OMR', 98, [4.0, 4.2], [4.3, 4.1], [3.2, null]),
  loc('Chennai', 'T. Nagar', 64, [4.4, 4.0], [4.1, 3.8], [3.6, null]),
]

export const CITIES = Array.from(new Set(LOCALITIES.map((l) => l.city)))

export function isVerified(locality: Locality) {
  return locality.demoReports >= VERIFIED_REPORT_THRESHOLD
}
