"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

export default function Story() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBBQGuide, setShowBBQGuide] = useState(false)
  const bordgrillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("story-section")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowBBQGuide(true), 500)
        }
      },
      { threshold: 0.5 },
    )

    if (bordgrillRef.current) {
      observer.observe(bordgrillRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="story-section" className="pt-48 pb-48 sm:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            All You Can Eat Koncept
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
            Nomi BBQ byder på en unik oplevelse, hvor du kan grille din egen Koreanske BBQ direkte ved bordet.
          </p>
        </div>

        <div
          className={`mb-12 sm:mb-16 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Eyebrow */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#A91D3A] border border-[#A91D3A]/40 rounded-full px-4 py-1.5">
              Sommerkampagne &mdash; 5. juli &ndash; 9. august
            </span>
          </div>

          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-[#A91D3A]/30 bg-gradient-to-br from-[#A91D3A]/10 via-black to-black">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#A91D3A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 p-6 sm:p-10">
              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
                SOMMERKAMPAGNE HOS NOMI BBQ
              </h2>
              <p className="text-white/60 text-sm mb-6">Fra 5. juli – 9. august kører vi en skøn sommerkampagne!</p>

              {/* Offer title */}
              <p className="text-xl font-semibold text-white mb-2">All You Can Eat Koreansk BBQ &amp; Sticks</p>

              {/* Price */}
              <p className="text-3xl sm:text-4xl font-bold text-[#A91D3A] mb-3">
                Kun 239 kr. <span className="text-base font-normal text-white/60">pr. person</span>
              </p>

              {/* Details */}
              <ul className="space-y-1.5 text-white/70 mb-8">
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-[#A91D3A] mt-0.5">▸</span>
                  <span>
                    Samme pris alle ugens dage &mdash;{" "}
                    <span className="text-[#b82a4d] font-normal">nyd maden i weekenden helt uden ekstra gebyr!</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-sm sm:text-base">
                  <span className="text-[#A91D3A] mt-0.5">▸</span>
                  <span>OBS: Vi serverer ikke sushi i denne periode</span>
                </li>
                <li className="flex items-start gap-0 text-sm sm:text-base">
                  <span className="text-[#A91D3A] mt-0.5"></span>
                  <span>Book dit bord allerede i dag – vi glæder os til at byde jer velkommen!</span>
                </li>
              </ul>

            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start mb-12 sm:mb-20">
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <Image
                src="/images/bimbap.png"
                alt="Autentisk Korean Bibimbap"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">Vores Koncept</h3>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                Hos Nomi BBQ tilbyder vi et All You Can Eat-koncept, der giver mulighed for at smage bredt og
                dele en hyggelig spiseoplevelse med familie, venner og kolleger. Vi lægger stor vægt på kvalitet,
                friskhed og autentiske smagsoplevelser — fra vores udvalgte kødudskæringer til vores mange lækre sticks.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">Menu og Bestilling</h3>
              <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-2 sm:mr-3 mt-1">▸</span>
                  <span>
                    <strong className="text-white">Korean BBQ ved bordet:</strong> Et udvalg af friske, marinerede og
                    klassiske kødtyper, som gæsterne selv tilbereder ved bordet.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-2 sm:mr-3 mt-1">▸</span>
                  <span>
                    <strong className="text-white">Tilbehør og småretter:</strong> Populære koreanske og japanske
                    retter, som fuldender måltidet.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-2 sm:mr-3 mt-1">▸</span>
                  <span>
                    <strong className="text-white">Digital bestilling:</strong> Alle bestillinger foretages via vores
                    QR-menu. Gæster kan bestille ubegrænset og så ofte, de ønsker.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div ref={bordgrillRef} className="mb-8 sm:mb-12 relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src="/images/nomi-bbq-grill-hq.png"
              alt="Nomi BBQ Bordgrill"
              fill
              priority
              className="object-cover bg-black"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
                  Bordgrill
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-xl">
                  Grill dit kød præcis som du vil have det
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#A91D3A]/10 via-black to-black border-2 border-[#A91D3A]/30 rounded-3xl pt-32 sm:p-8 md:p-12 pb-4 sm:pb-8 md:pb-12 px-4 sm:px-8 md:px-12">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                {"\nNOMI BBQ Guide"}
              </h3>
            </div>

            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              {[
                {
                  step: 1,
                  title: "Vælg en Masterchef",
                  lines: ["Én styrer grillen.", "P1 = ingen kød på grillen", "P5 = kød på grillen"],
                },
                {
                  step: 2,
                  title: "Brug Separate Tænger",
                  lines: ["Én tang til råt kød", "Én tang til færdigt kød"],
                },
                {
                  step: 3,
                  title: "Bestil via QR-menu",
                  lines: ["Scan QR-koden for at bestille", "Brug én telefon til første bestilling"],
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className={`group bg-gradient-to-r from-black/60 to-black/40 rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-[#A91D3A] transition-all duration-300 hover:shadow-xl hover:shadow-[#A91D3A]/20 ${
                    showBBQGuide ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#A91D3A] to-[#7a1529] flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg shadow-[#A91D3A]/50 group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h4>
                      <div className="text-white/70 text-sm sm:text-base leading-relaxed space-y-1">
                        {item.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
