"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Om Nomi BBQ & Sushi</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Vores regler og politikker for at sikre den bedste oplevelse for alle gæster
            </p>
          </div>

          <div className="space-y-12">
            {/* Concept Overview */}
            <section className="border-l-4 border-[#A91D3A] pl-8 py-6">
              <h2 className="text-3xl font-bold mb-6">Vores All You Can Eat Koncept</h2>
              <p className="leading-relaxed mb-6 text-foreground">
                Nomi BBQ & Sushi byder velkommen til en kulinarisk oplevelse med autentisk koreansk grillkultur.
                Vores koncept er centreret om bordgrillet Korean BBQ og koreanske specialretter, serveret i et
                moderne og indbydende miljø.
              </p>
              <p className="leading-relaxed mb-6 text-foreground">
                Vi tilbyder et All You Can Eat-koncept, der giver mulighed for at smage bredt og dele en hyggelig
                spiseoplevelse med familie, venner og kolleger. Vi lægger stor vægt på kvalitet, friskhed og autentiske
                smagsoplevelser.
              </p>

              <h3 className="text-xl font-bold mb-4 text-white mt-8">Vigtige Retningslinjer</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Vores All You Can Eat-koncept gælder pr. person.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Alle, der spiser, skal bestille og betale hver for sig.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">
                    Det er ikke tilladt at dele retter eller spise flere personer på én All You Can Eat-bestilling.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Smagsprøver tilbydes ikke.</span>
                </li>
              </ul>
            </section>

            {/* All You Can Drink policy section */}
            <section className="border-l-4 border-[#A91D3A] pl-8 py-6">
              <h2 className="text-3xl font-bold mb-6">All You Can Eat & All You Can Drink</h2>
              <p className="leading-relaxed mb-6 text-foreground">
                For at sikre en behagelig oplevelse for alle gæster og effektiv betjening, har vi følgende regler for
                drikkevarer:
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Der må bestilles én runde drikkevarer ad gangen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Maks. 2 forskellige drikkevarer pr. bestilling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">
                    Drikkevarerne bedes drikkes færdigt, før der bestilles en ny runde
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">
                    Vi beder venligst om, at drikkevarer ikke efterlades, og at alt drikkes inden for 2 timer
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Gælder for hele bordet</span>
                </li>
              </ul>
              <p className="mt-6 text-foreground italic">Tak for jeres forståelse og samarbejde</p>
            </section>

            <section className="border-l-4 border-[#A91D3A] pl-8 py-6 text-foreground">
              <h2 className="text-3xl font-bold mb-6">Madspildspolitik</h2>
              <p className="leading-relaxed mb-6 text-foreground">
                For at sikre høj kvalitet og reducere madspild har vi følgende retningslinjer:
              </p>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">
                    Gæster kan bestille flere gange — vi anbefaler at spise op, før der bestilles igen.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Ved væsentligt madspild opkræves følgende gebyrer:</span>
                </li>
              </ul>
              <div className="mt-4 ml-8 space-y-2 text-white/70">
                <p>
                  <strong className="text-white">Kød:</strong> Hvis der efterlades mere end 2 tallerkener kød, opkræves
                  10 kr. pr. portion.
                </p>
              </div>
              <p className="mt-6 text-white/60 italic">
                Tak for jeres forståelse og for at hjælpe os med at mindske madspild, så vi kan sikre friske retter til
                alle.
              </p>
            </section>

            {/* Children and High Chairs Policy */}
            <section className="border-l-4 border-[#A91D3A] pl-8 py-6">
              <h2 className="text-3xl font-bold mb-6">Regler for Højstole og Børn Under 3 År</h2>
              <p className="leading-relaxed mb-6 text-foreground">
                For at sikre et behageligt og ordentligt spisemiljø for alle gæster, har Nomi BBQ & Sushi fastlagt
                følgende retningslinjer for børn under 3 år:
              </p>

              <h3 className="text-xl font-bold mb-4 text-white">Medbragt Mad og Spisning</h3>
              <ul className="space-y-3 text-white/70 mb-6">
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">Børn under 3 år har tilladelse til at medbringe egen mad.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A91D3A] mr-3 mt-1">•</span>
                  <span className="text-foreground">
                    Det er ligeledes tilladt, at barnet spiser fra forældrenes tallerken uden ekstra betaling.
                  </span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4 text-white">Ansvar og Orden</h3>
              <p className="leading-relaxed mb-4 text-foreground">
                For at opretholde restaurantens hygiejne- og kvalitetsstandarder beder vi forældre om at sikre, at
                området omkring barnet holdes i god orden.
              </p>
              <p className="leading-relaxed text-foreground">
                Såfremt der efterlades væsentligt madspild eller området omkring højstolen fremstår markant tilsølet
                eller uordentligt, forbeholder restauranten sig retten til at opkræve et rengøringsgebyr.
              </p>
              <p className="mt-6 italic text-foreground">
                Vi takker for forståelsen og samarbejdet, som bidrager til en god oplevelse for alle vores gæster.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
