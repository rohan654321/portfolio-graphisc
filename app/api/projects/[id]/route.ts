import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// ✅ safest way: use `any` for second argument or access `.params` later
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, context: any) {
  const id = context.params.id

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: NextRequest, context: any) {
  const id = context.params.id

  try {
    const data = await request.json()

    // Create an update object with only the fields that exist in the schema
    const updateData = {
      title: data.title,
      category: data.category,
      description: data.description,
      image: data.image,
    }

    // Only add video field if it exists in the data
    if ("video" in data) {
      // @ts-expect-error - We know video exists in our schema but TS doesn't know yet
      updateData.video = data.video
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: NextRequest, context: any) {
  const id = context.params.id

  try {
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
