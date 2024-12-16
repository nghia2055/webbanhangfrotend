import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const cookie = request.cookies.get("accessToken");
  if (
    (cookie?.value && url === "/login") ||
    (cookie?.value && url === "/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!cookie?.value && url === "/dashboard") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/register", "/login", "/dashboard"],
};
