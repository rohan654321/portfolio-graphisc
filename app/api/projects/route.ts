import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Create a create object with only the fields that exist in the schema
    const createData = {
      title: data.title,
      category: data.category,
      description: data.description,
      image: data.image,
    }

    // Only add video field if it exists in the data
    if ("video" in data) {
      // @ts-expect-error - We know video exists in our schema but TS doesn't know yet
      createData.video = data.video
    }

    const project = await prisma.project.create({
      data: createData,
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
