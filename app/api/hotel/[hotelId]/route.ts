import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { hotelId: number } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const { hotelId } = await params;
    const data = await req.json();

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const editHotelRequest = await fetch(`http://localhost:8080/api/v1/hotel/${hotelId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify(data)
    })

    const response = await editHotelRequest.json();

    if (!editHotelRequest.ok) {

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
    }, { status: 200 })
}

export async function DELETE(req: Request, { params }: { params: { hotelId: number } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    const { hotelId } = await params;

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const deleteHotelRequest = await fetch(`http://localhost:8080/api/v1/hotel/${hotelId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        }
    })

    const response = await deleteHotelRequest.json();

    if (!deleteHotelRequest.ok) {
        console.log(response.message)
        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message
    }, { status: 200 })
}