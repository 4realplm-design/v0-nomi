import type { Metadata } from "next"
import BestilMadClientPage from "./client"

export const metadata: Metadata = {
  title: "Bestil Mad | NOMI B.B.Q",
  description: "Bestil takeaway fra NOMI - Kommer snart!",
}

export default function BestilMadPage() {
  return <BestilMadClientPage />
}
