"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function PolicyModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"policies" | "privacy">("policies")

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab)
      }
      setIsOpen(true)
    }
    window.addEventListener("openPolicyModal", handleOpen)
    return () => window.removeEventListener("openPolicyModal", handleOpen)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

      {/* Modal */}
      <div className="relative bg-black border-2 border-[#A91D3A] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in flex flex-col">
        {/* Header */}
        <div className="bg-black border-b border-[#A91D3A] px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Regler & Politikker</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-[#A91D3A] hover:bg-[#8a1730] transition-colors flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-black border-b border-[#A91D3A]/30 px-8 flex gap-4">
          <button
            onClick={() => setActiveTab("policies")}
            className={`py-3 px-4 border-b-2 transition-colors font-semibold ${
              activeTab === "policies"
                ? "border-[#A91D3A] text-white"
                : "border-transparent text-white/50 hover:text-white/70"
            }`}
          >
            Regler
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`py-3 px-4 border-b-2 transition-colors font-semibold ${
              activeTab === "privacy"
                ? "border-[#A91D3A] text-white"
                : "border-transparent text-white/50 hover:text-white/70"
            }`}
          >
            Privatlivspolitik
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-8 py-8">
          {activeTab === "policies" && (
            <div className="space-y-10">
              {/* All You Can Eat Guidelines section */}
              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h3 className="text-2xl font-bold mb-4 text-white">All You Can Eat Retningslinjer</h3>
                <p className="leading-relaxed mb-4 text-white/80">
                  For at sikre en fair og behagelig oplevelse for alle gæster, har vi følgende retningslinjer:
                </p>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Vores All You Can Eat-koncept gælder pr. person.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Alle, der spiser, skal bestille og betale hver for sig.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>
                      Det er ikke tilladt at dele retter eller spise flere personer på én All You Can Eat-bestilling.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Smagsprøver tilbydes ikke.</span>
                  </li>
                </ul>
              </section>

              {/* All You Can Eat & All You Can Drink policy section */}
              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h3 className="text-2xl font-bold mb-4 text-white">All You Can Eat & All You Can Drink</h3>
                <p className="leading-relaxed mb-4 text-white/80">
                  For at sikre en behagelig oplevelse for alle gæster og effektiv betjening, har vi følgende regler for
                  drikkevarer:
                </p>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Der må bestilles én runde drikkevarer ad gangen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Maks. 2 forskellige drikkevarer pr. bestilling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Drikkevarerne bedes drikkes færdigt, før der bestilles en ny runde</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>
                      Vi beder venligst om, at drikkevarer ikke efterlades, og at alt drikkes inden for 2 timer
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Gælder for hele bordet</span>
                  </li>
                </ul>
                <p className="mt-4 text-white/80 italic">Tak for jeres forståelse og samarbejde</p>
              </section>

              {/* Food Waste Policy */}
              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Madspildspolitik</h3>
                <p className="leading-relaxed mb-4 text-white/80">
                  For at sikre høj kvalitet og reducere madspild har vi følgende retningslinjer:
                </p>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Gæster kan bestille flere gange — vi anbefaler at spise op, før der bestilles igen.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Ved væsentligt madspild opkræves følgende gebyrer:</span>
                  </li>
                </ul>
                <div className="mt-4 ml-8 space-y-2 text-white/70">
                  <p>
                    <strong className="text-white">Kød:</strong> Hvis der efterlades mere end 2 tallerkener kød,
                    opkræves 10 kr. pr. portion.
                  </p>
                </div>
                <p className="mt-4 text-white/60 italic">
                  Tak for jeres forståelse og for at hjælpe os med at mindske madspild, så vi kan sikre friske retter
                  til alle.
                </p>
              </section>

              {/* Children Policy */}
              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Regler for Højstole og Børn Under 3 År</h3>
                <p className="leading-relaxed mb-4 text-white/80">
                  For at sikre et behageligt og ordentligt spisemiljø for alle gæster, har Nomi BBQ & Sushi fastlagt
                  følgende retningslinjer for børn under 3 år:
                </p>

                <h4 className="text-lg font-bold mb-3 text-white">Medbragt Mad og Spisning</h4>
                <ul className="space-y-2 text-white/70 mb-4">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>Børn under 3 år har tilladelse til at medbringe egen mad.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                    <span>
                      Det er ligeledes tilladt, at barnet spiser fra forældrenes tallerken uden ekstra betaling.
                    </span>
                  </li>
                </ul>

                <h4 className="text-lg font-bold mb-3 text-white">Ansvar og Orden</h4>
                <p className="leading-relaxed mb-3 text-white/80">
                  For at opretholde restaurantens hygiejne- og kvalitetsstandarder beder vi forældre om at sikre, at
                  området omkring barnet holdes i god orden.
                </p>
                <p className="leading-relaxed text-white/80">
                  Såfremt der efterlades væsentligt madspild eller området omkring højstolen fremstår markant tilsølet
                  eller uordentligt, forbeholder restauranten sig retten til at opkræve et rengøringsgebyr.
                </p>
                <p className="mt-4 italic text-white/60">
                  Vi takker for forståelsen og samarbejdet, som bidrager til en god oplevelse for alle vores gæster.
                </p>
              </section>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-8 text-white/80">
              <div className="border-l-4 border-[#A91D3A] pl-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Privatlivspolitik for Nomi B.B.Q & Sushi ApS</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="text-white">Nomi B.B.Q & Sushi ApS</strong>
                  </p>
                  <p>CVR-nr.: 45528375</p>
                  <p>Adresse: Peder Nielsens Plads 8B, 9700 Brønderslev</p>
                  <p>E-mail: info.nomi@mail.com</p>
                  <p>Telefon: +45 31 17 58 15</p>
                </div>
              </div>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">2. Hvilke personoplysninger vi behandler</h4>
                <p className="mb-3">Vi behandler:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Navn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Telefon og e-mail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Reservationsoplysninger</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ordre- og betalingshistorik</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Medlemskab i kundeklub og bookingstatistik</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Kommunikation med personale</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Feedback, anmeldelser og forespørgsler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Tekniske oplysninger (cookies, IP-adresser m.m.)</span>
                  </li>
                </ul>
                <p className="mt-3 italic text-white/60">Der indsamles ikke følsomme oplysninger.</p>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">3. Formål med behandlingen</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Håndtering af reservationer og bordbestillinger</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Administration af kundeklub og loyalitetsprogram</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Kundeservice og kommunikation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Forbedring af service og drift</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Intern statistik og analyse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Overholdelse af lovkrav</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Drift af IT-systemer og sikkerhed</span>
                  </li>
                </ul>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">4. Retsgrundlag</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>GDPR artikel 6(1)(b) – opfyldelse af aftaler</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>GDPR artikel 6(1)(f) – legitim interesse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>GDPR artikel 6(1)(c) – juridiske forpligtelser</span>
                  </li>
                </ul>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">5. Opbevaring og databaseplacering</h4>
                <p className="mb-2">
                  Data opbevares sikkert i Firebase Realtime Database og Firebase Authentication, lokaliseret i Europa
                  (europe-west1).
                </p>
                <p className="mb-2">
                  Reservationsdata og bookinghistorik opbevares i op til 2 år for statistik og kundeservice. Kundekonti
                  og kundeklubsmedlemskaber opbevares, så længe kontoen er aktiv.
                </p>
                <p>
                  Inaktive konti slettes automatisk efter 3 år uden aktivitet, medmindre loven kræver længere opbevaring
                  (f.eks. bogføring).
                </p>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">6. Deling af oplysninger</h4>
                <p className="mb-3">Vi deler kun oplysninger med:</p>
                <ul className="space-y-2 ml-4 mb-3">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Tekniske leverandører</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Betalingssystemer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Myndigheder hvis loven kræver det</span>
                  </li>
                </ul>
                <p className="italic text-white/60">Der sælges ikke oplysninger til tredjepart.</p>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">7. Ret til sletning</h4>
                <p className="mb-2">
                  Du kan få dine oplysninger slettet ved at kontakte vores personale eller kontakte os via:
                </p>
                <p className="mb-2">Info.nomi@mail.com eller +45 31 17 58 15.</p>
                <p className="mb-2">Data slettes inden for 30 dage i henhold til GDPR.</p>
                <p className="italic text-white/60">
                  Bemærk: Visse data kan være omfattet af lovpligtig opbevaring (f.eks. bogføring) og vil først blive
                  slettet efter udløb af lovkravet.
                </p>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">8. Dine rettigheder</h4>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til indsigt</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til rettelse</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til sletning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til begrænsning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til dataportabilitet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A91D3A] mr-2">•</span>
                    <span>Ret til indsigelse</span>
                  </li>
                </ul>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">9. Klage</h4>
                <p className="mb-2">Klage kan indgives til:</p>
                <p>Datatilsynet</p>
                <p>Borgergade 28, 5</p>
                <p>1300 København K</p>
                <p>
                  <a
                    href="http://www.datatilsynet.dk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A91D3A] hover:underline"
                  >
                    www.datatilsynet.dk
                  </a>
                </p>
              </section>

              <section className="border-l-4 border-[#A91D3A] pl-6">
                <h4 className="text-xl font-bold mb-3 text-white">10. Ændringer</h4>
                <p>
                  Politikken kan opdateres løbende. Seneste version vil altid være tilgængelig hos personalet eller på
                  hjemmesiden.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-black border-t border-[#A91D3A] px-8 py-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-3 bg-[#A91D3A] hover:bg-[#8a1730] text-white font-semibold rounded-lg transition-colors"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  )
}
