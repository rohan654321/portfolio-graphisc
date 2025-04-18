import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeFile } from "fs/promises"
import { v4 as uuidv4 } from "uuid"
import { ensureUploadDir } from "@/lib/ensure-upload-dir"

// Authentication middleware
async function isAuthenticated() {
  const session = (await cookies()).get("admin_session")
  return !!session?.value || process.env.NODE_ENV === "development" // Allow in dev mode for testing
}

export async function POST(request: Request) {
  // Check authentication
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check if it's a video, audio or image file
    const isVideo = file.type.startsWith("video/")
    const isImage = file.type.startsWith("image/")
    const isAudio = file.type.startsWith("audio/")

    if (!isVideo && !isImage && !isAudio) {
      return NextResponse.json(
        { error: "Invalid file type. Only images, videos, and audio files are allowed." },
        { status: 400 },
      )
    }

    // Create a unique filename
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`.toLowerCase()

    // Ensure uploads directory exists
    const uploadsDir = ensureUploadDir()

    // Write the file
    await writeFile(`${uploadsDir}/${filename}`, buffer)

    // Return the URL to the uploaded file
    const url = `/uploads/${filename}`

    console.log(`File uploaded successfully: ${url}`)

    return NextResponse.json({ url, type: isVideo ? "video" : isAudio ? "audio" : "image" })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
