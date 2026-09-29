"use client"

import { useEffect, useState } from "react"

const pannaCottaFlavors = [
  {
    name: "Jordbær",
    description: "Silkeblød panna cotta med frisk jordbærglaze og sprøde frysetørrede hindbær.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8031-removebg-preview-ZqjJ2brug2upNUVBFVbKQiorm7nJuS.png",
    panel: "#b51f2d",
    accent: "#ffd5d3",
  },
  {
    name: "Lakrids",
    description: "Intens lakridsglaze med sprøde kakaonibs og en dyb, blank finish.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8032-removebg-preview-NyhAZnEVvBSI4oP3Kax2MrqriKq7lP.png",
    panel: "#171519",
    accent: "#d8a65b",
  },
  {
    name: "Chokolade",
    description: "Fyldig chokoladeglaze med kakaonibs og gyldne crumble-stykker på toppen.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8033-removebg-preview-QmHeNHtIkumK1cleElq5ryrpOX6URw.png",
    panel: "#321d1a",
    accent: "#efb867",
  },
] as const

export default function MenuPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFlavor, setActiveFlavor] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const flavor = pannaCottaFlavors[activeFlavor]

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

        <div
          className="relative overflow-hidden rounded-[2rem] transition-colors duration-700"
          style={{ backgroundColor: flavor.panel }}
          onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => {
            if (touchStart === null) return
            const distance = event.changedTouches[0]?.clientX - touchStart
            if (Math.abs(distance) > 45) {
              setActiveFlavor((current) => (distance < 0 ? (current + 1) % pannaCottaFlavors.length : (current - 1 + pannaCottaFlavors.length) % pannaCottaFlavors.length))
            }
            setTouchStart(null)
          }}
        >
          <div className="relative flex min-h-[540px] flex-col items-center justify-between px-6 py-8 text-center sm:min-h-[620px] sm:px-10 sm:py-12">
            <div className="flex w-full items-center justify-between text-left">
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: flavor.accent }}>Nyhed</p>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">{activeFlavor + 1} / {pannaCottaFlavors.length}</p>
            </div>
            <div className="flex flex-1 items-center justify-center py-5">
              <img
                key={flavor.image}
                src={flavor.image}
                alt={`Panna Cotta med ${flavor.name.toLowerCase()}`}
                className="h-auto w-[min(82vw,34rem)] select-none object-contain drop-shadow-[0_24px_18px_rgba(0,0,0,0.3)] transition-all duration-700 motion-safe:animate-[fade-in_700ms_ease-out]"
                draggable="false"
              />
            </div>
            <div className="max-w-xl">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Panna Cotta</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">{flavor.name} · {flavor.description}</p>
            </div>
            <div className="mt-7 flex items-center gap-2" aria-label="Vælg panna cotta-smag">
              {pannaCottaFlavors.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveFlavor(index)}
                  aria-label={`Vis ${item.name} panna cotta`}
                  aria-current={index === activeFlavor ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-500 ${index === activeFlavor ? "w-10" : "w-2 bg-white/45 hover:bg-white/75"}`}
                  style={index === activeFlavor ? { backgroundColor: flavor.accent } : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
