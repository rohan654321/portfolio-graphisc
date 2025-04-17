"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "sonner"

export type Project = {
  id?: string
  title: string
  category: string
  description: string
  image: string
}

type ProjectContextType = {
  projects: Project[]
  isLoading: boolean
  error: string | null
  fetchProjects: () => Promise<void>
  addProject: (project: Project) => Promise<void>
  updateProject: (project: Project) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectSyncProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to load projects. Please try again later.")
      // For demo purposes, set some sample projects if the API fails
      setProjects([
        {
          id: "1",
          title: "Brand Identity - Coffee Shop",
          category: "branding",
          description: "Complete brand identity design for an artisanal coffee shop.",
          image: "/placeholder.svg?height=600&width=800",
        },
        {
          id: "2",
          title: "Mobile App UI Design",
          category: "ui",
          description: "User interface design for a fitness tracking mobile application.",
          image: "/placeholder.svg?height=600&width=800",
        },
        {
          id: "3",
          title: "Product Photography",
          category: "photography",
          description: "Professional product photography for an e-commerce website.",
          image: "/placeholder.svg?height=600&width=800",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const addProject = async (project: Project) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new Error("Failed to add project")
      }

      const newProject = await response.json()
      setProjects((prev) => [...prev, newProject])
      return Promise.resolve()
    } catch (err) {
      console.error("Error adding project:", err)
      toast("Failed to add project. Please try again.")
      return Promise.reject(err)
    }
  }

  const updateProject = async (project: Project) => {
    if (!project.id) return Promise.reject(new Error("Project ID is required"))

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      const updatedProject = await response.json()
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updatedProject : p)))
      return Promise.resolve()
    } catch (err) {
      console.error("Error updating project:", err)
      toast("Failed to update project. Please try again.")
      return Promise.reject(err)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      setProjects((prev) => prev.filter((p) => p.id !== id))
      return Promise.resolve()
    } catch (err) {
      console.error("Error deleting project:", err)
      toast("Failed to delete project. Please try again.")
      return Promise.reject(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <ProjectContext.Provider
      value={{
        projects,
        isLoading,
        error,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectSyncProvider")
  }
  return context
}
