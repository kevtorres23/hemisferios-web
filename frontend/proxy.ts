import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers';

const protectedRoutes = [
    "/system/appointments",
    "/system/comments",
    "/system/history",
    "/system/patients",
    "system/statistics",
    "therapists",
];

const publicRoutes = [
    "/system" // Login page.
];

export default async function proxy(request: NextRequest) {
    console.log("message from proxy");

    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const sessionCookie = (await cookies()).get("session-token")?.value;

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL("/system", request.nextUrl))
    };

    if (sessionCookie && isPublicRoute) {
        return NextResponse.redirect(new URL("/system/appointments", request.nextUrl));
    };

    return NextResponse.next();
};

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};