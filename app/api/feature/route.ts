import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const data = await req.json();



    const requestCreate = await fetch(`http://localhost:8080/api/v1/feature`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({ name: data.name, icon: data.icon })
    })

    const response = await requestCreate.json();

    if (!requestCreate.ok) {

        if (response.errorMap) {
            return NextResponse.json({
                errorMap: response.errorMap
            }, { status: 400 })
        }

        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message,
        entity: response.entity
    }, { status: 201 })
}