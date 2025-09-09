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

    const createHotelRequest = await fetch("http://localhost:8080/api/v1/hotel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(data),
    })

    const response = await createHotelRequest.json();

    if (!createHotelRequest.ok) {

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
        message: response.message
    }, { status: 201 })
}