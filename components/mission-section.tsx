import { ImageCarousel } from "./image-carousel"

export function MissionSection() {
  return (
    <section id="mission" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            저희는
            <br />
            <span className="text-[oklch(0.55_0.15_200)]">해양 생태계 보전</span>을
            <br />
            목표로 합니다
          </h2>
        </div>
      </div>

      {/* Scrolling Image Carousel */}
      <ImageCarousel />
    </section>
  )
}
