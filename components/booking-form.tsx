"use client"

import type React from "react"
import CustomDatePicker from "./custom-date-picker"
import CustomTimePicker from "./custom-time-picker"

import { useState } from "react"
import { db } from "@/lib/firebase"
import { ref, set } from "firebase/database"

export default function BookingForm({
  onConfirm,
  selectedTable,
  onDateTimeChange,
}: {
  onConfirm: (bookingData: any) => void
  selectedTable?: number | null
  onDateTimeChange?: (date: string, time: string) => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    tableId: selectedTable || null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, date }))
    if (onDateTimeChange && formData.time) {
      onDateTimeChange(date, formData.time)
    }
  }

  const handleTimeChange = (time: string) => {
    setFormData((prev) => ({ ...prev, time }))
    if (onDateTimeChange && formData.date) {
      onDateTimeChange(formData.date, time)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!formData.name || !formData.phone || !formData.date || !formData.time) {
        throw new Error("Udfyld venligst alle felter")
      }

      if (!selectedTable) {
        throw new Error("Vælg venligst et bord på gulvplanen")
      }

      const bookingRef = ref(db, `bookings/${Date.now()}`)
      const expiryTime = new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toISOString()

      await set(bookingRef, {
        name: formData.name,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: Number.parseInt(formData.guests),
        tableId: selectedTable,
        createdAt: new Date().toISOString(),
        expiresAt: expiryTime,
        status: "confirmed",
        cvr: "45528375",
      })

      console.log("[v0] Booking saved to Firebase:", {
        date: formData.date,
        time: formData.time,
        tableId: selectedTable,
      })

      onConfirm({
        ...formData,
        tableId: selectedTable,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "En fejl opstod. Prøv igen.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-md bg-card border border-border space-y-6 shadow-sm">
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Dit Navn</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Fx. Jørgen Hansen"
            className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Telefonnummer</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+45 12 34 56 78"
            className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
          />
        </div>

        <CustomDatePicker value={formData.date} onChange={handleDateChange} />

        <CustomTimePicker value={formData.time} onChange={handleTimeChange} />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Antal Gæster</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "gæst" : "gæster"}
              </option>
            ))}
          </select>
        </div>

        {selectedTable && (
          <div className="p-4 rounded-md bg-primary/10 border border-primary/30">
            <p className="text-sm font-semibold text-primary">Valgt bord: #{selectedTable}</p>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Booker...
          </>
        ) : (
          "Book Dit Bord"
        )}
      </button>

      <p className="text-xs text-center text-muted-foreground">
        Dit bord vil være reserveret i 1 time fra dit booking klokkeslæt
      </p>
    </form>
  )
}
