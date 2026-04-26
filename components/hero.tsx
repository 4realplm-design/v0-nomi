"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative w-full h-screen pt-20 overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-40 flex items-center justify-center">
          <iframe
            src="https://www.youtube.com/embed/5ScIcY8VfZA?autoplay=1&mute=1&controls=0&loop=1&playlist=5ScIcY8VfZA&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&playsinline=1"
            allow="autoplay; encrypted-media"
            className="pointer-events-none"
            style={{
              border: "none",
              width: "100vw",
              height: "177.78vw", // 16:9 aspect ratio (100vw * 16/9)
              minHeight: "100vh",
              minWidth: "56.25vh", // 9:16 aspect ratio (100vh * 9/16)
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-black via-black to-transparent z-5" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-20">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src="/images/nyt-20projekt-20-2816-29.png"
              alt="Nomi Logo"
              className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-2xl animate-scale-in"
            />
          </div>

          <p className="text-xl sm:text-2xl text-white/80 text-balance max-w-3xl mx-auto leading-relaxed">
            {"En kulinarisk oplevelse venter"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 mx-auto max-w-fit">
            <Link
              href="/booking"
              className="px-10 py-4 bg-[#A91D3A] hover:bg-[#8B1730] text-white text-lg rounded-lg font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#A91D3A]/50 hover:scale-105 w-full sm:w-auto"
            >
              Reserver Bord Nu
            </Link>
            <Link
              href="https://takeaway.any2order.com/b/takeaway/NomiB.B.Q&Sushi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-black/50 border-2 border-white/50 hover:border-[#A91D3A] text-white text-lg rounded-lg font-semibold transition-all duration-300 hover:bg-[#A91D3A]/20 hover:scale-105 w-full sm:w-auto"
            >
              Takeaway
            </Link>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href="/menu"
              className="px-10 py-4 border-2 border-[#A91D3A] text-white text-lg rounded-lg font-semibold hover:bg-[#A91D3A]/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Se Vores Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
