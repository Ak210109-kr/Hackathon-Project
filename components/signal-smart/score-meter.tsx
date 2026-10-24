import { barTone, scoreLabel } from '@/lib/scoring'
import { cn } from '@/lib/utils'

export function ScoreMeter({
  label,
  score,
  hint,
  tone,
}: {
  label: string
  score: number | null
  hint?: string
  tone?: 'value'
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
        {score === null ? (
          <span className="font-medium text-warning-foreground">Not verified</span>
        ) : (
          <span className="font-mono font-semibold">
            {score}
            <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">{scoreLabel(score)}</span>
          </span>
        )}
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score ?? 0}
        aria-valuetext={score === null ? 'Not verified' : `${score} out of 100, ${scoreLabel(score)}`}
      >
        {score !== null && (
          <div
            className={cn('h-full rounded-full', tone === 'value' ? 'bg-foreground' : barTone(score))}
            style={{ width: `${score}%` }}
          />
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
