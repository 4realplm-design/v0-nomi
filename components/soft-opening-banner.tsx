"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

export default function SoftOpeningBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem("soft-opening-dismissed")
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem("soft-opening-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#A91D3A] to-[#8B1530] text-white shadow-lg animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-bold">Soft Åbning – Nomi Koreansk BBQ & Sushi</h3>
            </div>

            <div className="space-y-3 text-sm md:text-base">
              <p className="font-medium">
                Vi glæder os til at invitere jer til soft åbning hos Nomi Koreansk BBQ & Sushi
              </p>

              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="font-bold text-lg">📅 Mandag d. 15/12-2025 kl. 12.00</p>
              </div>

              <p className="text-white/90">
                I soft åbningsperioden tester vi vores koncept, køkken og service, så vi kan sikre den bedste oplevelse
                frem mod den officielle åbning.
              </p>

              <div className="grid md:grid-cols-3 gap-2 my-3">
                <div className="bg-white/10 rounded px-3 py-2 backdrop-blur-sm">
                  <span className="font-semibold">🍖 Koreansk BBQ ved bordet</span>
                </div>
                <div className="bg-white/10 rounded px-3 py-2 backdrop-blur-sm">
                  <span className="font-semibold">🍣 Sushi & varme retter</span>
                </div>
                <div className="bg-white/10 rounded px-3 py-2 backdrop-blur-sm">
                  <span className="font-semibold">🍽️ All You Can Eat-koncept</span>
                </div>
              </div>

              <p className="text-sm text-white/80 italic">
                <strong>Bemærk:</strong> Da dette er en soft åbning, kan der forekomme ventetid og små justeringer. Vi
                takker for jeres forståelse og sætter stor pris på jeres feedback.
              </p>

              <p className="font-semibold text-white">⭐ Bordbestilling anbefales – Book dit bord nu!</p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Luk banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
