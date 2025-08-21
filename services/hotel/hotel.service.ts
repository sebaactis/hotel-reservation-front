import { HotelEditDto, HotelResponse } from "@/types/hotel";
import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class HotelAPI {
    getHotels = async (page: number, seed?: string) => {
        const params = new URLSearchParams({
            page: page.toString(),
            random: "true"
        })

        if (seed) params.append("seed", seed);

        return httpExternalApi.httpGet<HotelResponse>("/hotel", params);
    }
    createHotel = async (hotelData: HotelEditDto) => httpInternalApi.httpPost("/hotel", undefined, "include", hotelData)
    editHotel = async (hotelId: number, hotelData: HotelEditDto) => httpInternalApi.httpPut(`/hotel/${hotelId}`, undefined, "include", hotelData)
    deleteHotel = async (hotelId: number) => httpInternalApi.httpDelete(`/hotel/${hotelId}`)
}

const hotelApi = new HotelAPI();
export default hotelApi;