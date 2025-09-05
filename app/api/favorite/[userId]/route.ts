import { FavoriteDto } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const { userId } = await params;

    const favoritesRequest = await fetch(`http://localhost:8080/api/v1/favorite/${userId}`, {
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    })

    const response = await favoritesRequest.json();

    const ids = response.entity.map((fav: FavoriteDto) => fav.hotelDto.id)
    const hotels = response.entity.map((fav: FavoriteDto) => fav.hotelDto)

    return NextResponse.json({
        ids,
        hotels
    }, { status: 200 })
}