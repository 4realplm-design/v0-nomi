import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Initialize Firebase Admin if needed
    const { initializeApp, getApps, cert } = await import("firebase-admin/app")
    const { getFirestore } = await import("firebase-admin/firestore")

    if (getApps().length === 0) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      })
    }

    const db = getFirestore()

    // Save to Firebase under "jobs" collection
    await db.collection("jobs").add({
      ...body,
      status: "new",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Application submitted successfully" })
  } catch (error) {
    console.error("Error submitting application:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
