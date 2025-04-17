import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { userId } = await request.json()

  // In a real app, you would create a proper session
  // For this example, we'll just set a simple cookie
  ;(await
        // In a real app, you would create a proper session
        // For this example, we'll just set a simple cookie
        cookies()).set("admin_session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  })

  return NextResponse.json({ success: true })
}
