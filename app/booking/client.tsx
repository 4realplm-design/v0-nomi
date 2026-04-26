"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { db } from "@/lib/firebase"
import { ref, get, set } from "firebase/database"

export default function BookingClient() {
  const { user } = useAuth()

  useEffect(() => {
    const trackExternalBooking = async () => {
      if (user) {
        try {
          const memberRef = ref(db, `members/${user.uid}`)
          const memberSnapshot = await get(memberRef)

          if (memberSnapshot.exists()) {
            const currentData = memberSnapshot.val()
            const newBookingsCount = (currentData.bookingsCount || 0) + 1

            await set(memberRef, {
              ...currentData,
              bookingsCount: newBookingsCount,
              lastBookingRedirect: new Date().toISOString(),
            })
          }
        } catch (error) {
          console.error("[v0] Error tracking external booking:", error)
        }
      }
    }

    trackExternalBooking()

    // Redirect to external takeaway booking system
    window.location.href = "https://takeaway.any2order.com/booking/NomiB.B.Q&Sushi"
  }, [user])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-[#A91D3A] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xl">Sender dig videre til vores booking system...</p>
      </div>
    </div>
  )
}
