"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FloorPlan } from "./floor-plan"

export default function TableBookingForm() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", { ...formData, selectedTable })
    setSubmitted(true)

    setTimeout(() => {
      setFormData({ name: "", phone: "", date: "", time: "", guests: "" })
      setSelectedTable(null)
      setSubmitted(false)
    }, 3000)
  }

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl p-8 text-center bg-gradient-to-br from-card to-card/80">
        <div className="text-accent mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Booking Bekræftet!</h2>
        <p className="text-muted-foreground mb-4">
          Dit bord er reserveret for {formData.guests} gæster på {formData.date} kl. {formData.time}
        </p>
        <p className="text-sm text-muted-foreground">Vi ser frem til dit besøg!</p>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Reserver Dit Bord</h1>
        <p className="text-muted-foreground">Vælg et bord og fuldfør din reservation</p>
      </div>

      {/* Floor Plan */}
      <FloorPlan selectedTable={selectedTable} onSelectTable={setSelectedTable} />

      {/* Booking Form */}
      <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-amber-200/30 dark:border-amber-900/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Navn
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-input text-foreground placeholder-muted-foreground transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+45 12 34 56 78"
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-input text-foreground placeholder-muted-foreground transition-all"
              />
            </div>
          </div>

          {/* Date, Time, and Guests Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-foreground mb-2">
                Dato
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-input text-foreground transition-all"
              />
            </div>

            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-foreground mb-2">
                Tidspunkt
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-input text-foreground transition-all"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="guests" className="block text-sm font-semibold text-foreground mb-2">
                Antal Gæster
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-input text-foreground transition-all"
              >
                <option value="">Vælg antal</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "gæst" : "gæster"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-8 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold py-2.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 duration-200"
          >
            Reserver Bord Nu
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Vi bekræfter din reservation inden for 24 timer
        </p>
      </Card>
    </div>
  )
}
