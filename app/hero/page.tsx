"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
// import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import * as THREE from "three" 

function AnimatedShape() {
    const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color={hovered ? "#0d9488" : "#14b8a6"} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-50 to-white"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />

      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-20 blur-3xl"
        style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.05}px)` }}
      />

      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-200 rounded-full opacity-20 blur-3xl"
        style={{ transform: `translate(${scrollY * -0.07}px, ${scrollY * 0.03}px)` }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center">
        <div
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Creative <span className="text-teal-500">Design</span> Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Transforming ideas into visual experiences that captivate and inspire.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-teal-500 hover:bg-teal-600">View Portfolio</Button>
            <Button variant="outline">Contact Me</Button>
          </div> */}
        </div>

        <div className="md:w-1/2 h-[400px]" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <AnimatedShape />
            <Environment preset="studio" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-teal-500" size={32} />
      </div>
    </section>
  )
}
