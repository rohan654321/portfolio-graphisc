"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { X, ImageIcon, Video, Music } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/lib/types"

interface ProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  onSave: (project: Project) => void
}

export function ProjectDialog({ open, onOpenChange, project, onSave }: ProjectDialogProps) {
  const [title, setTitle] = useState(project?.title || "")
  const [category, setCategory] = useState(project?.category || "")
  const [description, setDescription] = useState(project?.description || "")
  const [image, setImage] = useState(project?.image || "")
  const [video, setVideo] = useState(project?.video || "")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadType, setUploadType] = useState<"image" | "video" | "audio">("image")
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (open) {
      setTitle(project?.title || "")
      setCategory(project?.category || "")
      setDescription(project?.description || "")
      setImage(project?.image || "")
      setVideo(project?.video || "")
      setUploadError(null)
    }
  }, [open, project])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isVideo = file.type.startsWith("video/")
    const isImage = file.type.startsWith("image/")
    const isAudio = file.type.startsWith("audio/")

    if (!isVideo && !isImage && !isAudio) {
      toast("Please upload a valid image, video, or audio file")
      return
    }

    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()

      if (isImage) {
        setImage(data.url)
        setVideo("")
      } else if (isVideo || isAudio) {
        setVideo(data.url)
        setImage("")
      }

      toast("File uploaded successfully")
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed")
      toast("Failed to upload file: " + (error instanceof Error ? error.message : "Unknown error"))
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = () => {
    if (!title || !category || !description) {
      toast("Please fill in all required fields")
      return
    }

    onSave({
      id: project?.id,
      title,
      category,
      description,
      image,
      video,
    })
  }

  const triggerFileUpload = (type: "image" | "video" | "audio") => {
    setUploadType(type)
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : type === "video" ? "video/*" : "audio/*"
      fileInputRef.current.click()
    }
  }

  const removeMedia = () => {
    setImage("")
    setVideo("")
  }

  const isVideoFile =
    video && (video.endsWith(".mp4") || video.endsWith(".webm") || video.endsWith(".ogg") || video.endsWith(".mov"))

  const isAudioFile =
    video && (video.endsWith(".mp3") || video.endsWith(".wav") || video.endsWith(".ogg") || video.endsWith(".m4a"))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-4 space-y-4 flex-1">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Web Design, Branding"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
              required
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label>Project Media</Label>
            {image ? (
              <div className="relative aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
                <Image src={image} alt="Project thumbnail" fill className="object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : isVideoFile ? (
              <div className="relative aspect-[4/3] bg-gray-100 rounded-md overflow-hidden">
                <video
                  ref={videoRef}
                  src={video}
                  className="w-full h-full object-cover"
                  controls
                  onError={() => setUploadError("Error loading video. Please try again.")}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : isAudioFile ? (
              <div className="relative bg-gray-100 rounded-md p-4">
                <audio
                  ref={audioRef}
                  src={video}
                  className="w-full"
                  controls
                  onError={() => setUploadError("Error loading audio. Please try again.")}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeMedia}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-32 border-dashed"
                  onClick={() => triggerFileUpload("image")}
                  disabled={isUploading}
                >
                  <ImageIcon className="mr-2 h-5 w-5" />
                  {isUploading && uploadType === "image" ? "Uploading..." : "Upload Image"}
                </Button>
                <Button
                  variant="outline"
                  className="h-32 border-dashed"
                  onClick={() => triggerFileUpload("video")}
                  disabled={isUploading}
                >
                  <Video className="mr-2 h-5 w-5" />
                  {isUploading && uploadType === "video" ? "Uploading..." : "Upload Video"}
                </Button>
                <Button
                  variant="outline"
                  className="h-32 border-dashed"
                  onClick={() => triggerFileUpload("audio")}
                  disabled={isUploading}
                >
                  <Music className="mr-2 h-5 w-5" />
                  {isUploading && uploadType === "audio" ? "Uploading..." : "Upload Audio"}
                </Button>
              </div>
            )}

            {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept={uploadType === "image" ? "image/*" : uploadType === "video" ? "video/*" : "audio/*"}
          />
        </div>

        {/* Fixed footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-2 bg-white sticky bottom-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-teal-500 hover:bg-teal-600"
            disabled={isUploading}
          >
            Save Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
