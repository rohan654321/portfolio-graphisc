import type { Project } from "./types"

// In a real app, these functions would interact with your Prisma database
// For this example, we'll use API endpoints that connect to Prisma

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }

  return response.json()
}

export async function createProject(project: Project): Promise<Project> {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  })

  if (!response.ok) {
    throw new Error("Failed to create project")
  }

  return response.json()
}

export async function updateProject(project: Project): Promise<Project> {
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

  return response.json()
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete project")
  }
}
