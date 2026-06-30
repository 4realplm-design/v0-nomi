"use client"

import Image from "next/image"
import { useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isFlipped, setIsFlipped] = useState(false)

  const handleLogoClick = () => {
    setIsFlipped(true)
    setTimeout(() => setIsFlipped(false), 2000)
  }

  return (
    <footer id="kontakt" className="bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          {/* Mobile: Logo and Smiley side by side */}
          <div className="md:hidden flex justify-between items-start gap-4 mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="w-32 cursor-pointer focus:outline-none group"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative transition-transform duration-700 ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-32" style={{ backfaceVisibility: "hidden" }}>
                    <Image
                      src="/images/nomi-logo-full.png"
                      alt="Nomi Korean BBQ & Sushi"
                      width={300}
                      height={120}
                      className={`w-full h-auto ${!isFlipped && isFlipped === false ? "logo-shine-back" : ""}`}
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      height: "100%",
                    }}
                  >
                    <div className="css-flame scale-110">
                      <div className="flame-main"></div>
                      <div className="flame-mid"></div>
                      <div className="flame-core"></div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex-shrink-0">
              <a
                href="https://www.findsmiley.dk/1512237"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Image
                  src="/images/control-report-badge.png"
                  alt="Se Kontrol Rapport - Elite Fødevaresmiley"
                  width={140}
                  height={60}
                  className="hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Mobile: Description under logo */}
          <div className="md:hidden mb-8">
            <p className="text-sm text-white/60">
              Autentisk koreansk BBQ i hjertet af Brønderslev{" "}
            </p>
          </div>

          <div className="md:hidden mb-8">
            
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <button
                onClick={handleLogoClick}
                className="w-32 cursor-pointer focus:outline-none group"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative transition-transform duration-700 ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="w-32" style={{ backfaceVisibility: "hidden" }}>
                    <Image
                      src="/images/nomi-logo-full.png"
                      alt="Nomi Korean BBQ & Sushi"
                      width={300}
                      height={120}
                      className={`w-full h-auto ${!isFlipped && isFlipped === false ? "logo-shine-back" : ""}`}
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      height: "100%",
                    }}
                  >
                    <div className="css-flame scale-110">
                      <div className="flame-main"></div>
                      <div className="flame-mid"></div>
                      <div className="flame-core"></div>
                    </div>
                  </div>
                </div>
              </button>
              <p className="text-sm text-white/60">
                Autentisk koreansk BBQ i hjertet af Brønderslev{" "}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Hjem
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    Om Os
                  </a>
                </li>
                <li>
                  <a href="/menu" className="hover:text-white transition-colors">
                    All You Can Eat Menu
                  </a>
                </li>
                <li>
                  <a href="/takeaway" className="hover:text-white transition-colors">
                    Takeaway Menu
                  </a>
                </li>
                <li>
                  <a href="/bestil-mad" className="hover:text-white transition-colors">
                    Bestil Mad
                  </a>
                </li>
                <li>
                  <a href="/booking" className="hover:text-white transition-colors">
                    Reserver Bord
                  </a>
                </li>
                <li>
                  <a href="/karriere" className="hover:text-white transition-colors">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">Kontakt</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Peder Nielsens Plads 8B, 9700 Brønderslev</li>
                <li>Telefon: +45 31 17 58 15</li>
                <li>Email: service@nomirestaurant.dk</li>
                <li>CVR: 45528375</li>
              </ul>

              

              <div className="mt-6">
                <h3 className="text-base font-semibold text-white mb-1">
                  ÅBNINGSTIDER <span className="text-[#A91D3A]">JULI</span>
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Mandag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tirsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Onsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Torsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-1 border-b border-[#A91D3A]">
                    <span>Fredag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80 pt-1">
                    <span>Lørdag</span>
                    <span>12:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Søndag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow */}
            <div>
              <h3 className="font-semibold text-white mb-4">Følg Os</h3>
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61584573419070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/facebook-logo-official.png"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="https://www.instagram.com/9700.nomi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/instagram-logo-2016.webp"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@nomi_9700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/tiktok-logo-official.png"
                    alt="TikTok"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-white mb-3">Fødevarekontrol</h4>
                <a
                  href="https://www.findsmiley.dk/1512237"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Image
                    src="/images/control-report-badge.png"
                    alt="Se Kontrol Rapport - Elite Fødevaresmiley"
                    width={180}
                    height={80}
                    className="hover:scale-105 transition-transform"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: Other sections */}
          <div className="md:hidden space-y-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Hjem
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">
                    Om Os
                  </a>
                </li>
                <li>
                  <a href="/menu" className="hover:text-white transition-colors">
                    All You Can Eat Menu
                  </a>
                </li>
                <li>
                  <a href="/takeaway" className="hover:text-white transition-colors">
                    Takeaway Menu
                  </a>
                </li>
                <li>
                  <a href="/bestil-mad" className="hover:text-white transition-colors">
                    Bestil Mad
                  </a>
                </li>
                <li>
                  <a href="/booking" className="hover:text-white transition-colors">
                    Reserver Bord
                  </a>
                </li>
                <li>
                  <a href="/karriere" className="hover:text-white transition-colors">
                    Jobs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">Kontakt</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li>Peder Nielsens Plads 8B, 9700 Brønderslev</li>
                <li>Telefon: +45 31 17 58 15</li>
                <li>Email: service@nomirestaurant.dk</li>
                <li>CVR: 45528375</li>
              </ul>

              <div className="mt-6">
                <h3 className="text-base font-semibold text-white mb-1">
                  ÅBNINGSTIDER <span className="text-[#A91D3A]">JULI</span>
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Mandag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Tirsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Onsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Torsdag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-1 border-b border-[#A91D3A]">
                    <span>Fredag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between text-white/80 pt-1">
                    <span>Lørdag</span>
                    <span>12:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Søndag</span>
                    <span>16:00 - 21:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow */}
            <div>
              <h3 className="font-semibold text-white mb-4">Følg Os</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61584573419070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/facebook-logo-official.png"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="https://www.instagram.com/9700.nomi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/instagram-logo-2016.webp"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@nomi_9700"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src="/images/tiktok-logo-official.png"
                    alt="TikTok"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; {currentYear} Nomi B.B.Q & Sushi. Alle rettigheder forbeholdt.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={() => {
                const event = new CustomEvent("openPolicyModal", { detail: { tab: "privacy" } })
                window.dispatchEvent(event)
              }}
              className="hover:text-[#A91D3A] transition-colors"
            >
              Privatlivspolitik
            </button>
            <button
              onClick={() => {
                const event = new CustomEvent("openPolicyModal")
                window.dispatchEvent(event)
              }}
              className="hover:text-[#A91D3A] transition-colors"
            >
              Regler & Politikker
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
