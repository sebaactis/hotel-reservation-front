import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { featureId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const { featureId } = await params;
    const data = await req.json();

    const requestEdit = await fetch(`http://localhost:8080/api/v1/feature/${featureId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({
            name: data.name,
            icon: data.icon
        })
    })

    const response = await requestEdit.json();

    if (!requestEdit.ok) {
        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message
    }, { status: 201 })
}


export async function DELETE(req: Request, { params }: { params: { featureId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const { featureId } = await params;

    const requestDelete = await fetch(`http://localhost:8080/api/v1/feature/${featureId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        }
    })

    const response = await requestDelete.json();

    if (!requestDelete.ok) {
        return NextResponse.json({
            message: response.message
        }, { status: 400 })
    }

    return NextResponse.json({
        message: response.message
    }, { status: 201 })
}