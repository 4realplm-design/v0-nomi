"use client"

import { useState, useEffect, useRef } from "react"
import { Trophy, Play, RotateCcw, Flame } from "lucide-react"

export default function MiniGame() {
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: string }[]>([])
  const [playerPosition, setPlayerPosition] = useState(50)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("nomi-game-highscore")
    if (saved) setHighScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setItems((prev) => {
          const newItems = prev
            .map((item) => ({ ...item, y: item.y + 3 }))
            .filter((item) => item.y < 100)

          // Add new item
          if (Math.random() > 0.92) {
            newItems.push({
              id: Date.now(),
              x: Math.random() * 90 + 5,
              y: 0,
              type: Math.random() > 0.2 ? "🥩" : "🔥",
            })
          }
          return newItems
        })
      }, 30)

      return () => clearInterval(interval)
    }
  }, [gameState])

  // Collision detection
  useEffect(() => {
    if (gameState === "playing") {
      items.forEach((item) => {
        if (item.y > 80 && item.y < 95 && Math.abs(item.x - playerPosition) < 10) {
          if (item.type === "🔥") {
            setGameState("gameover")
          } else {
            setScore((s) => s + 1)
            setItems((prev) => prev.filter((i) => i.id !== item.id))
          }
        }
      })
    }
  }, [items, playerPosition, gameState])

  useEffect(() => {
    if (gameState === "gameover" && score > highScore) {
      setHighScore(score)
      localStorage.setItem("nomi-game-highscore", score.toString())
    }
  }, [gameState, score, highScore])

  const startGame = () => {
    setScore(0)
    setItems([])
    setGameState("playing")
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      setPlayerPosition(Math.max(5, Math.min(95, x)))
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect()
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
      setPlayerPosition(Math.max(5, Math.min(95, x)))
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-[#A91D3A]" />
          <div>
            <h2 className="text-xl font-bold">Nomi Grill Master</h2>
            <p className="text-xs text-white/40">Grib kødet, undgå flammerne!</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/40 font-mono">High Score: {highScore}</p>
          <p className="text-2xl font-bold text-[#A91D3A] font-mono">{score}</p>
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className="relative h-64 bg-black/40 rounded-xl border border-white/5 overflow-hidden cursor-none touch-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {gameState === "playing" ? (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="absolute text-2xl -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.type}
              </div>
            ))}
            <div
              className="absolute bottom-4 -translate-x-1/2 text-4xl"
              style={{ left: `${playerPosition}%` }}
            >
              🍽️
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
            {gameState === "idle" ? (
              <div className="text-center p-6">
                <Flame className="w-12 h-12 text-[#A91D3A] mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-4">Klar til at grille?</h3>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-[#A91D3A] hover:bg-[#8B1730] rounded-xl font-bold flex items-center gap-2 transition-all mx-auto shadow-lg shadow-[#A91D3A]/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  START SPIL
                </button>
              </div>
            ) : (
              <div className="text-center p-6">
                <h3 className="text-3xl font-black text-[#A91D3A] mb-2">GAME OVER</h3>
                <p className="text-white/60 mb-6">Du blev brændt! Din score: {score}</p>
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-all mx-auto border border-white/10"
                >
                  <RotateCcw className="w-5 h-5" />
                  PRØV IGEN
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-[10px] text-white/20 text-center uppercase tracking-widest">
        Kun tilgængeligt for medlemmer — Flere spil kommer snart
      </p>
    </div>
  )
}
