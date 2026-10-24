import { CommunityReports } from '@/components/signal-smart/community-reports'
import { Hero } from '@/components/signal-smart/hero'
import { HowItWorks } from '@/components/signal-smart/how-it-works'
import { Planner } from '@/components/signal-smart/planner'
import { SiteFooter } from '@/components/signal-smart/site-footer'
import { SiteHeader } from '@/components/signal-smart/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Planner />
        <HowItWorks />
        <CommunityReports />
      </main>
      <SiteFooter />
    </>
  )
}
