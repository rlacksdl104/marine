import { Header } from "@/components/header"
import { PageIntroSection } from "@/components/page-intro-section"
import { Footer } from "@/components/footer"

export default function IntroPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PageIntroSection />
      <Footer />
    </main>
  )
}
