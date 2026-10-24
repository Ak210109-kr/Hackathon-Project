import { SignalHigh } from 'lucide-react'

const NAV = [
  { href: '#compare', label: 'Compare' },
  { href: '#how-it-works', label: 'How scoring works' },
  { href: '#community', label: 'Signal reports' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <SignalHigh className="size-4" aria-hidden="true" />
          </span>
          SignalSmart
        </a>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#compare"
          className="rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Find my plan
        </a>
      </div>
    </header>
  )
}
