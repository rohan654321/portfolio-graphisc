"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Layers, PenTool, ImageIcon, Type, Monitor, Smartphone, Camera, Film } from "lucide-react"

const skills = [
  {
    icon: <PenTool className="w-8 h-8 text-teal-500" />,
    title: "Illustration",
    description: "Digital and traditional illustration techniques",
  },
  {
    icon: <Layers className="w-8 h-8 text-teal-500" />,
    title: "Brand Identity",
    description: "Logo design and complete brand systems",
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-teal-500" />,
    title: "Photo Editing",
    description: "Professional photo retouching and manipulation",
  },
  {
    icon: <Type className="w-8 h-8 text-teal-500" />,
    title: "Typography",
    description: "Custom lettering and typographic design",
  },
  {
    icon: <Monitor className="w-8 h-8 text-teal-500" />,
    title: "Web Design",
    description: "Responsive websites and digital experiences",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-teal-500" />,
    title: "UI/UX Design",
    description: "User-centered interface and experience design",
  },
  {
    icon: <Camera className="w-8 h-8 text-teal-500" />,
    title: "Photography",
    description: "Product and lifestyle photography",
  },
  {
    icon: <Film className="w-8 h-8 text-teal-500" />,
    title: "Motion Graphics",
    description: "Animated logos and promotional videos",
  },
]

// Import framer-motion
const MotionDiv = motion.div

export default function Skills() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <div
        className="absolute -left-20 top-40 w-64 h-64 bg-teal-100 rounded-full opacity-70"
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.02}px)` }}
      />
      <div
        className="absolute -right-32 bottom-20 w-80 h-80 bg-cyan-100 rounded-full opacity-70"
        style={{ transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.01}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I offer a wide range of design services, combining technical expertise with creative vision to deliver
            exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{
                transform: `translateY(${(scrollY - 1500) * (index % 2 === 0 ? 0.05 : -0.05)}px)`,
              }}
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </MotionDiv>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-10">Tools & Software</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["Photoshop", "Illustrator", "InDesign", "After Effects", "Figma", "Sketch"].map((tool, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-xl font-bold text-teal-500">{tool.charAt(0)}</span>
                </div>
                <p className="text-gray-800">{tool}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
