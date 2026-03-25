import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleSession } from "./lib/session";

const protectedRoutes = [
    "/system/appointments",
    "/system/comments",
    "/system/history",
    "/system/patients",
    "/system/statistics",
    "/system/therapists",
];

const publicRoutes = [
    "/system", // System's login page.
];

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;
    const session = await handleSession(true, cookie);

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/system", req.nextUrl));
    };

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/system/appointments", req.nextUrl));
    };

    return NextResponse.next();
};