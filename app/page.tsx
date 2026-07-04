"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import HolidayHours from "@/components/holiday-hours"
import Story from "@/components/story"
import MenuPreview from "@/components/menu-preview"
import BookingCTA from "@/components/booking-cta"
import SocialFeed from "@/components/social-feed"
import Footer from "@/components/footer"
import MemberBadge from "@/components/member-badge"
import MiniGame from "@/components/mini-game"
import { useAuth } from "@/hooks/use-auth"
import { Sparkles, ArrowRight } from "lucide-react"
import { useState } from "react"
import SignupModal from "@/components/signup-modal"

export default function Home() {
  const { user } = useAuth()
  const [showSignup, setShowSignup] = useState(false)

  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />

      <div className="bg-black py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Nomi Kundeklub</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Bliv en del af vores fællesskab og få adgang til eksklusive fordele,
              optjen point og følg din rejse som Grill Master.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {user ? (
              <MemberBadge user={user} />
            ) : (
              <div className="bg-gradient-to-br from-[#A91D3A]/20 to-black border border-[#A91D3A]/50 rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-[#A91D3A] rounded-full flex items-center justify-center shadow-lg shadow-[#A91D3A]/50">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Tilmeld dig i dag</h3>
                  <p className="text-white/60 text-sm">
                    Opret en profil på få sekunder og få dit eget digitale medlemskort.
                  </p>
                </div>
                <button
                  onClick={() => setShowSignup(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-[#A91D3A] hover:bg-[#8B1730] text-white rounded-lg font-bold transition-all group"
                >
                  Opret profil
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#A91D3A] to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black border border-white/10 rounded-2xl p-1 overflow-hidden">
                  <MiniGame />
                </div>
              </div>
              <div className="text-center md:text-left px-4">
                <h4 className="text-white font-bold mb-1">Nomi Grill Master</h4>
                <p className="text-white/40 text-xs">Spil og vis dine grill-evner (kun desktop)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HolidayHours />
      <Story />
      <MenuPreview />
      <BookingCTA />
      <SocialFeed />
      <Footer />

      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </main>
  )
}
