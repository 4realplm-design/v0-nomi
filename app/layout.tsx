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
  title: "Nomi BBQ & Sushi | Koreansk BBQ & Japansk Sushi i Brønderslev",
  description:
    "Oplev autentisk koreansk BBQ og japansk sushi på Peder Nielsens Plads 8B i Brønderslev. All You Can Eat fra 269,-. Book bord nu!",
  openGraph: {
    title: "Nomi BBQ & Sushi | Koreansk BBQ & Japansk Sushi i Brønderslev",
    description:
      "Oplev autentisk koreansk BBQ og japansk sushi på Peder Nielsens Plads 8B i Brønderslev. All You Can Eat fra 269,-. Book bord nu!",
    url: "https://www.nomirestaurant.dk",
    siteName: "Nomi BBQ & Sushi",
    images: [
      {
        url: "/images/nyt-20projekt-20-2816-29.png",
        width: 1200,
        height: 1200,
        alt: "Nomi BBQ & Sushi - Restaurant i Brønderslev",
      },
    ],
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomi BBQ & Sushi | Koreansk BBQ & Japansk Sushi i Brønderslev",
    description:
      "Oplev autentisk koreansk BBQ og japansk sushi på Peder Nielsens Plads 8B i Brønderslev. All You Can Eat fra 269,-.",
    images: ["/images/nyt-20projekt-20-2816-29.png"],
  },
  keywords: [
    "koreansk restaurant Brønderslev",
    "sushi Brønderslev",
    "koreansk BBQ Brønderslev",
    "japansk sushi",
    "BBQ restaurant",
    "bordgrill",
    "all you can eat",
    "Nomi BBQ og sushi",
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
