"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)
  const counterRef = useRef<HTMLSpanElement>(null)
  const animationRef = useRef<number | null>(null)

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeOutExpo * end))

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [end, duration])

  useEffect(() => {
    const element = counterRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)

    // 이미 뷰포트 안에 있는 경우 즉시 시작
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation()
      observer.disconnect()
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [startAnimation])

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

function AnimatedProgressBar({ targetWidth, duration = 1500 }: { targetWidth: number; duration?: number }) {
  const [width, setWidth] = useState(0)
  const hasStarted = useRef(false)
  const barRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setWidth(easeOutExpo * targetWidth)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setWidth(targetWidth)
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [targetWidth, duration])

  useEffect(() => {
    const element = barRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    // 이미 뷰포트 안에 있는 경우 즉시 시작
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startAnimation()
      observer.disconnect()
    }

    return () => {
      observer.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [startAnimation])

  return (
    <div ref={barRef} className="h-4 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[oklch(0.65_0.2_25)] to-[oklch(0.55_0.15_25)] rounded-full"
        style={{ width: `${width}%`, transition: 'none' }}
      />
    </div>
  )
}

// StatsSection은 변경 없음

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Waste disposal cost comparison */}
        <div className="mb-12">
          <div className="flex flex-wrap items-baseline gap-2 mb-4">
            <span className="text-xl md:text-2xl font-bold text-foreground">쓰레기 처리 비용 육상보다</span>
            <span className="text-3xl md:text-4xl font-bold text-[oklch(0.55_0.15_200)]">
              약 <AnimatedCounter end={5} duration={1000} />배 이상
            </span>
          </div>
        </div>

        {/* Collection rate progress bar */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium text-foreground">해양 쓰레기 수거율</span>
            <span className="text-xl font-bold text-[oklch(0.65_0.2_25)]">
              약 <AnimatedCounter end={40} duration={1500} suffix="%" />
            </span>
          </div>
          <AnimatedProgressBar targetWidth={40} duration={1500} />
        </div>

        {/* Annual marine life deaths */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-foreground">
            매년 해양 쓰레기 때문에 죽는 동물들
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Seabirds */}
            <div className="bg-[oklch(0.97_0.01_220)] rounded-2xl p-8 text-center">
              <div className="text-gray-600 mb-2">바다새</div>
              <div className="text-2xl md:text-3xl font-bold text-[oklch(0.55_0.15_200)]">
                약 <AnimatedCounter end={100} duration={2000} suffix="만 마리" />
              </div>
            </div>

            {/* Marine mammals */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 text-center">
              <div className="text-gray-600 mb-2">해양포유동물</div>
              <div className="text-2xl md:text-3xl font-bold text-[oklch(0.55_0.15_200)]">
                약 <AnimatedCounter end={10} duration={1800} suffix="만 마리" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
