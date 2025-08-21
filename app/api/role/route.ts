import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const request = await fetch("http://localhost:8080/api/v1/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        }
    })

    const response = await request.json();

    if (!request.ok) {
        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message,
        entity: response.entity
    }, { status: 200 })
}

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const data = await req.json();

    console.log(data)

    const changeRoleRequest = await fetch("http://localhost:8080/api/v1/user/updateRole", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(data)
    })

    const response = await changeRoleRequest.json();

    if (!changeRoleRequest.ok) {
        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message
    }, { status: 200 })
}