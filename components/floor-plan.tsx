"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

interface Table {
  id: string
  number: number
  seats: number
  row: "bottom" | "right"
  position: { x: number; y: number }
}

const BOTTOM_TABLES: Table[] = Array.from({ length: 4 }, (_, i) => ({
  id: `bottom-${i}`,
  number: i + 1,
  seats: 4,
  row: "bottom",
  position: { x: 50 + i * 100, y: 380 },
}))

const RIGHT_TABLES: Table[] = Array.from({ length: 6 }, (_, i) => ({
  id: `right-${i}`,
  number: 5 + i,
  seats: 4,
  row: "right",
  position: { x: 450, y: 50 + i * 60 },
}))

const ALL_TABLES = [...BOTTOM_TABLES, ...RIGHT_TABLES]

interface FloorPlanProps {
  selectedTable: string | null
  onSelectTable: (tableId: string) => void
}

export function FloorPlan({ selectedTable, onSelectTable }: FloorPlanProps) {
  const [hoveredTable, setHoveredTable] = useState<string | null>(null)

  return (
    <Card className="w-full p-6 bg-card/50 backdrop-blur-sm border-amber-200/30 dark:border-amber-900/30">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Vælg bord</h3>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span>Ledig</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span>Valgt</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <span>Optaget</span>
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 600 500"
        className="w-full h-auto bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900/20 rounded-lg border border-amber-200/30 dark:border-amber-900/20"
        style={{ aspectRatio: "600/500" }}
      >
        {/* Horizontal line at bottom */}
        <line x1="10" y1="420" x2="350" y2="420" stroke="currentColor" strokeWidth="3" opacity="0.2" />
        {/* Vertical line on right */}
        <line x1="350" y1="20" x2="350" y2="420" stroke="currentColor" strokeWidth="3" opacity="0.2" />
        {/* Corner */}
        <circle cx="350" cy="420" r="4" fill="currentColor" opacity="0.2" />

        {/* Bottom tables (horizontal - left side of L) */}
        {BOTTOM_TABLES.map((table, idx) => (
          <g
            key={table.id}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
            onClick={() => onSelectTable(table.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Table */}
            <rect
              x={50 + idx * 75}
              y={350}
              width="65"
              height="50"
              rx="8"
              fill={selectedTable === table.id ? "oklch(0.65 0.18 54)" : "oklch(0.92 0.01 54)"}
              stroke={hoveredTable === table.id ? "oklch(0.65 0.18 54)" : "oklch(0.5 0.15 54)"}
              strokeWidth="2"
              opacity={hoveredTable === table.id || selectedTable === table.id ? 1 : 0.7}
              className="transition-all duration-200"
            />
            {/* Table number */}
            <text
              x={82.5 + idx * 75}
              y={380}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={selectedTable === table.id ? "oklch(0.15 0.01 54)" : "oklch(0.2 0.02 54)"}
              fontSize="18"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {table.number}
            </text>
            {/* Seats indicators */}
            {[...Array(4)].map((_, seatIdx) => {
              const angles = [0, 90, 180, 270]
              const angle = (angles[seatIdx] * Math.PI) / 180
              const radius = 35
              const cx = 82.5 + idx * 75 + Math.cos(angle) * radius
              const cy = 375 + Math.sin(angle) * radius
              return (
                <circle
                  key={`seat-${seatIdx}`}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill={selectedTable === table.id ? "oklch(0.15 0.01 54)" : "oklch(0.55 0.15 54)"}
                  opacity="0.6"
                  className="pointer-events-none"
                />
              )
            })}
          </g>
        ))}

        {/* Right tables (vertical - right side of L) */}
        {RIGHT_TABLES.map((table, idx) => (
          <g
            key={table.id}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
            onClick={() => onSelectTable(table.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Table */}
            <rect
              x={380}
              y={30 + idx * 62}
              width="65"
              height="50"
              rx="8"
              fill={selectedTable === table.id ? "oklch(0.65 0.18 54)" : "oklch(0.92 0.01 54)"}
              stroke={hoveredTable === table.id ? "oklch(0.65 0.18 54)" : "oklch(0.5 0.15 54)"}
              strokeWidth="2"
              opacity={hoveredTable === table.id || selectedTable === table.id ? 1 : 0.7}
              className="transition-all duration-200"
            />
            {/* Table number */}
            <text
              x={412.5}
              y={60 + idx * 62}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={selectedTable === table.id ? "oklch(0.15 0.01 54)" : "oklch(0.2 0.02 54)"}
              fontSize="18"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {table.number}
            </text>
            {/* Seats indicators */}
            {[...Array(4)].map((_, seatIdx) => {
              const angles = [0, 90, 180, 270]
              const angle = (angles[seatIdx] * Math.PI) / 180
              const radius = 35
              const cx = 412.5 + Math.cos(angle) * radius
              const cy = 55 + idx * 62 + Math.sin(angle) * radius
              return (
                <circle
                  key={`seat-${seatIdx}`}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill={selectedTable === table.id ? "oklch(0.15 0.01 54)" : "oklch(0.55 0.15 54)"}
                  opacity="0.6"
                  className="pointer-events-none"
                />
              )
            })}
          </g>
        ))}

        {/* Legend labels */}
        <text x="30" y="480" fontSize="11" fill="currentColor" opacity="0.5" className="pointer-events-none">
          Venstre del
        </text>
        <text x="380" y="25" fontSize="11" fill="currentColor" opacity="0.5" className="pointer-events-none">
          Højre side
        </text>
      </svg>

      {selectedTable && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Bord {ALL_TABLES.find((t) => t.id === selectedTable)?.number}</span>
            <span className="text-muted-foreground ml-2">
              ({ALL_TABLES.find((t) => t.id === selectedTable)?.seats} pladser)
            </span>
          </p>
        </div>
      )}
    </Card>
  )
}
