import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
    const url = new URL(request.url);
  const pathname = url.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  const isProtectedRoute = pathname.startsWith("/cart");

  // Authenticated users should not access Login/Register
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Unauthenticated users cannot access Cart
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/login", "/register"],
};