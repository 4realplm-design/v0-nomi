"use client"

import Link from "next/link"

export default function SummerCampaign() {
  return (
    <section className="bg-black px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Eyebrow label */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#A91D3A] border border-[#A91D3A]/40 rounded-full px-4 py-1.5">
            Sommerkampagne &mdash; 5. juli &ndash; 9. august
          </span>
        </div>

        {/* Main card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#A91D3A]/30 bg-gradient-to-br from-[#A91D3A]/10 via-black to-black">
          {/* Subtle glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#A91D3A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-10 md:p-14">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance mb-2 leading-tight">
              All You Can Eat Koreansk BBQ &amp; Sticks
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6 mb-8">
              <span className="text-5xl sm:text-6xl font-bold text-[#A91D3A]">239,-</span>
              <span className="text-white/50 text-lg">pr. person</span>
            </div>

            {/* Details */}
            <ul className="space-y-3 mb-10">
              <li className="flex items-start gap-3 text-white/70 text-sm sm:text-base">
                <span className="mt-1 w-1 h-1 rounded-full bg-[#A91D3A] shrink-0 mt-2" />
                <span>
                  Samme pris alle ugens dage &mdash;{" "}
                  <strong className="text-white font-semibold">nyd maden i weekenden helt uden ekstra gebyr</strong>
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm sm:text-base">
                <span className="w-1 h-1 rounded-full bg-[#A91D3A] shrink-0 mt-2" />
                <span>Vi serverer ikke sushi i denne periode</span>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A91D3A] hover:bg-[#8B1730] text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#A91D3A]/30 hover:scale-105 text-sm sm:text-base"
            >
              Book dit bord i dag
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
