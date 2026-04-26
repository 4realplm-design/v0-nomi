"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth"
import { ref, set, get } from "firebase/database"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string, phone: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      if (user && db) {
        const memberRef = ref(db, `members/${user.uid}`)
        const snapshot = await get(memberRef)

        if (!snapshot.exists()) {
          await set(memberRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || "",
            createdAt: new Date().toISOString(),
            bookingsCount: 0,
            lastBooking: null,
          })
        }
      }
    })

    return unsubscribe
  }, [])

  const signUp = async (email: string, password: string, name: string, phone: string) => {
    if (!auth || !db) throw new Error("Firebase not initialized")

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    await set(ref(db, `members/${userCredential.user.uid}`), {
      uid: userCredential.user.uid,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      bookingsCount: 0,
      lastBooking: null,
    })
  }

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not initialized")
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    if (!auth || !db) throw new Error("Firebase not initialized")

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: "select_account",
      })

      console.log("[v0] Starting Google sign-in...")
      const result = await signInWithPopup(auth, provider)
      console.log("[v0] Google sign-in successful:", result.user.email)

      const memberRef = ref(db, `members/${result.user.uid}`)
      const snapshot = await get(memberRef)

      if (!snapshot.exists()) {
        console.log("[v0] Creating new member profile...")
        await set(memberRef, {
          uid: result.user.uid,
          name: result.user.displayName || "",
          email: result.user.email,
          phone: "",
          createdAt: new Date().toISOString(),
          bookingsCount: 0,
          lastBooking: null,
        })
        console.log("[v0] Member profile created successfully")
      } else {
        console.log("[v0] Existing member logged in")
      }
    } catch (error: any) {
      console.error("[v0] Google sign-in error:", error)
      console.error("[v0] Error code:", error.code)
      console.error("[v0] Error message:", error.message)

      if (error.code === "auth/popup-blocked") {
        throw new Error("Pop-up blev blokeret af browseren. Tillad venligst pop-ups og prøv igen.")
      } else if (error.code === "auth/popup-closed-by-user") {
        throw new Error("Login blev annulleret.")
      } else if (error.code === "auth/unauthorized-domain") {
        throw new Error("Dette domæne er ikke autoriseret. Kontakt venligst administratoren.")
      }
      throw error
    }
  }

  const logout = async () => {
    if (!auth) throw new Error("Firebase not initialized")
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
