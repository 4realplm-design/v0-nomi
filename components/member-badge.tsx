"use client"

import { useState, useEffect, useRef } from "react"
import { User, Upload, ShieldCheck, Camera, Sparkles } from "lucide-react"

interface MemberBadgeProps {
  user: {
    uid: string
    email?: string | null
  }
  memberData?: {
    name?: string
    bookingsCount?: number
  }
}

export default function MemberBadge({ user, memberData }: MemberBadgeProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const savedImage = localStorage.getItem(`nomi-member-photo-${user.uid}`)
    if (savedImage) {
      setProfileImage(savedImage)
    }
  }, [user.uid])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Billedet er for stort. Vælg venligst et billede under 2MB.")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setProfileImage(base64String)
        localStorage.setItem(`nomi-member-photo-${user.uid}`, base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  const memberName = memberData?.name || user.email?.split("@")[0] || "Gæst"
  const rank = (memberData?.bookingsCount || 0) >= 5 ? "Elite Grill Master" : (memberData?.bookingsCount || 0) >= 1 ? "Grill Enthusiast" : "New Member"

  return (
    <div className="relative group">
      {/* Badge Container */}
      <div className="w-full max-w-md mx-auto aspect-[1.6/1] bg-gradient-to-br from-[#1a1a1a] to-black border-2 border-[#A91D3A]/50 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#A91D3A]/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#A91D3A]/5 rounded-full blur-2xl -ml-12 -mb-12" />

        <div className="relative h-full flex gap-6">
          {/* Photo Section */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-32 h-32 rounded-xl bg-white/5 border-2 border-dashed border-[#A91D3A]/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#A91D3A] transition-colors relative group/photo"
              onClick={triggerUpload}
            >
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white/20" />
              )}
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div className="px-3 py-1 bg-[#A91D3A]/20 rounded-full border border-[#A91D3A]/30">
              <span className="text-[10px] font-bold text-[#A91D3A] uppercase tracking-tighter">{rank}</span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#A91D3A] font-bold uppercase tracking-widest">Nomi BBQ Member</span>
                <Sparkles className="w-3 h-3 text-[#A91D3A]" />
              </div>
              <h3 className="text-xl font-bold text-white truncate mb-1">{memberName}</h3>
              <div className="space-y-1">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Member ID</p>
                <p className="text-xs font-mono text-white/80">{user.uid.substring(0, 16)}...</p>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Valid Since</p>
                <p className="text-xs text-white/80">2024</p>
              </div>
              <div className="w-12 h-12 bg-[#A91D3A]/10 rounded-lg flex items-center justify-center border border-[#A91D3A]/20">
                 <img src="/images/nomi-logo-circle.png" alt="Logo" className="w-8 h-8 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Holographic effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </div>

      {/* Info Notice */}
      <div className="mt-4 max-w-md mx-auto">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors mx-auto"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>Hvorfor gemmes mit billede kun lokalt?</span>
        </button>

        {showInfo && (
          <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/10 text-[11px] text-white/50 leading-relaxed animate-in fade-in slide-in-from-top-1">
            Vi værdsætter dit privatliv! Dit profilbillede gemmes kun i din egen browsers hukommelse (cache).
            Det betyder, at vi aldrig uploader dit ansigt til vores servere.
            <strong> Bemærk:</strong> Hvis du sletter din browserhistorik eller skifter enhed, skal du uploade billedet igen.
          </div>
        )}
      </div>
    </div>
  )
}
