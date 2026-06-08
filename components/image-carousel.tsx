"use client"

export function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden py-8">
      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {/* First set of images */}
        <div className="flex gap-4 shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%207-BSganwFEmXtRIthgn7TWHs3PQggB1u.png"
            alt="아름다운 해양 생태계 - 산호초와 열대어"
            className="h-48 md:h-64 w-auto object-cover rounded-2xl"
          />
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-4 shrink-0 ml-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%207-BSganwFEmXtRIthgn7TWHs3PQggB1u.png"
            alt="아름다운 해양 생태계 - 산호초와 열대어"
            className="h-48 md:h-64 w-auto object-cover rounded-2xl"
          />
        </div>
        {/* Third duplicate for longer screens */}
        <div className="flex gap-4 shrink-0 ml-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%207-BSganwFEmXtRIthgn7TWHs3PQggB1u.png"
            alt="아름다운 해양 생태계 - 산호초와 열대어"
            className="h-48 md:h-64 w-auto object-cover rounded-2xl"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
