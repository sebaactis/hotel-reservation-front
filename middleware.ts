import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const isProtected = req.nextUrl.pathname.startsWith("/administration")

    if (isProtected && !token) {
        const url = new URL("/auth/login", req.url)
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/administration/:path*"]
}