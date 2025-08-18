import { user } from "@heroui/theme";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { userId: string, hotelId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const { userId, hotelId } = await params;

    const favoriteRequest = await fetch(`http://localhost:8080/api/v1/favorite/${userId}/${hotelId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
    })
    const response = await favoriteRequest.json();

    if (!favoriteRequest.ok) {
        return NextResponse.json({
            error: response.message,
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message,
    }, { status: 201 })

}

export async function DELETE(req: Request, { params }: { params: { userId: string, hotelId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const { userId, hotelId } = await params;

    const favoriteRequest = await fetch(`http://localhost:8080/api/v1/favorite/${userId}/${hotelId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
    })
    const response = await favoriteRequest.json();

    if (!favoriteRequest.ok) {
        return NextResponse.json({
            error: response.message,
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message,
    }, { status: 201 })

}