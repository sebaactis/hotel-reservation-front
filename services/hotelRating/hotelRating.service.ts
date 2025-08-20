import { HotelRatingDto } from "@/types/hotelRating";
import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class HotelRatingAPI {
    getRating = async (hotelId: number) => httpExternalApi.httpGet(`/rating/${hotelId}`)
    createRating = async (userId: number, hotelId: number, ratingData: HotelRatingDto) => httpInternalApi.httpPost(`/hotelRating/${userId}/${hotelId}`, undefined, "include", ratingData)
}

const hotelRatingApi = new HotelRatingAPI();
export default hotelRatingApi;
