import { HotelResponse } from "@/types/hotel";
import httpExternalApi from "../http/httpExternal.service";

class HotelAPI {
    getHotels = async (page: number, seed?: string) => {
        const params = new URLSearchParams({
            page: page.toString(),
            random: "true"
        })

        if (seed) params.append("seed", seed);

        return httpExternalApi.httpGet<HotelResponse>("/hotel", params);
    }
}

const hotelApi = new HotelAPI();
export default hotelApi;