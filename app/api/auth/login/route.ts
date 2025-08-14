import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const request = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    if (!request.ok) {
        return NextResponse.json({
            error: "Credenciales invalidas"
        }, { status: 401 })
    }

    const response = await request.json();
    const { token, email, name, lastName, role, userId } = response.entity;

    const cookiesUtil = cookies();

    cookiesUtil.set("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });

    cookiesUtil.set("email", email, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });


    cookiesUtil.set("name", name, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });

    cookiesUtil.set("lastName", lastName, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });

    cookiesUtil.set("role", role, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });

    cookiesUtil.set("userId", userId, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 10
    });

    return NextResponse.json({
        user: {
            email,
            name,
            lastName,
            role,
            userId
        }
    }, { status: 200 })
}