import fs from "fs"
import path from "path"

export function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads")

  // Check if directory exists, if not create it
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true })
  }

  return uploadsDir
}
