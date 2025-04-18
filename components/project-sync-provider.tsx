"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Project } from "@/lib/types"

interface ProjectContextType {
  projects: Project[]
  isLoading: boolean
  addProject: (project: Project) => Promise<Project>
  updateProject: (project: Project) => Promise<Project>
  deleteProject: (id: string) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectSyncProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const addProject = async (project: Project): Promise<Project> => {
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
    return newProject
  }

  const updateProject = async (project: Project): Promise<Project> => {
    if (!project.id) throw new Error("Project ID is required")

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
    return updatedProject
  }

  const deleteProject = async (id: string): Promise<void> => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete project")
    }

    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, isLoading, addProject, updateProject, deleteProject }}>
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
