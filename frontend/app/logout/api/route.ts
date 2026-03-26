import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();

    cookieStore.delete("session-token");

    return new Response("Cookie deleted", {
        status: 200,
    });
};