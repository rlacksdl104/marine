"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingBag, Recycle, Megaphone, Heart, Umbrella } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const actions = [
  {
    number: 1,
    title: "플라스틱 사용 줄이기",
    description: "일회용 플라스틱 대신 텀블러, 에코백, 다회용 용기를 사용하세요. 작은 습관 변화가 바다로 유입되는 플라스틱을 크게 줄입니다.",
    tag: "일상 실천",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
  {
    number: 2,
    title: "해변 청소 활동 참여",
    description: "지역 해변 정화 봉사활동에 참여해보세요. 주말 2시간으로 수백 개의 쓰레기를 제거할 수 있습니다.",
    tag: "봉사 활동",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
  {
    number: 3,
    title: "올바른 분리수거",
    description: "올바른 분리수거는 쓰레기가 하수구와 강을 통해 바다로 흘러 들어가는 것을 막는 가장 기본적인 실천입니다.",
    tag: "생활 습관",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
  {
    number: 4,
    title: "지속 가능한 수산물 선택",
    description: "과도한 어획을 줄이기 위해 MSC 인증 수산물이나 양식 수산물을 선택하면 해양 생태계 보전에 직접 기여할 수 있습니다.",
    tag: "소비 선택",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
  {
    number: 5,
    title: "SNS로 인식 확산",
    description: "해양 생태계의 현실을 주변에 알리세요. 한 명이 열 명에게, 열 명이 백 명에게 — 인식의 변화가 정책을 바꿉니다.",
    tag: "사회 참여",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
  {
    number: 6,
    title: "환경 단체 후원 & 서명",
    description: "해양 보전 단체를 후원하거나 관련 청원에 서명하면 더 큰 규모의 변화를 이끌어 낼 수 있습니다.",
    tag: "단체 행동",
    tagColor: "bg-[oklch(0.55_0.15_200)]"
  },
]

const steps = [
  {
    icon: ShoppingBag,
    title: "장보기 전",
    description: "장바구니와 에코백을 챙겨 비닐봉지 사용을 줄여요.",
    color: "text-amber-500"
  },
  {
    icon: Recycle,
    title: "쓰레기 분리",
    description: "플라스틱, 유리, 종이를 올바르게 분리해 바다 유입을 막아요.",
    color: "text-emerald-500"
  },
  {
    icon: Megaphone,
    title: "주변에 알리기",
    description: "이 페이지를 친구와 가족에게 공유해 함께 실천해요.",
    color: "text-rose-500"
  },
  {
    icon: Heart,
    title: "함께 행동",
    description: "지역 환경 모임이나 해변 청소 행사에 참여해 변화를 만들어요.",
    color: "text-amber-400"
  },
]

function ActionCard({ action, index }: { action: typeof actions[0], index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[oklch(0.55_0.15_200)] text-white flex items-center justify-center font-bold text-sm">
          {action.number}
        </span>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-2">{action.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {action.description}
          </p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${action.tagColor}`}>
            {action.tag}
          </span>
        </div>
      </div>
    </div>
  )
}

function StepCard({ step, index }: { step: typeof steps[0], index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const Icon = step.icon

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-xl p-6 text-center border border-gray-100 transition-all duration-500 hover:shadow-lg ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className={`w-12 h-12 mx-auto mb-4 ${step.color}`}>
        <Icon className="w-full h-full" />
      </div>
      <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
    </div>
  )
}

export default function EffortsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-[oklch(0.95_0.03_180)] to-[oklch(0.98_0.01_180)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            해양 생태계를 보전하기 위해
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[oklch(0.55_0.15_200)] mb-6">
            왜 노력해야 할까요?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            해양 생태계는 우리 모두의 삶입니다. 다양한 해양 생물을 보전하고, 폐어망을 줄이고, 수백만 명의 사람들에게 식량 안보를 제공하는 바다를 지키는 일 — 지금 당장 시작할 수 있어요.
          </p>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-16 bg-gradient-to-b from-[oklch(0.98_0.01_180)] to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 bg-[oklch(0.9_0.05_180)] text-[oklch(0.45_0.12_200)] rounded-full text-sm font-medium mb-4">
            실천 방법
          </span>
          <h3 className="text-2xl font-bold text-foreground mb-8">
            누구나 할 수 있는 해양 보전 노력
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {actions.map((action, index) => (
              <ActionCard key={action.number} action={action} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[oklch(0.96_0.02_180)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-[oklch(0.95_0.05_180)] rounded-full flex items-center justify-center">
                <Umbrella className="w-10 h-10 text-[oklch(0.55_0.15_200)]" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground mb-1">
                페이지를 방문하여,
              </h4>
              <h4 className="text-xl font-bold text-[oklch(0.55_0.15_200)] mb-3">
                할 수 있는 노력을 찾아 실천해보세요!
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                작은 실천 하나가 수천 마리의 생명을 살릴 수 있습니다. 오늘부터 텀블러 하나, 에코백 하나로 시작해보세요. 우리의 바다는 우리의 손에 달려 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-16 bg-[oklch(0.97_0.02_90)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            오늘부터 <span className="text-[oklch(0.55_0.15_200)]">4단계</span>로 시작하기
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {steps.map((step, index) => (
              <StepCard key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
