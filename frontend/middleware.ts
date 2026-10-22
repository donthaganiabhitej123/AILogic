
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  
  const token = request.cookies.get("accessToken")?.value;


  const isLoginPage = pathname === "/login";

  const isDashboardPage =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  if (isDashboardPage && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

 
  if (isLoginPage && token) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
