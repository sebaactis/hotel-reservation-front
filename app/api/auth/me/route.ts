import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {

        const infoRequest = await fetch("http://localhost:8080/api/v1/auth/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ token })
        })


        if (!infoRequest.ok) {
            return NextResponse.json({ authenticaded: false, message: "Error al recuperar la informacion" }, { status: 401 })
        }

        const response = await infoRequest.json();

        const { email, name, lastName, role, userId } = response.entity;

        return NextResponse.json({
            user: {
                email,
                name,
                lastName,
                role,
                userId
            },
            authenticated: true
        })


    } catch {
        return NextResponse.json({ authenticaded: false }, { status: 401 })
    }
}