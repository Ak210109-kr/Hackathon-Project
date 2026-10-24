export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <p className="font-medium text-foreground">SignalSmart</p>
        <p className="max-w-2xl text-pretty">
          Plan prices are samples for comparison and change often — always confirm on the operator&apos;s official app.
          Signal scores are demo data, not real measurements. Not affiliated with Jio, Airtel or Vi.
        </p>
      </div>
    </footer>
  )
}
