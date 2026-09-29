"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function MenuPreview() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("menu-section")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="menu-section"
      aria-labelledby="menu-preview-title"
      className={`relative overflow-hidden bg-[#090909] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#A91D3A]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#d8a65b]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d8a65b]">Nomi BBQ &amp; Sushi</p>
            <h2 id="menu-preview-title" className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Noget sødt efter grillen?
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Slut aftenen med vores nye Panna Cotta — silkeblød, frisk og lavet til at dele.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="group relative overflow-hidden rounded-[2rem] border border-[#A91D3A]/50 bg-gradient-to-br from-[#531323] via-[#18090e] to-[#080808] p-7 shadow-2xl shadow-[#A91D3A]/10 sm:p-10">
            <div className="absolute right-8 top-8 rounded-full border border-[#d8a65b]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8a65b]">Nyhed</div>
            <div className="relative flex min-h-[270px] flex-col justify-end">
              <Image
                src="/images/panna-cotta-feature.png"
                alt="Panna Cotta dessert feature"
                width={224}
                height={224}
                className="mb-auto h-28 w-28 rounded-full object-cover shadow-[0_0_60px_rgba(216,166,91,0.12)] transition-transform duration-500 group-hover:scale-105"
              />
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#d8a65b]">Dessert</p>
                <h3 className="text-4xl font-bold text-white sm:text-5xl">Panna Cotta</h3>
                <p className="mt-3 max-w-lg text-white/65">Cremet vanilje, frisk frugt og en elegant afslutning på din aften hos os.</p>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}
