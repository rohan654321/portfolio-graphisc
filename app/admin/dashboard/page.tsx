"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, LogOut, Video, Music } from "lucide-react"
import { toast } from "sonner"
import { ProjectDialog } from "@/components/project-dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import type { Project } from "@/lib/types"
import { ProjectSyncProvider, useProjects } from "@/components/project-sync-provider"

function AdminDashboardContent() {
  const { projects, isLoading, addProject, updateProject, deleteProject } = useProjects()
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/admin")
    }
  }, [router])

  const handleAddProject = () => {
    setCurrentProject(null)
    setIsProjectDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setCurrentProject(project)
    setIsProjectDialogOpen(true)
  }

  const handleDeleteClick = (project: Project) => {
    setCurrentProject(project)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!currentProject?.id) return

    try {
      await deleteProject(currentProject.id)
      toast("Project deleted successfully")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to delete project")
    }

    setIsDeleteDialogOpen(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/admin")
  }

  const handleProjectSaved = async (savedProject: Project) => {
    try {
      if (savedProject.id) {
        // Update existing project
        await updateProject(savedProject)
        toast("Project updated successfully")
      } else {
        // Add new project
        await addProject(savedProject)
        toast("Project created successfully")
      }
      setIsProjectDialogOpen(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to save project")
    }
  }

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  // Helper function to determine media type
  const getMediaType = (url: string | undefined) => {
    if (!url) return null

    if (url.match(/\.(mp4|webm|mov|ogg)$/i)) {
      return "video"
    } else if (url.match(/\.(mp3|wav|ogg|m4a)$/i)) {
      return "audio"
    }
    return "image"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            DESIGN<span className="text-teal-500">STUDIO</span> Admin
          </h1>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Portfolio Projects</h2>
          <Button onClick={handleAddProject} className="bg-teal-500 hover:bg-teal-600">
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="text-center py-12">Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No projects found. Click &quot;Add Project&quot; to create your first project.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const mediaType = project.video ? getMediaType(project.video) : "image"

                  return (
                    <Card key={project.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3]">
                          {mediaType === "video" && (
                            <div className="w-full h-full">
                              <video
                                src={project.video}
                                className="w-full h-full object-cover"
                                controls
                                onError={(e) => {
                                  console.error("Video error:", e)
                                  toast("Error loading video")
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
                                <Video className="h-3 w-3 mr-1" /> Video
                              </div>
                            </div>
                          )}
                          {mediaType === "audio" && (
                            <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center p-4">
                              <Music className="h-12 w-12 text-gray-500 mb-4" />
                              <audio
                                src={project.video}
                                className="w-full"
                                controls
                                onError={(e) => {
                                  console.error("Audio error:", e)
                                  toast("Error loading audio")
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
                                <Music className="h-3 w-3 mr-1" /> Audio
                              </div>
                            </div>
                          )}
                          {mediaType === "image" && (
                            <Image
                              src={project.image || "/placeholder.svg?height=600&width=800"}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{project.title}</h3>
                              <p className="text-sm text-gray-500 capitalize">{project.category}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="icon" onClick={() => handleEditProject(project)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteClick(project)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{project.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Project Add/Edit Dialog */}
      <ProjectDialog
        open={isProjectDialogOpen}
        onOpenChange={setIsProjectDialogOpen}
        project={currentProject}
        onSave={handleProjectSaved}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProjectSyncProvider>
      <AdminDashboardContent />
    </ProjectSyncProvider>
  )
}
