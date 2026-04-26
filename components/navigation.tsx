"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { ChevronDown } from "lucide-react"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedTakeaway, setExpandedTakeaway] = useState(false)
  const [expandedTakeawayMobile, setExpandedTakeawayMobile] = useState(false)
  const [showDesktopMenu, setShowDesktopMenu] = useState(false)
  const [showKundeklubMenu, setShowKundeklubMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuSection = {
    title: "Menu",
    items: [
      { label: "All You Can Eat Menu", href: "/menu" },
      {
        label: "Takeaway",
        href: "/takeaway",
        nested: [
          { label: "Takeaway Menu", href: "/takeaway", badge: "Kommer Snart" },
          { label: "Online Bestilling", href: "/bestil-mad", badge: "Kommer Snart" },
        ],
      },
    ],
  }

  const navItems = [
    { label: "Hjem", href: "/" },
    { label: "Om Os", href: "/about" },
    { label: "Jobs", href: "/karriere" },
    { label: "Kontakt", href: "/contact" },
    { label: "Book Bord", href: "/booking" },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      setShowKundeklubMenu(false)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group relative">
              <div
                className="relative h-16 w-20 transition-all duration-700 ease-out"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`absolute inset-0 flex items-center transition-all duration-700 ${
                    isScrolled ? "opacity-0 rotate-y-180 pointer-events-none" : "opacity-100 rotate-y-0"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/images/nomi.png"
                    alt="Nomi"
                    width={280}
                    height={70}
                    className="h-16 w-auto object-contain"
                  />
                </div>

                <div
                  className={`absolute left-0 top-0 flex items-center transition-all duration-700 ${
                    isScrolled ? "opacity-100 rotate-y-0 logo-shine" : "opacity-0 -rotate-y-180 pointer-events-none"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/images/nyt-20projekt-20-2816-29.png"
                    alt="Nomi Logo"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-contain"
                  />
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowDesktopMenu(!showDesktopMenu)}
                  className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all duration-300 border border-white/10 hover:border-[#A91D3A] flex items-center justify-center"
                  aria-label="Menu"
                >
                  <div className="flex flex-col items-center justify-center w-6 h-6 gap-1.5">
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                    <span className="w-6 h-0.5 bg-white" />
                  </div>
                </button>

                {showDesktopMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down z-50">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <h3 className="text-base font-bold text-white mb-2 tracking-wide">{menuSection.title}</h3>
                        <div className="space-y-1">
                          {menuSection.items.map((item) => (
                            <div key={item.href}>
                              {item.nested ? (
                                <div>
                                  <button
                                    onClick={() => setExpandedTakeaway(!expandedTakeaway)}
                                    className="w-full flex items-center justify-between pl-2 pr-2 py-2.5 text-sm font-bold text-white/95 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg transition-all duration-200"
                                  >
                                    <span>{item.label}</span>
                                    <ChevronDown
                                      className={`w-4 h-4 transition-transform duration-200 ${
                                        expandedTakeaway ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>
                                  {expandedTakeaway && (
                                    <div className="space-y-1 mt-1">
                                      {item.nested.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.href}
                                          href={nestedItem.href}
                                          className="flex items-center justify-between pl-6 pr-2 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg transition-all duration-200"
                                          onClick={() => setShowDesktopMenu(false)}
                                        >
                                          <span className="leading-tight">{nestedItem.label}</span>
                                          {nestedItem.badge && (
                                            <span className="text-xs px-2 py-0.5 bg-[#A91D3A] text-white rounded-full font-semibold">
                                              {nestedItem.badge}
                                            </span>
                                          )}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  href={item.href}
                                  className="flex items-center justify-between pl-2 pr-2 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg transition-all duration-200"
                                  onClick={() => setShowDesktopMenu(false)}
                                >
                                  <span className="leading-tight">{item.label}</span>
                                  {item.badge && (
                                    <span className="text-xs px-2 py-0.5 bg-[#A91D3A] text-white rounded-full font-semibold">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="px-2 py-2">
                        {navItems.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg hover:bg-[#A91D3A]/10 transition-all duration-200"
                            onClick={() => setShowDesktopMenu(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowKundeklubMenu(!showKundeklubMenu)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300 border border-white/10 hover:border-[#A91D3A]"
                  >
                    Velkommen tilbage
                  </button>

                  {showKundeklubMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
                      <div className="py-2">
                        <div className="px-6 py-3 border-b border-white/10">
                          <p className="text-xs text-white/60">Logget ind som</p>
                          <p className="text-sm text-white font-medium truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="block px-6 py-3 text-sm font-medium text-white/80 hover:text-[#A91D3A] hover:bg-[#A91D3A]/20 transition-colors"
                          onClick={() => setShowKundeklubMenu(false)}
                        >
                          Min Kundeklub
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-6 py-3 text-sm font-medium text-white/80 hover:text-[#A91D3A] hover:bg-[#A91D3A]/20 transition-colors"
                        >
                          Log Ud
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowKundeklubMenu(!showKundeklubMenu)}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-all duration-300 border border-white/10 hover:border-[#A91D3A]"
                  >
                    Kundeklub
                  </button>

                  {showKundeklubMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-down">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowLoginModal(true)
                            setShowKundeklubMenu(false)
                          }}
                          className="block w-full text-left px-6 py-3 text-sm font-medium text-white/80 hover:text-[#A91D3A] hover:bg-[#A91D3A]/20 transition-colors"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            setShowSignupModal(true)
                            setShowKundeklubMenu(false)
                          }}
                          className="block w-full text-left px-6 py-3 text-sm font-medium text-white/80 hover:text-[#A91D3A] hover:bg-[#A91D3A]/20 transition-colors"
                        >
                          Tilmeld
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#A91D3A]/20 transition-colors relative w-10 h-10 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
                <span
                  className={`h-0.5 w-full rounded-full transition-all duration-300 origin-left ${
                    isOpen ? "rotate-45 bg-[#A91D3A]" : "rotate-0 bg-white"
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                    isOpen ? "opacity-0 bg-[#A91D3A]" : "opacity-100 bg-white"
                  }`}
                />
                <span
                  className={`h-0.5 w-full rounded-full transition-all duration-300 origin-left ${
                    isOpen ? "-rotate-45 bg-[#A91D3A]" : "rotate-0 bg-white"
                  }`}
                />
              </div>
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4 space-y-3 animate-fade-in-down">
              <div className="border-b border-white/10 pb-3 mb-3 bg-white/5 rounded-lg">
                <h3 className="px-4 py-3 text-base font-bold text-white tracking-wide">{menuSection.title}</h3>
                <div className="space-y-1 px-2">
                  {menuSection.items.map((item) => (
                    <div key={item.href}>
                      {item.nested ? (
                        <div>
                          <button
                            onClick={() => setExpandedTakeawayMobile(!expandedTakeawayMobile)}
                            className="w-full flex items-center justify-between pl-4 pr-4 py-2.5 text-sm font-bold text-white/95 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg transition-all duration-200"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                expandedTakeawayMobile ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {expandedTakeawayMobile && (
                            <div className="space-y-1 mt-1">
                              {item.nested.map((nestedItem) => (
                                <Link
                                  key={nestedItem.href}
                                  href={nestedItem.href}
                                  className="flex items-center justify-between pl-8 pr-4 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] rounded-lg hover:bg-[#A91D3A]/10 transition-all duration-200"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="leading-tight">{nestedItem.label}</span>
                                  {nestedItem.badge && (
                                    <span className="text-xs px-2 py-0.5 bg-[#A91D3A] text-white rounded-full font-semibold">
                                      {nestedItem.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between pl-4 pr-4 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] rounded-lg transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="leading-tight">{item.label}</span>
                          {item.badge && (
                            <span className="text-xs px-2 py-0.5 bg-[#A91D3A] text-white rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1 px-2">
                {navItems.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-[#A91D3A] hover:bg-[#A91D3A]/10 rounded-lg hover:bg-[#A91D3A]/10 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/10 pt-3 mt-3">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-white hover:text-[#A91D3A] rounded-lg hover:bg-[#A91D3A]/20 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Min Kundeklub
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-white hover:text-[#A91D3A] rounded-lg hover:bg-[#A91D3A]/20 transition-colors"
                    >
                      Log Ud
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowLoginModal(true)
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-white hover:text-[#A91D3A] rounded-lg hover:bg-[#A91D3A]/20 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowSignupModal(true)
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-white hover:text-[#A91D3A] rounded-lg hover:bg-[#A91D3A]/20 transition-colors"
                    >
                      Tilmeld
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {showSignupModal && <SignupModal onClose={() => setShowSignupModal(false)} />}
    </>
  )
}
