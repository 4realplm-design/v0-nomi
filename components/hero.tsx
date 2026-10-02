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

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-px">
        <div className="space-y-8">
          <div className="flex justify-center mb-0">
            <img
              src="/images/nyt-20projekt-20-2816-29.png"
              alt="Nomi Logo"
              className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-2xl animate-scale-in"
            />
          </div>

          <p className="text-xl sm:text-2xl text-white/80 text-balance max-w-3xl mx-auto leading-relaxed">
            Koreansk BBQ &amp; Japansk Sushi &mdash; All You Can Eat
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
            <Link
              href="/menu"
              className="relative z-30 inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-[15px] border-2 border-[#d8a65b] bg-[#16090d] px-6 py-[13px] text-lg font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.65)] transition-all duration-300 hover:scale-105 hover:border-[#A91D3A] hover:bg-[#A91D3A] sm:w-auto sm:px-10"
            >
              Se Vores Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
