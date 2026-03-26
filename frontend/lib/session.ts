import { SignJWT, jwtVerify } from "jose";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type SessionPayload = {
    userId: string;
};

export async function encrypt(payload: SessionPayload, encodedKey: Uint8Array<ArrayBuffer>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
};

export async function decrypt(session: string | undefined = "", encodedKey: Uint8Array<ArrayBuffer>) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"]
        });

        return payload;
    } catch (error) {
        console.log("Failed while verifying the session:", error);
    };
};

export async function handleSession(req: NextApiRequest, res: NextApiResponse) {
    const cookie = serialize("session", req.body, { // req.body should include the received token from the backend.
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    res.setHeader('Set Cookie', cookie);
    res.status(200).json({ message: "Cookie set successfully!" });
};