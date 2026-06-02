import { NextRequest, NextResponse } from "next/server"

const protectedAreas: Record<string, string> = {
  "/student": "STUDENT",
  "/faculty": "FACULTY",
  "/accountant": "ACCOUNTANT",
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const entry = Object.entries(protectedAreas).find(([prefix]) => pathname.startsWith(prefix))

  if (!entry || pathname.endsWith("/login") || pathname.includes("forgot-password")) {
    return NextResponse.next()
  }

  const [, requiredRole] = entry
  const token = request.cookies.get("edufee_access_token")?.value
  const role = request.cookies.get("edufee_role")?.value

  if (!token || role !== requiredRole) {
    const loginUrl = new URL(`${entry[0]}/login`, request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/student/:path*", "/faculty/:path*", "/accountant/:path*"],
}
