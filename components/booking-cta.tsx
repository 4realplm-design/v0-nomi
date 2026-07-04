"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function BookingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("booking-cta")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="booking-cta"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card via-background to-card/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-20 w-96 h-96 bg-accent/5 rounded-xl blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className={`space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{"De hyggligste minder sker rundt om maden"}</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Reserver dit bord i dag 
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/booking"
              className="px-10 py-4 bg-[#A91D3A] hover:bg-[#8B1730] text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#A91D3A]/40 w-full sm:w-auto"
            >
              Reserver Bord Nu
            </Link>
            <Link
              href="#kontakt"
              className="px-10 py-4 border border-[#A91D3A]/30 text-foreground rounded-lg font-semibold hover:bg-[#A91D3A]/5 transition-all duration-300 w-full sm:w-auto"
            >
              Kontakt Os
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
