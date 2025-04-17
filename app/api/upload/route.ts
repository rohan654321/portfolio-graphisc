import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

// Authentication middleware
async function isAuthenticated() {
  const session = (await cookies()).get("admin_session")
  return !!session?.value
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

    // Create a unique filename
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`.toLowerCase()

    // In a real app, you would upload to a cloud storage service like AWS S3
    // For this example, we'll save to the public directory
    const publicDir = join(process.cwd(), "public", "uploads")
    await writeFile(join(publicDir, filename), buffer)

    // Return the URL to the uploaded file
    const url = `/uploads/${filename}`

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
