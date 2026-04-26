"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function MenuPreview() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("menu-section")
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const menuItems = [
    {
      category: "BBQ Klassikere",
      items: ["Bulgogi Bøf", "Galbi Ribben", "Samgyeopsal Bacon"],
    },
    {
      category: "Sushi Specialiteter",
      items: ["Dragon Roll", "Spicy Tuna Roll", "Premium Nigiri Set"],
    },
    {
      category: "Beilag & Saucer",
      items: ["Kimchi", "Japansk Sesam Dressing", "Ginger & Wasabi"],
    },
  ]

  return (
    null
  )
}
