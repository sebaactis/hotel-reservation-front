import { HotelEditDto, HotelResponse } from "@/types/hotel";
import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class HotelAPI {
    getHotels = async ({ page, seed, size }: { page?: string, seed?: string, size?: string }) => {
        const params = new URLSearchParams({
            random: "true"
        })

        if (page) params.append("page", page);
        if (seed) params.append("seed", seed);
        if (size) params.append("size", size);

        return httpExternalApi.httpGet<HotelResponse>("/hotel", params);
    }
    createHotel = async (hotelData: HotelEditDto) => httpInternalApi.httpPost("/hotel", undefined, "include", hotelData)
    editHotel = async (hotelId: number, hotelData: HotelEditDto) => httpInternalApi.httpPut(`/hotel/${hotelId}`, undefined, "include", hotelData)
    deleteHotel = async (hotelId: number) => httpInternalApi.httpDelete(`/hotel/${hotelId}`)
}

const hotelApi = new HotelAPI();
export default hotelApi;