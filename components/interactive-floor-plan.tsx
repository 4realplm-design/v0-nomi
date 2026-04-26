"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { ref, get, onValue } from "firebase/database"

interface TableStatus {
  tableId: number
  status: "available" | "occupied" | "booked"
  capacity: number
  guests?: number
  reservedUntil?: string
}

interface FloorPlanProps {
  onTableSelect?: (tableId: number) => void
  selectedTable?: number | null
  selectedDate?: string
  selectedTime?: string
  guestCount?: number
}

const FOUR_SEAT_TABLES = [22, 23, 24, 8, 9, 10, 11, 7, 6, 5, 4, 3, 2, 1, 21]
const SIX_SEAT_TABLES = [12, 13, 14, 15, 16, 17, 18, 19, 20]

export default function InteractiveFloorPlan({
  onTableSelect,
  selectedTable,
  selectedDate,
  selectedTime,
  guestCount = 2,
}: FloorPlanProps) {
  const [tables, setTables] = useState<Map<number, TableStatus>>(new Map())
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeTables()

    const bookingsRef = ref(db, "bookings")
    const unsubscribe = onValue(bookingsRef, () => {
      console.log("[v0] Firebase data updated, refreshing table status")
      initializeTables()
    })

    return () => unsubscribe()
  }, [selectedDate, selectedTime, guestCount])

  const initializeTables = async () => {
    try {
      const tableMap = new Map<number, TableStatus>()

      for (let i = 1; i <= 24; i++) {
        const capacity = FOUR_SEAT_TABLES.includes(i) ? 4 : 6
        tableMap.set(i, {
          tableId: i,
          capacity,
          status: "available",
          guests: 0,
        })
      }

      if (selectedDate && selectedTime) {
        try {
          const bookingsRef = ref(db, "bookings")
          const snapshot = await get(bookingsRef)
          const bookings = snapshot.val() || {}

          Object.entries(bookings).forEach(([_, booking]: any) => {
            if (booking.tableId && booking.date === selectedDate && booking.time === selectedTime) {
              const table = tableMap.get(booking.tableId)
              if (table) {
                table.status = "booked"
                table.guests = booking.guests || 0
              }
            }
          })

          tableMap.forEach((table) => {
            if (table.capacity < guestCount && table.status === "available") {
              table.status = "occupied"
            }
          })
        } catch (fbError) {
          console.log("[v0] Firebase data not available, showing all tables as available")
        }
      }

      setTables(tableMap)
      setError(null)
    } catch (error) {
      console.error("[v0] Failed to fetch table status:", error)
      setError("Kunne ikke indlæse bordstatus")
    }
  }

  const getTableColor = (status: string, isSelected: boolean) => {
    if (isSelected) return "#A91D3A"
    if (status === "available") return "#10B981"
    if (status === "occupied") return "#EF4444"
    if (status === "booked") return "#FBBF24"
    return "#6B7280"
  }

  const handleTableClick = (tableId: number) => {
    const table = tables.get(tableId)
    if (table && table.status === "available" && onTableSelect) {
      console.log("[v0] Table selected:", tableId)
      onTableSelect(tableId)
    }
  }

  if (error) {
    return <div className="text-center text-red-400 py-12">{error}</div>
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <svg
        width="1200"
        height="900"
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-6xl border-2 border-[#A91D3A] rounded-lg bg-zinc-900 p-8"
      >
        {Array.from(tables.values()).map((table) => {
          const isSelected = table.tableId === selectedTable
          const color = getTableColor(table.status, isSelected)

          const coordinates: Record<number, [number, number, number, number]> = {
            1: [600, 750, 80, 80],
            2: [720, 750, 80, 80],
            3: [840, 750, 80, 80],

            4: [600, 620, 80, 80],
            5: [720, 620, 80, 80],
            6: [840, 620, 80, 80],
            7: [960, 620, 80, 80],

            8: [600, 490, 80, 80],
            9: [720, 490, 80, 80],
            10: [840, 490, 80, 80],
            11: [960, 490, 80, 80],

            12: [600, 350, 100, 90],
            13: [750, 350, 100, 90],
            14: [900, 350, 100, 90],

            15: [200, 150, 100, 90],
            16: [350, 150, 100, 90],
            17: [500, 150, 100, 90],
            18: [650, 150, 100, 90],
            19: [800, 150, 100, 90],
            20: [950, 150, 100, 90],

            21: [100, 400, 80, 80],
            22: [100, 750, 80, 80],
            23: [100, 350, 80, 80],
            24: [100, 150, 80, 80],
          }

          const [x, y, w, h] = coordinates[table.tableId] || [0, 0, 80, 80]
          const centerX = x + w / 2
          const centerY = y + h / 2

          return (
            <g
              key={`table-${table.tableId}`}
              onClick={() => handleTableClick(table.tableId)}
              style={{
                cursor: table.status === "available" ? "pointer" : "not-allowed",
                pointerEvents: table.status === "available" ? "auto" : "none",
              }}
              className="transition-all duration-300 hover:scale-105"
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill={color}
                stroke={isSelected ? "#FFFFFF" : "#000000"}
                strokeWidth={isSelected ? 4 : 3}
                rx="8"
                style={{
                  transition: "all 0.3s ease",
                  opacity: table.status === "available" || isSelected ? 1 : 0.6,
                  filter: isSelected ? "drop-shadow(0 0 10px #A91D3A)" : "none",
                }}
              />
              <text
                x={centerX}
                y={centerY - 8}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="28"
                fontWeight="bold"
                fill="#FFFFFF"
                style={{ pointerEvents: "none", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                {table.tableId}
              </text>
              <text
                x={centerX}
                y={centerY + 18}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fontWeight="600"
                fill="#FFFFFF"
                opacity="0.9"
                style={{ pointerEvents: "none" }}
              >
                {table.capacity}p
              </text>
            </g>
          )
        })}

        <rect
          x="450"
          y="300"
          width="120"
          height="550"
          fill="rgba(100, 100, 100, 0.1)"
          stroke="#666666"
          strokeDasharray="8 8"
          strokeWidth="3"
          rx="8"
        />
        <text
          x="510"
          y="575"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="24"
          fill="#FFFFFF"
          fontWeight="700"
          style={{ pointerEvents: "none" }}
        >
          KASSE
        </text>

        <rect
          x="1050"
          y="100"
          width="120"
          height="700"
          fill="rgba(100, 100, 100, 0.1)"
          stroke="#666666"
          strokeDasharray="8 8"
          strokeWidth="3"
          rx="8"
        />
        <text
          x="1110"
          y="450"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="24"
          fill="#FFFFFF"
          fontWeight="700"
          style={{ pointerEvents: "none" }}
          transform="rotate(90 1110 450)"
        >
          INDGANG
        </text>

        <line x1="250" y1="80" x2="250" y2="850" stroke="#555555" strokeWidth="2" strokeDasharray="5 5" />
      </svg>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm w-full max-w-5xl">
        <div className="flex items-center gap-3 p-4 bg-zinc-900 border-2 border-green-500 rounded-lg">
          <div className="w-8 h-8 rounded bg-green-500 border-2 border-black" />
          <span className="text-white font-bold text-base">Ledig</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-zinc-900 border-2 border-yellow-400 rounded-lg">
          <div className="w-8 h-8 rounded bg-yellow-400 border-2 border-black" />
          <span className="text-white font-bold text-base">Booket</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-zinc-900 border-2 border-red-500 rounded-lg">
          <div className="w-8 h-8 rounded bg-red-500 border-2 border-black" />
          <span className="text-white font-bold text-base">Optaget</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-zinc-900 border-2 border-[#A91D3A] rounded-lg shadow-lg shadow-[#A91D3A]/50">
          <div className="w-8 h-8 rounded bg-[#A91D3A] border-2 border-white" />
          <span className="text-white font-bold text-base">Valgt</span>
        </div>
      </div>

      <div className="w-full max-w-5xl p-6 bg-zinc-900 border-2 border-[#A91D3A] rounded-lg">
        <p className="text-base text-white text-center font-semibold">
          💡 Klik på en grøn bord for at reservere. Bordet er reserveret i 2-3 timer fra dit valgte tidspunkt.
        </p>
      </div>
    </div>
  )
}
