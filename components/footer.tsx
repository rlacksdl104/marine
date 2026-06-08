import { Fish, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[oklch(0.2_0.05_230)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Fish className="w-8 h-8 text-[oklch(0.75_0.1_220)]" />
              <span className="font-bold text-xl">해양 생태계 보전</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              우리의 바다를 지키기 위한 작은 실천이 큰 변화를 만듭니다. 함께 해양 생태계를
              보전해요.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/intro" className="hover:text-white transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-white transition-colors">
                  해양 생태계
                </Link>
              </li>
              <li>
                <Link href="/efforts" className="hover:text-white transition-colors">
                  할 수 있는 노력
                </Link>
              </li>
              <li>
                <Link href="/mini-game" className="hover:text-white transition-colors">
                  미니 게임
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">함께해요</h4>
            <p className="text-gray-400 text-sm mb-4">
              해양 보전 활동에 관심이 있으시다면 연락주세요.
            </p>
            <div className="flex items-center gap-2 text-sm text-[oklch(0.75_0.1_220)]">
              <Heart className="w-4 h-4" />
              <span>바다를 사랑하는 마음으로</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 해양 생태계 보전. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  )
}
