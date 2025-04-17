// This is a utility to help synchronize projects between components
// It uses localStorage and custom events to keep data in sync

import type { Project } from "./types"

// Save projects to localStorage
export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem("portfolioProjects", JSON.stringify(projects))

    // Dispatch event to notify other components
    const event = new CustomEvent("projectsUpdated", { detail: projects })
    window.dispatchEvent(event)
  } catch (error) {
    console.error("Error saving projects:", error)
  }
}

// Load projects from localStorage
export function loadProjects(): Project[] {
  try {
    const storedProjects = localStorage.getItem("portfolioProjects")

    if (storedProjects) {
      return JSON.parse(storedProjects)
    }
  } catch (error) {
    console.error("Error loading projects:", error)
  }

  // Default projects if none exist
  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "Brand Identity",
      category: "branding",
      image: "/placeholder.svg?height=600&width=800",
      description: "Complete brand identity design for a tech startup",
    },
    {
      id: "2",
      title: "Product Packaging",
      category: "packaging",
      image: "/placeholder.svg?height=600&width=800",
      description: "Eco-friendly packaging design for cosmetics brand",
    },
    {
      id: "3",
      title: "Editorial Design",
      category: "print",
      image: "/placeholder.svg?height=600&width=800",
      description: "Magazine layout and editorial design",
    },
    {
      id: "4",
      title: "Mobile App UI",
      category: "ui",
      image: "/placeholder.svg?height=600&width=800",
      description: "User interface design for fitness tracking app",
    },
  ]

  // Save default projects
  saveProjects(defaultProjects)

  return defaultProjects
}

// Subscribe to project updates
export function subscribeToProjectUpdates(callback: (projects: Project[]) => void): () => void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = (event: any) => {
    callback(event.detail)
  }

  window.addEventListener("projectsUpdated", handler)

  // Return unsubscribe function
  return () => {
    window.removeEventListener("projectsUpdated", handler)
  }
}
