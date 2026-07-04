"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import MemberBadge from "@/components/member-badge"
import MiniGame from "@/components/mini-game"
import { Sparkles, Calendar, Copy, Check, Ticket, Gift, Star } from "lucide-react"

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [memberData, setMemberData] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return

      try {
        const memberRef = ref(db, `members/${user.uid}`)
        const memberSnapshot = await get(memberRef)

        if (memberSnapshot.exists()) {
          setMemberData(memberSnapshot.val())
        }

        const bookingsRef = ref(db, "bookings")
        const bookingsSnapshot = await get(bookingsRef)

        if (bookingsSnapshot.exists()) {
          const bookingsData = bookingsSnapshot.val()
          const bookingsArray = Object.entries(bookingsData)
            .map(([id, data]: any) => ({
              id,
              ...data,
            }))
            .filter((booking: any) => booking.userId === user.uid)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

          setBookings(bookingsArray)
        }
      } catch (error) {
        console.error("[v0] Error fetching user data:", error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user])

  const copyToClipboard = () => {
    if (user) {
      navigator.clipboard.writeText(user.uid)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading || dataLoading) {
    return (
      <main className="bg-black min-h-screen">
        <Navigation />
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A91D3A]" />
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="bg-black min-h-screen text-white">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A91D3A]/10 border border-[#A91D3A]/30 rounded-full">
              <Sparkles className="w-4 h-4 text-[#A91D3A]" />
              <span className="text-sm font-medium text-[#A91D3A]">Nomi Kundeklub</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              {memberData?.bookingsCount > 0 ? "Velkommen Tilbage" : "Velkommen"}
            </h1>
            <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto">
              {memberData?.bookingsCount > 0
                ? `Dejligt at se dig igen, ${memberData?.name || user.email?.split("@")[0]}!`
                : `Hej ${memberData?.name || user.email?.split("@")[0]}, velkommen til kundeklubben!`}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Member Card */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-[#A91D3A]" />
                <h2 className="text-2xl font-bold">Dit Digitale Medlemskort</h2>
              </div>
              <MemberBadge user={user} memberData={memberData} />
            </div>

            {/* Stats and Game */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="bg-gradient-to-br from-[#A91D3A]/20 to-[#8B1730]/20 border border-[#A91D3A]/30 rounded-xl p-8 space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-[#A91D3A]" />
                  <h2 className="text-2xl font-bold">Medlems Info</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10">
                    <div>
                      <p className="text-sm text-white/60 mb-1">Unikt Kunde-ID</p>
                      <p className="text-lg font-mono font-semibold text-[#A91D3A]">{user.uid.substring(0, 16)}...</p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="p-3 hover:bg-white/10 rounded-lg transition-colors"
                      title="Kopiér ID"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-white/60" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                      <p className="text-sm text-white/60 mb-1">Total Bookinger</p>
                      <p className="text-3xl font-bold text-[#A91D3A]">{memberData?.bookingsCount || 0}</p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-lg border border-white/10">
                      <p className="text-sm text-white/60 mb-1">Medlem Siden</p>
                      <p className="text-lg font-semibold truncate">
                        {memberData?.createdAt ? new Date(memberData.createdAt).toLocaleDateString("da-DK") : "I dag"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <MiniGame />
            </div>
          </div>

          {/* Offers Section */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 animate-fade-in-up overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Gift className="w-32 h-32 text-white" />
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Ticket className="w-6 h-6 text-[#A91D3A]" />
              <h2 className="text-2xl font-bold">Eksklusive Medlemstilbud</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="group relative aspect-[4/3] rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center hover:border-[#A91D3A]/30 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Gift className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-white/40 font-bold uppercase tracking-widest text-sm">Kommer Snart</h3>
                  <p className="text-xs text-white/20 mt-2">Hold øje med nye tilbud direkte i din kundeklub</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#A91D3A]" />
              <h2 className="text-2xl font-bold">Mine Bookinger</h2>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Du har ingen bookinger endnu</p>
                <a
                  href="/booking"
                  className="inline-block px-6 py-3 bg-[#A91D3A] hover:bg-[#8B1730] text-white rounded-lg font-semibold transition-all duration-300"
                >
                  Book Et Bord Nu
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-6 bg-black/40 border border-white/10 rounded-lg hover:border-[#A91D3A]/50 transition-all duration-300"
                  >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Dato</p>
                        <p className="font-semibold">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Tid</p>
                        <p className="font-semibold">{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Bord</p>
                        <p className="font-semibold text-[#A91D3A]">#{booking.tableId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Gæster</p>
                        <p className="font-semibold">{booking.guests} personer</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-white/60">
                        Booket:{" "}
                        {new Date(booking.createdAt).toLocaleDateString("da-DK", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
