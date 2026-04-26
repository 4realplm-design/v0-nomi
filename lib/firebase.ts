import { initializeApp, getApps, getApp } from "firebase/app"
import { getDatabase, type Database } from "firebase/database"
import { getAuth, type Auth } from "firebase/auth"
import { getStorage, type FirebaseStorage } from "firebase/storage"

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

let app: any
let db: Database | null = null
let auth: Auth | null = null
let storage: FirebaseStorage | null = null

if (typeof window !== "undefined") {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
    db = getDatabase(app)
    auth = getAuth(app)
    storage = getStorage(app)
    console.log("[v0] Firebase initialized successfully")
  } catch (error) {
    console.error("[v0] Firebase initialization error:", error)
  }
}

export { app, db, auth, storage, db as database }
export type { Database, Auth, FirebaseStorage }
