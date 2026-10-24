import { TriangleAlert } from 'lucide-react'
import { type Locality, VERIFIED_REPORT_THRESHOLD } from '@/lib/data/areas'

export function CoverageWarning({ locality, city }: { locality: Locality | null; city: string }) {
  const place = locality ? `${locality.name}, ${city}` : `your area in ${city}`

  return (
    <div role="alert" className="flex gap-3 rounded-2xl border border-warning bg-warning-muted p-4 md:p-5">
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-warning-foreground" aria-hidden="true" />
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-warning-foreground">Local coverage not verified for {place}</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          {locality
            ? `Only ${locality.demoReports} sample reports exist here (we need ${VERIFIED_REPORT_THRESHOLD}+). Treat the network scores below as a rough guide.`
            : 'We have no signal data for this area, so network suitability cannot be scored. Plans are ranked on recharge value only.'}
        </p>
        <ul className="mt-1 list-disc pl-4 text-sm text-foreground/80">
          <li>Ask neighbours or classmates which network works indoors.</li>
          <li>Check the operator&apos;s official coverage map before porting.</li>
          <li>Start with a short-validity plan before committing to a long one.</li>
        </ul>
      </div>
    </div>
  )
}
