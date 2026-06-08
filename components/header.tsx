"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Fish } from "lucide-react"
import Image from "next/image"

const navItems = [
  { href: "/", label: "홈" },
  { href: "/intro", label: "소개" },
  { href: "/ecosystem", label: "해양 생태계" },
  { href: "/efforts", label: "할 수 있는 노력" },
  { href: "/mini-game", label: "미니 게임" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
 <Link href="/" className="flex items-center gap-2">
  <Image
    src="/fxemoji_blowfish.svg"
    alt="해양 생태계 보전"
    width={32}
    height={32}
  />
  <span className="sr-only">해양 생태계 보전</span>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-[oklch(0.55_0.15_200)]"
                    : "text-gray-700 hover:text-[oklch(0.55_0.15_200)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-[oklch(0.55_0.15_200)]"
                    : "text-gray-700 hover:text-[oklch(0.55_0.15_200)]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
