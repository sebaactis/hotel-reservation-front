import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const cookiesStore = await cookies();

    cookiesStore.delete("token");
    cookiesStore.delete("email");
    cookiesStore.delete("name");
    cookiesStore.delete("lastName");
    cookiesStore.delete("role");
    cookiesStore.delete("userId");

    return NextResponse.json({
        message: "Logout exitoso"
    }, { status: 200 })
}