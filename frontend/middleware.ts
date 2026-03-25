import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

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

export async function middleware(req: NextRequest, encodedKey: any) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie, encodedKey);

    if (isProtectedRoute && !session?.userId) {
        console.log("is protected");
        return NextResponse.redirect(new URL("/system", req.nextUrl));
    };

    if (isPublicRoute && session?.userId) {
        console.log("is public");
        return NextResponse.redirect(new URL("/system/appointments", req.nextUrl));
    };

    return NextResponse.next();
};