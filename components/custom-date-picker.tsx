"use client"

import { useState } from "react"

interface CustomDatePickerProps {
  value: string
  onChange: (date: string) => void
  label?: string
}

export default function CustomDatePicker({ value, onChange, label = "Dato" }: CustomDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  const today = new Date()
  const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

  const handleDateSelect = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    onChange(`${year}-${month}-${day}`)
    setShowPicker(false)
  }

  const getDayName = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr + "T00:00:00")
    const days = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"]
    return days[date.getDay()]
  }

  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return ""
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("da-DK", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary hover:border-primary transition-colors flex items-center justify-between"
      >
        <span className={value ? "text-foreground font-medium" : "text-muted-foreground"}>
          {value ? `${getDayName(value)}, ${getFormattedDate(value)}` : "Vælg dato"}
        </span>
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {showPicker && (
        <div className="absolute top-full mt-2 bg-card border border-border rounded-md shadow-lg p-4 z-50">
          <div className="grid grid-cols-7 gap-2 w-64">
            {["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"].map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-primary py-2">
                {day}
              </div>
            ))}

            {Array.from({ length: 35 }).map((_, i) => {
              const date = new Date(today)
              date.setDate(today.getDate() + i)
              const dateStr = date.toISOString().split("T")[0]
              const isSelected = value === dateStr
              const isInRange = date <= maxDate

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => isInRange && handleDateSelect(date)}
                  disabled={!isInRange}
                  className={`py-2 rounded text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold"
                      : isInRange
                        ? "text-foreground hover:bg-accent/30 border border-transparent hover:border-accent/50"
                        : "text-muted-foreground opacity-40 cursor-not-allowed bg-muted/50"
                  }`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
