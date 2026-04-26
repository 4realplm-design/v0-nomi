"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function CareerPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    availability: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Send to Firebase
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setSubmitStatus("success")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        availability: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <main className="bg-black text-white">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Bliv en del af NOMI</h1>
            <p className="text-xl text-white/70">Vi søger altid energiske og passionerede mennesker til vores team</p>
          </div>

          {/* Why Work With Us */}
          <div className="mb-12 p-8 rounded-lg border border-white/10 bg-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Hvorfor arbejde hos os?</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-[#A91D3A] font-bold">•</span>
                <span>Dynamisk arbejdsmiljø med et ungt og internationalt team</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#A91D3A] font-bold">•</span>
                <span>Konkurrencedygtig løn og muligheder for karriereudvikling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#A91D3A] font-bold">•</span>
                <span>Moderne faciliter og professionelt køkkenudstyr</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#A91D3A] font-bold">•</span>
                <span>Fleksible arbejdstider og godt arbejdsmiljø</span>
              </li>
            </ul>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Ansøgningsformular</h2>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                Fulde Navn *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
                placeholder="Dit fulde navn"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
                placeholder="din@email.dk"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
                placeholder="+45 12 34 56 78"
              />
            </div>

            {/* Position */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-white mb-2">
                Ønsket Position *
              </label>
              <select
                id="position"
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
              >
                <option value="">Vælg position</option>
                <option value="server">Tjener</option>
                <option value="kitchen">Køkkenmedarbejder</option>
                <option value="chef">Kok</option>
                <option value="bartender">Bartender</option>
                <option value="manager">Manager</option>
                <option value="other">Andet</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-white mb-2">
                Erfaring (år) *
              </label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
              >
                <option value="">Vælg erfaring</option>
                <option value="0-1">0-1 år</option>
                <option value="1-3">1-3 år</option>
                <option value="3-5">3-5 år</option>
                <option value="5+">5+ år</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-white mb-2">
                Hvornår kan du starte? *
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                required
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20"
                placeholder="F.eks. Straks, Om 2 uger, etc."
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Hvorfor vil du arbejde hos NOMI? *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 resize-none"
                placeholder="Fortæl os lidt om dig selv og hvorfor du vil være en del af NOMI..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#A91D3A] hover:bg-[#8B1730] disabled:bg-[#A91D3A]/50 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#A91D3A]/50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sender ansøgning..." : "Send Ansøgning"}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 text-center">
                  Tak for din ansøgning! Vi vender tilbage til dig hurtigst muligt.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 text-center">
                  Der opstod en fejl. Prøv venligst igen eller kontakt os direkte.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}
