"use client"

import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, set } from "firebase/database"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzWQqP0Foc9AjVQKEzoqtcY4RrTPHfSm0",
  authDomain: "resturant-e119c.firebaseapp.com",
  databaseURL: "https://resturant-e119c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "resturant-e119c",
  storageBucket: "resturant-e119c.firebasestorage.app",
  messagingSenderId: "72440748908",
  appId: "1:72440748908:web:a2855aa85b8c9f7e93b149",
  measurementId: "G-GNFEBWV0KV",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

interface TableState {
  [tableId: string]: "free" | "booked"
}

interface BookingData {
  name: string
  guests: number
  tableId: string
  date: string
}

const BOOKING_DATE = "2025-12-01"

// Table layout
const BOTTOM_TABLES = Array.from({ length: 4 }, (_, i) => ({
  id: `t${i + 1}`,
  number: i + 1,
  x: 50 + i * 100,
  y: 380,
}))

const RIGHT_TABLES = Array.from({ length: 6 }, (_, i) => ({
  id: `t${i + 5}`,
  number: i + 5,
  x: 430,
  y: 30 + i * 65,
}))

const ALL_TABLES = [...BOTTOM_TABLES, ...RIGHT_TABLES]

export function FirebaseFloorplan() {
  const [tableStates, setTableStates] = useState<TableState>({})
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: "", guests: 1 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time listener for availability
  useEffect(() => {
    const availabilityRef = ref(database, `/availability/${BOOKING_DATE}`)

    const unsubscribe = onValue(availabilityRef, (snapshot) => {
      if (snapshot.exists()) {
        setTableStates(snapshot.val())
      } else {
        // Initialize all tables as free if no data exists
        const initialState = ALL_TABLES.reduce((acc, table) => ({ ...acc, [table.id]: "free" }), {})
        setTableStates(initialState)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleTableClick = (tableId: string) => {
    if (tableStates[tableId] === "free") {
      setSelectedTable(tableId)
      setShowModal(true)
    }
  }

  const handleBooking = async () => {
    if (!selectedTable || !formData.name) return

    setIsSubmitting(true)
    try {
      const bookingId = `${selectedTable}-${Date.now()}`
      const bookingData = {
        tableId: selectedTable,
        date: BOOKING_DATE,
        name: formData.name,
        guests: formData.guests,
        createdAt: new Date().toISOString(),
      }

      // Write booking
      await set(ref(database, `/bookings/${bookingId}`), bookingData)

      // Update availability
      await set(ref(database, `/availability/${BOOKING_DATE}/${selectedTable}`), "booked")

      // Reset form
      setShowModal(false)
      setSelectedTable(null)
      setFormData({ name: "", guests: 1 })
    } catch (error) {
      console.error("Booking failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setSelectedTable(null)
    setFormData({ name: "", guests: 1 })
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vælg dit bord</h2>

        <div className="mb-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#9be7a4" }} />
            <span className="text-gray-700 dark:text-gray-300">Ledig</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f28b82" }} />
            <span className="text-gray-700 dark:text-gray-300">Optaget</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ffd966" }} />
            <span className="text-gray-700 dark:text-gray-300">Valgt</span>
          </div>
        </div>

        <svg
          viewBox="0 0 600 500"
          className="w-full h-auto border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-800"
          style={{ aspectRatio: "600/500" }}
        >
          {/* L-shape guide lines */}
          <line x1="10" y1="420" x2="360" y2="420" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          <line x1="360" y1="30" x2="360" y2="420" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />

          {/* Bottom tables */}
          {BOTTOM_TABLES.map((table) => (
            <g
              key={table.id}
              onClick={() => handleTableClick(table.id)}
              style={{ cursor: tableStates[table.id] === "free" ? "pointer" : "not-allowed" }}
            >
              <rect
                x={table.x}
                y={table.y}
                width="80"
                height="60"
                rx="8"
                fill={
                  selectedTable === table.id ? "#ffd966" : tableStates[table.id] === "booked" ? "#f28b82" : "#9be7a4"
                }
                stroke="#333"
                strokeWidth="2"
              />
              <text
                x={table.x + 40}
                y={table.y + 35}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="24"
                fontWeight="bold"
              >
                {table.number}
              </text>
            </g>
          ))}

          {/* Right tables */}
          {RIGHT_TABLES.map((table) => (
            <g
              key={table.id}
              onClick={() => handleTableClick(table.id)}
              style={{ cursor: tableStates[table.id] === "free" ? "pointer" : "not-allowed" }}
            >
              <rect
                x={table.x}
                y={table.y}
                width="80"
                height="60"
                rx="8"
                fill={
                  selectedTable === table.id ? "#ffd966" : tableStates[table.id] === "booked" ? "#f28b82" : "#9be7a4"
                }
                stroke="#333"
                strokeWidth="2"
              />
              <text
                x={table.x + 40}
                y={table.y + 35}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="24"
                fontWeight="bold"
              >
                {table.number}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Modal/Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Reserver bord {ALL_TABLES.find((t) => t.id === selectedTable)?.number}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dit navn</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Indtast dit navn"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Antal gæster</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>1 gæst</option>
                  <option value={2}>2 gæster</option>
                  <option value={3}>3 gæster</option>
                  <option value={4}>4 gæster</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleBooking}
                  disabled={!formData.name || isSubmitting}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  {isSubmitting ? "Reserverer..." : "Bekræft"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition"
                >
                  Annuller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
