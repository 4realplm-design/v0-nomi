"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ref as dbRef, push } from "firebase/database"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { database, storage } from "@/lib/firebase"
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
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    console.log("[v0] === JOB APPLICATION SUBMISSION START ===")
    console.log("[v0] Form data:", formData)
    console.log("[v0] CV file:", cvFile ? cvFile.name : "No CV file")
    console.log("[v0] Database initialized:", !!database)
    console.log("[v0] Storage initialized:", !!storage)

    try {
      if (!database) {
        console.error("[v0] Firebase database not initialized!")
        throw new Error("Firebase database not initialized")
      }

      let cvUrl = ""
      if (cvFile && storage) {
        console.log("[v0] Starting CV upload to Firebase Storage...")
        console.log("[v0] File name:", cvFile.name)
        console.log("[v0] File size:", cvFile.size, "bytes")
        console.log("[v0] File type:", cvFile.type)

        const fileName = `cv/${Date.now()}-${cvFile.name}`
        const fileRef = storageRef(storage, fileName)
        console.log("[v0] Storage path:", fileName)

        await uploadBytes(fileRef, cvFile)
        console.log("[v0] CV file uploaded successfully")

        cvUrl = await getDownloadURL(fileRef)
        console.log("[v0] CV download URL obtained:", cvUrl)
      } else if (cvFile && !storage) {
        console.warn("[v0] CV file provided but Firebase Storage not initialized")
      }

      const jobsRef = dbRef(database, "jobs")
      console.log("[v0] Firebase reference path: jobs")

      const applicationData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        availability: formData.availability,
        message: formData.message,
        cvUrl: cvUrl || "",
        appliedAt: new Date().toISOString(),
      }

      console.log("[v0] Application data to submit:", applicationData)

      const result = await push(jobsRef, applicationData)
      console.log("[v0] Push result key:", result.key)
      console.log("[v0] === JOB APPLICATION SUBMITTED SUCCESSFULLY ===")

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
      setCvFile(null)
    } catch (error) {
      console.error("[v0] === JOB APPLICATION SUBMISSION FAILED ===")
      console.error("[v0] Error details:", error)
      if (error instanceof Error) {
        console.error("[v0] Error message:", error.message)
        console.error("[v0] Error stack:", error.stack)
      }
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      console.log("[v0] === JOB APPLICATION SUBMISSION END ===")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (validTypes.includes(file.type)) {
        // Validate file size (max 5MB)
        if (file.size <= 5 * 1024 * 1024) {
          setCvFile(file)
        } else {
          alert("Filen er for stor. Maksimal størrelse er 5MB.")
          e.target.value = ""
        }
      } else {
        alert("Ugyldig filtype. Kun PDF og Word dokumenter er tilladt.")
        e.target.value = ""
      }
    }
  }

  return (
    <main className="bg-black text-white">
      <Navigation />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Jobs hos NOMI</h1>
            <p className="text-lg sm:text-xl text-white/70">
              Vi søger altid energiske og passionerede mennesker til vores team
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up stagger-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Ansøgningsformular</h2>

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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 transition-colors"
                placeholder="F.eks. Straks, Om 2 uger, etc."
              />
            </div>

            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-white mb-2">
                Upload CV (PDF eller Word)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="cv"
                  className="flex items-center justify-center w-full px-4 py-8 bg-white/5 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/10 hover:border-[#A91D3A] transition-colors"
                >
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white/40 mb-3"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cvFile ? (
                      <p className="text-[#A91D3A] font-medium">{cvFile.name}</p>
                    ) : (
                      <>
                        <p className="text-white/70 font-medium">Klik for at uploade dit CV</p>
                        <p className="text-white/40 text-sm mt-1">PDF eller Word (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
              {cvFile && (
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Fjern fil
                </button>
              )}
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-[#A91D3A] focus:outline-none focus:ring-2 focus:ring-[#A91D3A]/20 resize-none transition-colors"
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
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 animate-fade-in-up">
                <p className="text-green-400 text-center">
                  Tak for din ansøgning! Vi vender tilbage til dig hurtigst muligt.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in-up">
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
