import { type NextRequest, NextResponse } from "next/server"
import * as admin from "firebase-admin"

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app`,
    })
  } catch (error) {
    console.error("Firebase Admin initialization error:", error)
  }
}

function getBookingDuration(bookingDate: string): number {
  const dateObj = new Date(bookingDate)
  const dec20 = new Date("2025-12-20")

  // If booking is on or before Dec 20, 2025: 3 hours
  // If booking is after Dec 20, 2025: 2 hours 20 minutes (140 minutes)
  if (dateObj <= dec20) {
    return 180 // 3 hours in minutes
  } else {
    return 140 // 2 hours 20 minutes
  }
}

function calculateEndTime(startTime: string, bookingDate: string): string {
  const [hours, minutes] = startTime.split(":").map(Number)
  const durationMinutes = getBookingDuration(bookingDate)

  const totalMinutes = hours * 60 + minutes + durationMinutes
  const endHour = Math.floor(totalMinutes / 60)
  const endMinute = totalMinutes % 60

  return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    console.log("[v0] Server: Received booking data:", bookingData)

    // Validate required fields
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.time ||
      !bookingData.guests ||
      !bookingData.tableNumber
    ) {
      return NextResponse.json({ error: "Manglende påkrævede felter" }, { status: 400 })
    }

    const db = admin.database()
    const bookingsRef = db.ref("bookings")

    // Get all existing bookings for the date
    const snapshot = await bookingsRef.orderByChild("date").equalTo(bookingData.date).once("value")
    const existingBookings = snapshot.val() || {}

    const bookingEndTime = calculateEndTime(bookingData.time, bookingData.date)
    const durationHours = getBookingDuration(bookingData.date) / 60

    console.log("[v0] Server: Booking duration:", durationHours, "hours")

    const tableNumber = Number.parseInt(bookingData.tableNumber)

    for (const existingBooking of Object.values(existingBookings) as any[]) {
      // Check both confirmed and pending bookings
      if (existingBooking.status === "confirmed" || existingBooking.status === "pending") {
        const existingTable = Number.parseInt(existingBooking.tableNumber)

        if (existingTable === tableNumber) {
          const existingEndTime = calculateEndTime(existingBooking.time, existingBooking.date)

          // Check overlap
          const s1 = Number.parseInt(bookingData.time.replace(":", ""))
          const e1 = Number.parseInt(bookingEndTime.replace(":", ""))
          const s2 = Number.parseInt(existingBooking.time.replace(":", ""))
          const e2 = Number.parseInt(existingEndTime.replace(":", ""))

          if (s1 < e2 && s2 < e1) {
            console.log("[v0] Server: Table conflict detected", {
              table: tableNumber,
              status: existingBooking.status,
              newBooking: `${bookingData.time}-${bookingEndTime}`,
              existing: `${existingBooking.time}-${existingEndTime}`,
            })
            return NextResponse.json({ error: "Dette bord er allerede booket i det tidsrum" }, { status: 409 })
          }
        }
      }
    }

    // Create booking ID
    const bookingId = Date.now().toString()

    await bookingsRef.child(bookingId).set({
      ...bookingData,
      createdAt: admin.database.ServerValue.TIMESTAMP,
      status: "pending",
    })

    console.log("[v0] Server: Booking saved successfully:", bookingId)

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: "Booking gemt med succes",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Server: Booking error:", error)
    return NextResponse.json({ error: "Der opstod en fejl ved gemning af booking" }, { status: 500 })
  }
}
