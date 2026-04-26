"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function ContactPage() {
  return (
    <main className="bg-black text-white">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Kontakt Os</h1>
            <p className="text-xl md:text-2xl text-white/80">Vi er her for at besvare dine spørgsmål</p>
          </div>

          {/* Contact Information - No cards, just clean layout */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 animate-fade-in-up stagger-1">
            {/* Phone */}
            <div className="text-center md:text-left group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#A91D3A] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Telefon</h3>
              <p className="mb-4 text-white/60 text-lg">Ring os op under åbningstid</p>
              <p className="text-2xl font-semibold text-[#A91D3A]">+45 31 17 58 15</p>
            </div>

            {/* Email */}
            <div className="text-center md:text-left group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#A91D3A] mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Email</h3>
              <p className="mb-4 text-white/60 text-lg">Skriv til os når som helst</p>
              <p className="text-2xl font-semibold text-[#A91D3A]">service@nomirestaurant.dk</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="border-t border-white/10 pt-16 mb-16 animate-fade-in-up stagger-2">
            <h3 className="text-4xl font-bold mb-8 text-center text-white">Åbningstider</h3>
            <div className="text-center space-y-4">
              <div className="inline-block text-left">
                <div className="flex items-center gap-8 text-2xl mb-3">
                  <span className="text-white/80">Mandag - Søndag</span>
                  <span className="font-bold text-white">12:00 - 21:30</span>
                </div>
                <div className="flex items-center gap-8 text-xl">
                  <span className="text-white/70">All you can eat koncept</span>
                  <span className="font-bold text-[#A91D3A]">12:00 - 21:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/booking"
              className="inline-flex items-center px-10 py-5 bg-[#A91D3A] text-white rounded-lg font-bold text-xl hover:bg-[#8B1830] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#A91D3A]/50"
            >
              <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Reserver Dit Bord Nu
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
