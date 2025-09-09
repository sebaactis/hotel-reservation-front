import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookiesUtil = await cookies();
    const body = await req.json();

    const request = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const response = await request.json();

    if (!request.ok) {

        if (response.errorMap) {
            return NextResponse.json({
                errorMap: response.errorMap
            }, { status: 400 })
        }

        return NextResponse.json({
            error: response.message,
        }, { status: 400 })
    }

    const { token, email, name, lastName, role, userId } = response.entity;
    const cookieData = { token, email, name, lastName, role, userId };

    for (const [key, value] of Object.entries(cookieData)) {
        cookiesUtil.set(key, value, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 10
        })
    }

    return NextResponse.json({
        user: {
            email,
            name,
            lastName,
            role,
            userId
        },
        authenticated: true
    }, { status: 200 })
}