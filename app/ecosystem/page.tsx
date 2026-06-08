"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
      { threshold: 0.1 }
    )

    observer.observe(element)

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

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              해양 생태계에 사는 동물들의
              <br />
              <span className="text-primary">아픈 이야기</span>를 들어보세요
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-3xl leading-relaxed">
              매년 수백만 마리의 해양 동물들이 인간이 버린 쓰레기로 목숨을 잃습니다. 그물에 엉켜 서서히 죽어가는 물개와,
              플라스틱을 먹이로 오인해 고통받는 바다거북의 이야기를 통해 지금 바다가 처한 현실을 알아보세요.
            </p>
          </div>
        </section>

        {/* Research Citation */}
        <section className="px-6 md:px-12 lg:px-20 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-secondary/50 rounded-xl p-6 border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    한국해양과학기술원(KIOST) 공동연구 · Marine Pollution Bulletin 2025년 2월호 게재
                  </p>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    2003-2023년 20년간 국내 연안 데이터를 분석한 결과, 해양동물 <strong className="text-foreground">77종에서 428건</strong>의
                    해양쓰레기 얽힘 피해가 확인되었습니다. 피해 깊은 종의 <strong className="text-foreground">13%(10종-44건)</strong>는
                    IUCN 적색목록 멸종위기종이었으며, 피해 건수는 <strong className="text-foreground">매년 증가</strong>하는 추세입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story 1 - Seal: 이미지 좌 / 텍스트 우 */}
        <section className="px-6 md:px-12 lg:px-20 py-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted-foreground mb-8">이야기 1</p>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* 이미지 */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src="/image13.png"
                  alt="해양 쓰레기에 얽힌 물개"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 텍스트 */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  <span className="text-xs text-muted-foreground">물개 - Seal</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  해양 쓰레기에 얽혀 죽는
                  <br />
                  <span className="text-primary">물개 이야기</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  버려진 어망은 바닷속을 수백 년간 떠돌며 &apos;유령 어업&apos;을 계속합니다.
                  먹이를 쫓던 물개는 폐어망에 몸이 얽히고, 성장할수록 그물이 살을 파고들어 극심한 고통을 겪습니다.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  KIOST 연구에 따르면 해양 포유류는 수중 먹이 활동 중 폐어망에 얽히는 경우가 가장 많으며,
                  스스로 빠져나오는 것이 사실상 불가능합니다. 서서히 질식하거나 굶주림으로 생을 마감하게 됩니다.
                </p>
                <blockquote className="pl-4 border-l-2 border-primary italic text-muted-foreground text-sm">
                  &quot;버려진 그물에 몸이 묶여 죽는 해양동물들. 인간의 욕심에 의한 해양 생물들의 피해는 끝이 없다.&quot; — KIOST 연구진
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  연간 약 64만 톤의 폐어망이 바다에 버려지며, 분해되기까지 최대 600년이 걸립니다.
                  구조대원이 발견하지 못하면 감염·기아·익사로 생을 마감하게 됩니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    해양 포유동물 연간 피해 약 10만 마리
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    폐어망 분해까지 최대 600년
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story 2 - Turtle: 텍스트 좌 / 이미지 우 */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted-foreground mb-8">이야기 2</p>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* 텍스트 */}
              <div className="space-y-6 order-2 md:order-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  <span className="text-xs text-muted-foreground">바다거북 - Sea Turtle</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  바다에서 고통받을 수 밖에 없는
                  <br />
                  <span className="text-primary">바다거북 이야기</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  바다거북은 해파리를 주식으로 삼습니다. 바다에 떠다니는 비닐봉지는 해파리와 구별하기 어렵고,
                  거북은 모르는 채 플라스틱을 삼킵니다.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  KIOST 연구에서 수중 먹이 활동을 하는 바다거북은 폐어구 얽힘 피해가 특히 심각했습니다.
                  특히 푸른바다거북은 IUCN 적색목록 멸종위기종으로, 국내 연안에서 지속적인 피해가 확인됩니다.
                </p>
                <blockquote className="pl-4 border-l-2 border-primary italic text-muted-foreground text-sm">
                  &quot;조사한 바다거북의 52%에서 플라스틱이 검출되었습니다. 단 한 조각의 플라스틱도 치명적일 수 있습니다.&quot;
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  삼킨 플라스틱은 장을 막고 포만감을 줘 영양 결핍으로 이어집니다.
                  폐어망에 얽히면 숨을 쉬기 위해 수면으로 오르지 못해 익사하기도 합니다.
                  전 세계 7종의 바다거북 모두가 멸종위기로 분류되어 있습니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    거북 52%에서 플라스틱 검출
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    7종 모두 멸종위기 등재
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    IUCN 적색목록
                  </span>
                </div>
              </div>

              {/* 이미지 */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden order-1 md:order-2">
                <Image
                  src="/image12.png"
                  alt="그물에 얽힌 바다거북"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted-foreground mb-2">KIOST 20년 연구</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              2003-2023 국내 연안 <span className="text-primary">해양쓰레기 피해 현황</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              <div className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  <AnimatedCounter end={77} suffix="종" />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">피해 확인<br />해양동물 종수</p>
              </div>
              <div className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  <AnimatedCounter end={428} suffix="건" />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">20년간 확인된<br />얽힘 피해 사례</p>
              </div>
              <div className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  <AnimatedCounter end={13} suffix="%" />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">피해 종 중<br />IUCN 멸종위기종</p>
              </div>
              <div className="bg-background rounded-2xl p-6 text-center shadow-sm border border-border">
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  <span className="text-3xl">↑</span>증가
                </p>
                <p className="mt-2 text-sm text-muted-foreground">피해 건수<br />매년 증가세</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background rounded-xl border border-border">
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">연구 배경:</strong> KIOST의 동아시아바다공동체 오션 공동연구팀이 전국 야생동물구조치료센터, 언론 보도, 시민 기록,
                스쿠버다이버 직접 관찰 자료를 종합 분석했습니다. 바닷새는 낚싯줄 비율에, 바다거북·돌고래 등 수중 먹이활동 종은 폐어구 얽힘의 피해가 컸습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-6 md:px-12 lg:px-20 py-16 bg-foreground text-background">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-background/60 mb-2">20년의 기록</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              국내 연안 해양쓰레기 피해 <span className="text-primary">연대기</span>
            </h2>

            <div className="mt-12 space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-primary font-bold text-lg">2003</span>
                </div>
                <div>
                  <h3 className="font-semibold text-background">20년 추적 관찰 시작</h3>
                  <p className="mt-2 text-background/70 text-sm leading-relaxed">
                    국내 연안 야생동물구조치료센터를 중심으로 해양쓰레기 얽힘 피해 사례 수집이 시작됩니다.
                    낚싯줄에 얽힌 괭이갈매기 등 바닷새 사례가 초기 기록의 대부분을 차지했습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-primary font-bold text-lg">2010년대</span>
                </div>
                <div>
                  <h3 className="font-semibold text-background">바다거북·돌고래 피해 급증</h3>
                  <p className="mt-2 text-background/70 text-sm leading-relaxed">
                    수중 먹이활동을 하는 바다거북과 돌고래에서 폐어구 얽힘 피해 사례가 크게 늘었습니다.
                    푸른바다거북이 IUCN 멸종위기종의 피해가 두드러지기 시작했습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-primary font-bold text-lg">2021</span>
                </div>
                <div>
                  <h3 className="font-semibold text-background">KIOST·오션 공동연구 착수</h3>
                  <p className="mt-2 text-background/70 text-sm leading-relaxed">
                    3년에 걸쳐 전국 야생동물구조치료센터 데이터와 시민 기록, 스쿠버다이버 현장 관찰 자료를 종합하는
                    대규모 연구가 시작됐습니다.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24">
                  <span className="text-primary font-bold text-lg">2025</span>
                </div>
                <div>
                  <h3 className="font-semibold text-background">국제 학술지 게재 — 심각성 경고</h3>
                  <p className="mt-2 text-background/70 text-sm leading-relaxed">
                    77종 428건의 피해가 확인되었으며, 매년 증가 추세임이 입증됐습니다.
                    Marine Pollution Bulletin 게재를 통해 국제 사회에 해양쓰레기 문제의 심각성이 알려졌습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}