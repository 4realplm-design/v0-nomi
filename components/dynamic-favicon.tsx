"use client"

import { useEffect, useRef } from "react"

export default function DynamicFavicon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const linkRef = useRef<HTMLLinkElement | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const animationFrameRef = useRef<number>()
  const logoImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 64
    canvas.height = 64
    canvasRef.current = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      document.head.appendChild(link)
    }
    linkRef.current = link

    const logoImg = new Image()
    logoImg.crossOrigin = "anonymous"
    logoImg.src = "/images/nyt-20projekt-20-2816-29.png"
    logoImageRef.current = logoImg

    const drawLogo = () => {
      if (!ctx || !logoImageRef.current) return
      ctx.clearRect(0, 0, 64, 64)

      if (logoImageRef.current.complete) {
        ctx.drawImage(logoImageRef.current, 0, 0, 64, 64)
      } else {
        // Fallback while image loads: draw burgundy circle
        ctx.fillStyle = "#A91D3A"
        ctx.beginPath()
        ctx.arc(32, 32, 30, 0, Math.PI * 2)
        ctx.fill()
      }

      updateFavicon()
    }

    logoImg.onload = () => {
      drawLogo()
    }

    let flameFrame = 0
    const drawFlame = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, 64, 64)

      flameFrame++
      const time = flameFrame * 0.1

      // Black background
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, 64, 64)

      // Animated flame layers
      // Base flame (burgundy red)
      ctx.fillStyle = "#A91D3A"
      ctx.beginPath()
      ctx.moveTo(32, 15 + Math.sin(time) * 2)
      ctx.bezierCurveTo(
        38 + Math.cos(time * 1.5) * 2,
        20 + Math.sin(time * 1.2) * 2,
        42 + Math.cos(time * 0.8) * 1,
        28 + Math.sin(time * 1.5) * 2,
        40 + Math.cos(time) * 1,
        38,
      )
      ctx.bezierCurveTo(38, 44, 34, 48, 32, 48)
      ctx.bezierCurveTo(30, 48, 26, 44, 24, 38)
      ctx.bezierCurveTo(
        22 + Math.cos(time) * 1,
        28 + Math.sin(time * 1.5) * 2,
        26 + Math.cos(time * 0.8) * 1,
        20 + Math.sin(time * 1.2) * 2,
        32,
        15 + Math.sin(time) * 2,
      )
      ctx.closePath()
      ctx.fill()

      // Bright inner flame (orange-red)
      ctx.fillStyle = "#FF4444"
      ctx.beginPath()
      ctx.moveTo(32, 22 + Math.sin(time * 2) * 1.5)
      ctx.bezierCurveTo(
        35 + Math.cos(time * 2) * 1,
        26 + Math.sin(time * 1.8) * 1.5,
        36,
        32 + Math.sin(time * 2.2) * 1,
        34 + Math.cos(time * 1.5) * 1,
        37,
      )
      ctx.bezierCurveTo(33, 40, 32, 42, 32, 42)
      ctx.bezierCurveTo(32, 42, 31, 40, 30, 37)
      ctx.bezierCurveTo(
        28 + Math.cos(time * 1.5) * 1,
        32 + Math.sin(time * 2.2) * 1,
        28,
        26 + Math.sin(time * 1.8) * 1.5,
        32,
        22 + Math.sin(time * 2) * 1.5,
      )
      ctx.closePath()
      ctx.fill()

      // Core glow (bright white)
      ctx.fillStyle = "#FFFFFF"
      ctx.globalAlpha = 0.6 + Math.sin(time * 3) * 0.2
      ctx.beginPath()
      ctx.moveTo(32, 28 + Math.sin(time * 2.5) * 1)
      ctx.bezierCurveTo(34, 30, 34, 33, 32, 36)
      ctx.bezierCurveTo(30, 33, 30, 30, 32, 28 + Math.sin(time * 2.5) * 1)
      ctx.closePath()
      ctx.fill()
      ctx.globalAlpha = 1.0

      updateFavicon()
    }

    const drawLogoWithShine = (shineProgress: number) => {
      if (!ctx) return
      drawLogo()

      // Add shine gradient overlay
      if (shineProgress < 1) {
        const gradient = ctx.createLinearGradient(-20 + shineProgress * 100, 0, 20 + shineProgress * 100, 64)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
      }

      updateFavicon()
    }

    const updateFavicon = () => {
      if (!canvasRef.current || !linkRef.current) return
      linkRef.current.href = canvasRef.current.toDataURL("image/png")
    }

    let isAnimating = false
    let animationState: "logo" | "flame" | "flip-back" | "shine" = "logo"
    let flipProgress = 0
    let shineProgress = 0

    const animateFlameSequence = () => {
      if (isAnimating) return
      isAnimating = true
      animationState = "flame"
      flameFrame = 0

      // Flame animation for 1.5 seconds
      const flameInterval = setInterval(() => {
        drawFlame()
      }, 50)

      setTimeout(() => {
        clearInterval(flameInterval)
        animationState = "flip-back"

        // Flip back animation
        const flipBackInterval = setInterval(() => {
          flipProgress += 0.1
          if (flipProgress >= 1) {
            clearInterval(flipBackInterval)
            animationState = "shine"
            shineProgress = 0

            // Shine animation
            const shineInterval = setInterval(() => {
              shineProgress += 0.05
              drawLogoWithShine(shineProgress)

              if (shineProgress >= 1) {
                clearInterval(shineInterval)
                animationState = "logo"
                isAnimating = false
                drawLogo()
              }
            }, 30)
          }
        }, 30)
      }, 1500)
    }

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        animateFlameSequence()
      }, 100)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return null
}
