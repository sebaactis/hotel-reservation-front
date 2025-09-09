import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const request = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const response = await request.json();

    if (!request.ok) {

        if (response.errorMap) {
            return NextResponse.json({
                errorMap: response.errorMap
            }, { status: 400 })
        }

        return NextResponse.json({
            error: response.message,
        }, { status: 400 })
    }


    return NextResponse.json({
        message: response.message
    }, { status: 201 })
}