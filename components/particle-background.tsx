"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  // Initialize particles
  const initParticles = () => {
    if (!canvasRef.current) return

    const particles: Particle[] = []
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 15000) // Adjust density

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(20, 184, 166, ${Math.random() * 0.5 + 0.1})`, // Teal color with varying opacity
      })
    }

    particlesRef.current = particles
  }

  // Draw particles and connections
  const drawParticles = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Bounce off edges
      if (particle.x > dimensions.width || particle.x < 0) {
        particle.speedX = -particle.speedX
      }
      if (particle.y > dimensions.height || particle.y < 0) {
        particle.speedY = -particle.speedY
      }

      // Draw particle
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw connections
    ctx.strokeStyle = "rgba(20, 184, 166, 0.05)"
    ctx.lineWidth = 0.5

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x
        const dy = particlesRef.current[i].y - particlesRef.current[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
          ctx.stroke()
        }
      }
    }

    animationRef.current = requestAnimationFrame(drawParticles)
  }

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: document.documentElement.scrollHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Initialize particles when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles()
    }
  }, [dimensions])

  // Start animation when particles are initialized
  useEffect(() => {
    if (particlesRef.current.length > 0) {
      drawParticles()
    }

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [particlesRef.current.length])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}
