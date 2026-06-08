import { Header } from "@/components/header"
import { MiniGameSection } from "@/components/mini-game-section"
import { Footer } from "@/components/footer"

export default function MiniGamePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <MiniGameSection />
      <Footer />
    </main>
  )
}
