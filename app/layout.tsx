import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"

import PolicyModal from "@/components/policy-modal"
import DynamicFavicon from "@/components/dynamic-favicon"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nomi B.B.Q | Autentisk Koreansk BBQ i Brønderslev",
  description:
    "Oplev autentisk koreansk BBQ på Peder Nielsens Plads 8B i Brønderslev. Sommerkampagne: All You Can Eat BBQ & Sticks for kun 239,-. Book bord nu!",
  openGraph: {
    title: "Nomi B.B.Q | Autentisk Koreansk BBQ i Brønderslev",
    description:
      "Oplev autentisk koreansk BBQ på Peder Nielsens Plads 8B i Brønderslev. Sommerkampagne: All You Can Eat BBQ & Sticks for kun 239,-. Book bord nu!",
    url: "https://www.nomirestaurant.dk",
    siteName: "Nomi B.B.Q",
    images: [
      {
        url: "/images/nyt-20projekt-20-2816-29.png",
        width: 1200,
        height: 1200,
        alt: "Nomi B.B.Q - Koreansk Restaurant i Brønderslev",
      },
    ],
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomi B.B.Q | Autentisk Koreansk BBQ i Brønderslev",
    description:
      "Oplev autentisk koreansk BBQ på Peder Nielsens Plads 8B i Brønderslev. Sommerkampagne: All You Can Eat BBQ & Sticks for kun 239,-.",
    images: ["/images/nyt-20projekt-20-2816-29.png"],
  },
  keywords: [
    "koreansk restaurant Brønderslev",
    "koreansk BBQ Brønderslev",
    "BBQ restaurant",
    "bordgrill",
    "all you can eat",
    "Nomi restaurant",
    "sommerkampagne",
  ],
  icons: {
    icon: "/images/nomi-logo-circle.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="da" className="dark">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>
          <DynamicFavicon />
          {children}

          <PolicyModal />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
