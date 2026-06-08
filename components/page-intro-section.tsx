"use client"

import { useEffect, useState, useRef } from "react"

const tabs = [
  {
    id: "ecosystem",
    title: "해양 생태계",
    description: "해양 생태계에 사는 동물들의 아픈 이야기를 들어보세요.",
  },
  {
    id: "action",
    title: "할 수 있는 노력",
    description: "해양 생태계를 보전하기 위해 할 수 있는 노력을 찾아보아요!",
  },

]

function EcosystemContent() {
  return (
    <div className="relative h-full min-h-[400px]">
      {/* Main image - Seal */}
      <div className="absolute top-0 left-0 w-[280px] md:w-[320px]">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%209-QBiizfYyldfIyWsn1QKT7fEROwqgf8.png"
            alt="해양 쓰레기에 얽힌 물개"
            className="w-full h-48 md:h-56 object-cover"
          />
        </div>
      </div>

      {/* Secondary image - Turtle */}
      <div className="absolute bottom-0 right-0 w-[280px] md:w-[340px]">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2010-wYfzNoxuFAtoKC3JRUtLnR0Od56WgR.png"
            alt="그물에 걸린 바다거북"
            className="w-full h-48 md:h-56 object-cover"
          />
        </div>
      </div>
    </div>
  )
}

function ActionContent() {
  return (
    <div className="flex flex-col justify-center h-full min-h-[400px] py-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground leading-tight">
        해양 생태계를 보전하기 위해서
        <br />
        <span className="text-[oklch(0.55_0.15_200)]">왜 노력해야 할까요?</span>
      </h3>
      <div className="space-y-4 text-gray-700">
        <p>해양 생태계는 우리 바다의 심장입니다.</p>
        <p>
          다양한 해양 생물을 지원하고, 해안선을 침식으로부터 보호하며,
          <br className="hidden md:block" />
          이산화탄소를 흡수하여 기후를 조절하고, 수백만 명의 사람들에
          <br className="hidden md:block" />
          게 식량과 생계를 제공합니다.
        </p>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-xl md:text-2xl font-bold text-foreground">
          페이지에 방문하여,
          <br />
          <span className="text-[oklch(0.55_0.15_200)]">할 수 있는 노력을 찾아 실천해보세요!</span>
        </p>
      </div>
    </div>
  )
}

export function PageIntroSection() {
  const [activeTab, setActiveTab] = useState("ecosystem")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "ecosystem":
        return <EcosystemContent />
      case "action":
        return <ActionContent />
      default:
        return <EcosystemContent />
    }
  }

  return (
    <section ref={sectionRef} id="intro" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className={`text-2xl md:text-3xl font-bold mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          페이지 소개
        </h2>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
          {/* Left side - Tab Navigation */}
          <div className="space-y-4">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group w-full flex items-start gap-4 text-left cursor-pointer transition-all duration-500 ${
                  isVisible 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
              >
                <div 
                  className={`w-1 h-16 rounded-full transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-[oklch(0.55_0.15_200)]" 
                      : "bg-gray-300 group-hover:bg-[oklch(0.65_0.1_200)]"
                  }`} 
                />
                <div className={`transition-transform duration-300 ease-out origin-left ${
                  activeTab === tab.id ? "scale-105" : "group-hover:scale-105"
                }`}>
                  <h3 className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                    activeTab === tab.id ? "text-[oklch(0.55_0.15_200)]" : "text-foreground"
                  }`}>
                    {tab.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tab.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right side - Tab Content */}
          <div 
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div 
              key={activeTab}
              className="animate-in fade-in slide-in-from-right-4 duration-500"
            >
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
