import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import type { NextApiRequest } from "next";
// import type { NextRequestWithContext } from "next/server";

// this is the correct type to use
type Context = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    const data = await req.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description,
        image: data.image,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  const { id } = context.params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
