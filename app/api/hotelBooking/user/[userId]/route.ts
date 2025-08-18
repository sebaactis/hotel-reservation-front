import { NextResponse } from "next/server";


export async function GET(
    _req: Request,
    { params }: { params: { userId: string } }
) {
    const { userId } = params;

    const res = await fetch(`http://localhost:8080/api/v1/hotelBooking/user/${userId}`);
    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ error: data?.error ?? "Error" }, { status: res.status });
    }
    return NextResponse.json(data, { status: 200 });
}