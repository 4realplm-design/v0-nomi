"use client"

import { useState } from "react"

interface CustomTimePickerProps {
  value: string
  onChange: (time: string) => void
  label?: string
}

export default function CustomTimePicker({ value, onChange, label = "Tidspunkt" }: CustomTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false)

  const availableTimes = Array.from({ length: 10 }, (_, i) => {
    const hour = 14 + i
    return `${String(hour).padStart(2, "0")}:00`
  })

  const handleTimeSelect = (time: string) => {
    onChange(time)
    setShowPicker(false)
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
          {value || "Vælg tidspunkt"}
        </span>
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {showPicker && (
        <div className="absolute top-full mt-2 bg-card border border-border rounded-md shadow-lg p-4 z-50 min-w-full">
          <div className="grid grid-cols-2 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                className={`py-3 px-4 rounded-md font-medium transition-all ${
                  value === time
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground border border-border hover:bg-accent/10 hover:border-primary"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
