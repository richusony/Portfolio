import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "richusony-portfolio-jwt-secret-2024-change-in-production"
)

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("manage_token")?.value
  if (!token) return NextResponse.redirect(new URL("/manage/login", req.url))
  try {
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL("/manage/login", req.url))
    res.cookies.delete("manage_token")
    return res
  }
}

export const config = { matcher: ["/manage((?!/login).*)"] }
