import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/administrator") &&
    pathname !== "/administrator/login"
  ) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/administrator/login", request.url)
      );
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.redirect(
        new URL("/administrator/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/administrator/:path*"],
};