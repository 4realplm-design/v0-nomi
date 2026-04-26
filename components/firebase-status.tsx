"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import { ref, onValue } from "firebase/database"

export function FirebaseStatus() {
  const [status, setStatus] = useState<{
    database: boolean
    auth: boolean
    connection: string
  }>({
    database: false,
    auth: false,
    connection: "checking...",
  })

  useEffect(() => {
    if (!db) {
      setStatus({
        database: false,
        auth: false,
        connection: "not initialized",
      })
      return
    }

    const connectedRef = ref(db, ".info/connected")

    const unsubscribe = onValue(
      connectedRef,
      (snapshot) => {
        const connected = snapshot.val() === true
        setStatus({
          database: !!db,
          auth: !!auth,
          connection: connected ? "connected" : "disconnected",
        })
      },
      (error) => {
        console.error("[v0] Firebase status check failed:", error)
        setStatus({
          database: !!db,
          auth: !!auth,
          connection: "error",
        })
      },
    )

    return () => unsubscribe()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 right-4 bg-black border border-[#A91D3A] text-white p-4 rounded-lg text-xs z-50">
      <div className="font-bold mb-2">Firebase Status</div>
      <div>Database: {status.database ? "✅" : "❌"}</div>
      <div>Auth: {status.auth ? "✅" : "❌"}</div>
      <div>Connection: {status.connection}</div>
    </div>
  )
}
