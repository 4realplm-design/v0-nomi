"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState, useEffect } from "react"
import { Heart, X, ChevronDown } from "lucide-react"

export default function MenuPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [swipedItems, setSwipedItems] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["bbq"]))

  useEffect(() => {
    const saved = localStorage.getItem("nomi-favorites")
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("nomi-favorites", JSON.stringify(favorites))
  }, [favorites])

  const handleSwipeRight = (itemNumber: string, itemName: string) => {
    if (!favorites.includes(itemNumber)) {
      setFavorites([...favorites, itemNumber])
      setSwipedItems(new Set(swipedItems).add(itemNumber))
      setTimeout(() => {
        setSwipedItems((prev) => {
          const newSet = new Set(prev)
          newSet.delete(itemNumber)
          return newSet
        })
      }, 600)
    }
  }

  const removeFavorite = (itemNumber: string) => {
    setFavorites(favorites.filter((fav) => fav !== itemNumber))
  }

  const menuSections = {
    koreanbbq: {
      title: "Korean BBQ",
      subtitle: "Grill det selv ved bordet",
      categories: {
        bbq: {
          name: "Korean BBQ",
          description: "Udvalg af kød og grøntsager",
          items: [
            { number: "100", name: "Sliced Pork Belly", description: "Svinekød" },
            { number: "101", name: "Sliced Beef Steak", description: "Oksefilet" },
            { number: "102", name: "Sliced Short Ribs", description: "Okseribs - Premium Butcher" },
            { number: "103", name: "Bulgogi Beef", description: "Marineret oksekød" },
            { number: "104", name: "Bulgogi Kylling", description: "Marineret kylling" },
            { number: "105", name: "Beef Black Pepper", description: "Peber oksekød" },
            { number: "106", name: "Tiger Rejer", description: "Store rejer" },
            { number: "107", name: "Mix Vegetables", description: "Blandet grøntsager" },
          ],
        },
      },
    },
    korean: {
      title: "Koreanske Specialiteter",
      subtitle: "Autentiske koreanske retter",
      categories: {
        sides: {
          name: "Sides",
          description: "Tilbehør og salater",
          items: [
            { number: "120", name: "Kimchi" },
            { number: "125", name: "Salat wrap", description: "Frisk salat" },
            { number: "126", name: "Tangsalat" },
            { number: "127", name: "Edamame bønner" },
          ],
        },
        forret: {
          name: "Forretter",
          description: "Lækre startere",
          items: [
            { number: "130", name: "Sprøde rejer", description: "Friteret" },
            { number: "131", name: "Gyoza kylling", description: "Dampede dumplings" },
            { number: "133", name: "Korean Fried Chicken", description: "Yangnyeom" },
            { number: "135", name: "Kimchi pancake", description: "Pandekage" },
          ],
        },
        bibimbap: {
          name: "Bibimbap",
          description: "Stone bowl specialiteter",
          items: [
            { number: "140", name: "Stone bowl vegetables", description: "Grøntsager i sten skål" },
            { number: "141", name: "Stone bowl beef", description: "Oksekød i sten skål" },
          ],
        },
        rice: {
          name: "Rice & Nudler",
          description: "Ris og nudler",
          items: [
            { number: "150", name: "Stegte ris kimchi" },
            { number: "151", name: "Sweet potato nudler", description: "Glasnudler" },
            { number: "152", name: "Nudler suppe / kimchi", description: "Suppe" },
            { number: "153", name: "Hvid ris" },
          ],
        },
        dips: {
          name: "Dips & Saucer",
          description: "Saucer til dine retter",
          items: [
            { number: "160", name: "Chili mayo" },
            { number: "161", name: "Teriyaki sauce" },
            { number: "163", name: "Ssamjang sauce" },
            { number: "165", name: "Sød chili" },
          ],
        },
      },
    },
  }

  const getFavoriteItems = () => {
    const allItems = Object.values(menuSections).flatMap((section) =>
      Object.values(section.categories).flatMap((cat) => cat.items),
    )
    return favorites.map((favNum) => allItems.find((item) => item.number === favNum)).filter(Boolean)
  }

  const SwipeableItem = ({ item, category }: { item: any; category: string }) => {
    const [dragStart, setDragStart] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const isSwiped = swipedItems.has(item.number)
    const isFavorite = favorites.includes(item.number)

    const handleDragStart = (clientX: number) => {
      setDragStart(clientX)
      setIsDragging(true)
    }

    const handleDragMove = (clientX: number) => {
      if (dragStart !== null) {
        const diff = clientX - dragStart
        if (diff > 0) {
          setDragOffset(Math.min(diff, 150))
        }
      }
    }

    const handleDragEnd = () => {
      if (dragOffset > 80) {
        handleSwipeRight(item.number, item.name)
      }
      setDragStart(null)
      setDragOffset(0)
      setIsDragging(false)
    }

    return (
      <div
        className={`relative flex gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/8 transition-all cursor-grab active:cursor-grabbing select-none ${
          isSwiped ? "translate-x-full opacity-0" : ""
        } ${isFavorite ? "bg-[#A91D3A]/10 border border-[#A91D3A]/30" : ""} ${
          isDragging ? "transition-none" : "duration-300"
        }`}
        style={{
          transform: dragOffset > 0 ? `translateX(${dragOffset}px)` : undefined,
        }}
        onTouchStart={(e) => {
          handleDragStart(e.touches[0].clientX)
        }}
        onTouchMove={(e) => {
          handleDragMove(e.touches[0].clientX)
        }}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => {
          handleDragStart(e.clientX)
        }}
        onMouseMove={(e) => {
          if (dragStart !== null) {
            handleDragMove(e.clientX)
          }
        }}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => {
          if (dragStart !== null) {
            handleDragEnd()
          }
        }}
      >
        {dragOffset > 40 && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 font-bold flex items-center gap-2 transition-opacity">
            <Heart className="w-5 h-5 fill-green-400" />
            {dragOffset > 80 ? "Slip for at gemme!" : "Træk mere..."}
          </div>
        )}
        <span className="text-[#A91D3A] font-bold text-lg shrink-0 w-12 z-10">{item.number}</span>
        <div className="flex-1 z-10">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{item.name}</h3>
            {isFavorite && <Heart className="w-4 h-4 fill-[#A91D3A] text-[#A91D3A]" />}
          </div>
          {item.description && <p className="text-white/40 text-sm mt-0.5">{item.description}</p>}
          <p className="text-[#A91D3A]/60 text-xs mt-2">← Træk/Swipe højre for at gemme</p>
        </div>
      </div>
    )
  }

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey)
    } else {
      newExpanded.add(categoryKey)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <div className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">All You Can Eat Menu</h1>
          <p className="text-lg text-white/60 mb-2">Ubegrænset adgang til alle retter</p>
          <p className="text-sm text-white/40">Max 2 timer per reservation</p>

          <div className="mt-8 bg-gradient-to-br from-[#A91D3A]/25 via-black to-black border-2 border-[#A91D3A] rounded-2xl p-6 sm:p-8 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
              SOMMERKAMPAGNE HOS NOMI BBQ
            </h2>
            <p className="text-lg text-white/80 mb-4">
              Fra 5. juli – 9. august kører vi en skøn sommerkampagne!
            </p>
            <p className="text-xl font-semibold text-white mb-2">
              All You Can Eat Koreansk BBQ & Sticks
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-[#A91D3A] mb-3">
              Kun 239 kr. <span className="text-base font-normal text-white/60">pr. person</span>
            </p>
            <ul className="space-y-1.5 text-white/70 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-[#A91D3A] mt-0.5">▸</span>
                <span>
                  Samme pris alle ugens dage — <span className="text-[#ba2348] font-normal">nyd maden i weekenden helt uden ekstra gebyr</span>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A91D3A] mt-0.5">🍣</span>
                <span>Vi serverer ikke sushi i denne periode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#A91D3A] mt-0.5">📅</span>
                <span>Book dit bord allerede i dag – vi glæder os til at byde jer velkommen!</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="mt-8 px-8 py-3 bg-[#A91D3A] hover:bg-[#8B1730] rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? "fill-white" : ""}`} />
            <span>Mine Favoritter</span>
            {favorites.length > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{favorites.length}</span>
            )}
          </button>

          <p className="text-xs text-white/30 mt-4">Swipe eller træk højre på retter for at gemme dem</p>
        </div>
      </div>

      {showFavorites && (
        <div className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Mine Favoritter</h2>
              <button onClick={() => setShowFavorites(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            {favorites.length === 0 ? (
              <p className="text-white/40 text-center py-8">Swipe højre på retter for at gemme dem her</p>
            ) : (
              <div className="grid gap-3">
                {getFavoriteItems().map((item: any) => (
                  <div
                    key={item.number}
                    className="flex gap-4 p-4 rounded-lg bg-[#A91D3A]/10 border border-[#A91D3A]/30"
                  >
                    <span className="text-[#A91D3A] font-bold text-lg shrink-0 w-12">{item.number}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      {item.description && <p className="text-white/40 text-sm mt-0.5">{item.description}</p>}
                    </div>
                    <button
                      onClick={() => removeFavorite(item.number)}
                      className="text-white/40 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(menuSections).map(([sectionKey, section]) => (
            <div key={sectionKey} className="space-y-3">
              <div className="text-center mb-8 pb-6 border-b border-[#A91D3A]/30">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{section.title}</h2>
                <p className="text-white/50 text-sm md:text-base">{section.subtitle}</p>
              </div>

              {Object.entries(section.categories).map(([key, category]) => {
                const isExpanded = expandedCategories.has(key)
                return (
                  <section
                    key={key}
                    className="scroll-mt-32 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleCategory(key)}
                      className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#A91D3A] transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-white/40 text-sm">{category.description}</p>
                        <p className="text-white/20 text-xs mt-1">{category.items.length} retter</p>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-white/40 group-hover:text-white transition-all duration-300 shrink-0 ml-4 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 pb-4 pt-2 grid gap-2 border-t border-white/5">
                        {category.items.map((item) => (
                          <SwipeableItem key={item.number} item={item} category={key} />
                        ))}
                      </div>
                    </div>
                  </section>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
