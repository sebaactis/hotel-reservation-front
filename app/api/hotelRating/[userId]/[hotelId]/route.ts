import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userId: string, hotelId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const { userId, hotelId } = await params;

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, {
            status: 401
        })
    }

    const data = await req.json();

    const ratingRequest = await fetch(`http://localhost:8080/api/v1/rating/${userId}/${hotelId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(data)
    })

    const response = await ratingRequest.json();

    if (!ratingRequest.ok) {
        return NextResponse.json({
            message: response.message
        }, {
            status: 400
        })
    }

    return NextResponse.json({
        message: response.message
    }, { status: 201 })

}