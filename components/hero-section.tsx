"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToContent = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591025207163-942350e47db2?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-balance drop-shadow-lg">
          바다의 생태계 고민해보신 적
          <br />
          있으신가요?
        </h1>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 flex flex-col items-center gap-2">
          <span className="text-sm opacity-80">아래로 스크롤해주세요</span>
          <button
            onClick={scrollToContent}
            className="animate-bounce p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="아래로 스크롤"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
