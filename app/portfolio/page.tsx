"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectSyncProvider, useProjects } from "@/components/project-sync-provider"

// Import framer-motion
const MotionCard = motion(Card)

// Separate component that uses the context
function PortfolioContent() {
  const { projects, isLoading } = useProjects()
  const [scrollY, setScrollY] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get unique categories from projects
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))]

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Parallax decorative elements */}
      <div
        className="absolute right-0 top-0 w-1/3 h-screen bg-gradient-to-b from-teal-100 to-transparent opacity-50"
        style={{ transform: `translateX(${scrollY * 0.05}px)` }}
      />
      <div
        className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-gradient-to-t from-cyan-100 to-transparent opacity-50"
        style={{ transform: `translateX(${scrollY * -0.05}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Portfolio</h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A selection of my recent work across various design disciplines. Each project represents a unique challenge
            and creative solution.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex justify-center mb-12">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No projects found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <MotionCard
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="overflow-hidden group cursor-pointer"
                  >
                    <CardContent className="p-0 relative">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg?height=600&width=800"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <h3 className="text-white text-xl font-bold">{project.title}</h3>
                          <p className="text-white/80 mt-2">{project.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </MotionCard>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button className="bg-teal-500 hover:bg-teal-600">View All Projects</Button>
        </div>
      </div>
    </section>
  )
}

// Main component that wraps the content with the provider
export default function Portfolio() {
  return (
    <ProjectSyncProvider>
      <PortfolioContent />
    </ProjectSyncProvider>
  )
}
