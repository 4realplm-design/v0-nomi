import type { Metadata } from "next"
import BookingClient from "./client"

export const metadata: Metadata = {
  title: "Book Bord | NOMI Koreansk BBQ & Sushi",
  description: "Book dit bord hos Nomi Koreansk BBQ & Sushi i Brønderslev",
}

export default function BookingPage() {
  return <BookingClient />
}
