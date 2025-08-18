import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
    }

    const data = await req.json();

    const res = await fetch("http://localhost:8080/api/v1/hotelBooking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(data)
    })
    const result = await res.json();


    if (!res.ok) {
        return NextResponse.json({
            message: result.message
        }, {
            status: 401
        })
    }

    return NextResponse.json({
        message: "OK"
    }, { status: 200 })
}