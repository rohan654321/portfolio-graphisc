"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function About() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <div
        className="absolute -right-20 top-20 w-80 h-80 bg-teal-100 rounded-full opacity-50"
        style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.03}px)` }}
      />
      <div
        className="absolute -left-40 bottom-20 w-96 h-96 bg-cyan-100 rounded-full opacity-50"
        style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.02}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative" style={{ transform: `translateY(${(scrollY - 500) * 0.1}px)` }}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Designer Portrait"
                width={500}
                height={500}
                className="rounded-lg shadow-xl object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-500 rounded-lg -z-10"></div>
            </div>
          </div>

          <div className="md:w-1/2" style={{ transform: `translateY(${(scrollY - 500) * -0.1}px)` }}>
            <h3 className="text-2xl font-bold mb-4">
              Hello, I&apos;m <span className="text-teal-500">Jane Doe</span>
            </h3>
            <p className="text-gray-600 mb-6">
              With over 8 years of experience in graphic design, I specialize in creating visually stunning and
              functional designs that help brands communicate effectively with their audience.
            </p>
            <p className="text-gray-600 mb-6">
              My approach combines creativity with strategic thinking, ensuring that every design not only looks
              beautiful but also serves its intended purpose. I believe in the power of visual storytelling and how it
              can transform businesses.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Education</h4>
                <p className="text-gray-600">
                  BFA in Graphic Design
                  <br />
                  Rhode Island School of Design
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Experience</h4>
                <p className="text-gray-600">
                  8+ Years
                  <br />
                  Agency & Freelance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
