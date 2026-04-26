"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Phone, Clock } from "lucide-react"

export default function TakeawayPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Takeaway Menu</h1>
            <div className="inline-block px-8 py-4 bg-[#A91D3A]/10 border-2 border-[#A91D3A] rounded-lg mb-8">
              <p className="text-3xl md:text-4xl font-bold text-[#A91D3A]">Kommer Snart</p>
            </div>

            {/* Contact Information */}
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-[#A91D3A]" />
                  <h3 className="text-xl font-bold text-white">Ring og Bestil</h3>
                </div>
                <a
                  href="tel:+4531175815"
                  className="text-2xl font-bold text-[#A91D3A] hover:text-[#8B1730] transition-colors"
                >
                  +45 31 17 58 15
                </a>
              </div>

              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#A91D3A]" />
                  <h3 className="text-xl font-bold text-white">Åbningstider - Takeaway</h3>
                </div>
                <p className="text-white/80 text-lg mb-2">Mandag - Søndag</p>
                <p className="text-[#A91D3A] text-xl font-bold">12:00 - 21:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
