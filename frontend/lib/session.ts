"use server";

import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import api from "./axios";

type LoginResult = {
    emailResult: boolean,
    passwordResult: boolean,
    secretKey: string
    userId: string
};

type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

type Credentials = {
    email: string;
    password: string;
}

export async function handleSession(isOnDecrypt: boolean, session: string | undefined = "", loginObject?: Credentials) {

    const result = await api.put("/credentials/login", loginObject);

    const loginData: LoginResult = result.data;

    let emailValidation = "";
    let passwordValidation = "";

    if (!loginData.emailResult) {
        emailValidation = "wrong";

        if (!loginData.passwordResult) {
            passwordValidation = "wrong";
        };

        return {
            emailStatus: emailValidation,
            passwordStatus: passwordValidation
        };
    };

    const encodedKey = new TextEncoder().encode(loginData.secretKey);

    if (isOnDecrypt) {
        try {
            const { payload } = await jwtVerify(session, encodedKey, {
                algorithms: ["HS256"]
            });

            return payload;
        } catch (error) {
            console.log("Failed while verifying the session:", error);
        };
    };

    if (loginData.emailResult && loginData.passwordResult) {
        await createSession(loginData.userId, encodedKey);
    };
};

export async function createSession(userId: string, encodedKey: Uint8Array<ArrayBuffer>) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // It is set to expire in 7 days from now.
    const session = await encrypt({ userId, expiresAt }, encodedKey);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt
    });
};

export async function deleteSession() {
    (await cookies()).delete("session");
    redirect("/system");
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