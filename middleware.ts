import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Match only admin routes
//   if (!req.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.next(); // Skip middleware for non-admin routes
//   }

  // Extract token from request
  const token = await getToken({ req });

  // If no token or user is not an admin, redirect to home page
  if (!token || token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Allow access to admin pages
}

// Apply middleware only to admin routes
export const config = {
  matcher: ["/admin/:path*"], // Runs only on /admin routes
};
