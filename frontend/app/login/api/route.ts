import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const requestJSON = await req.json();
    const token: string = requestJSON.token;

    cookieStore.set("session-token", token);

    return new Response("Cookie set!", {
        status: 200,
    });
};