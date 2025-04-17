import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const session = (await cookies()).get("admin_session")

  return NextResponse.json({
    authenticated: !!session?.value,
  })
}
