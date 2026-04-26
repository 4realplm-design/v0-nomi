"use client"

import { useEffect } from "react"

export default function BestilMadClientPage() {
  useEffect(() => {
    window.location.href = "https://takeaway.any2order.com/booking/NomiB.B.Q&Sushi"
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-16 bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A91D3A] mx-auto"></div>
        <p className="text-foreground">Omdirigerer til bestillingssystem...</p>
      </div>
    </main>
  )
}
