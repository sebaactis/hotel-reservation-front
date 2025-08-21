import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { categoryId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const { categoryId } = await params;
    const data = await req.json();

    const requestEdit = await fetch(`http://localhost:8080/api/v1/category/${categoryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`
        },
        body: JSON.stringify({ description: data })
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


export async function DELETE(req: Request, { params }: { params: { categoryId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")

    if (!token) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }

    const { categoryId } = await params;

    const requestDelete = await fetch(`http://localhost:8080/api/v1/category/${categoryId}`, {
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