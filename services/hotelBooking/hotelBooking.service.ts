import { BookingDto } from "@/types";
import httpInternalApi from "../http/httpInternal.service";

class HotelBookingAPI {
    getHotelBooking = async (userId: string) => httpInternalApi.httpGet(`/hotelBooking/user/${userId}`, undefined, "include")
    createHotelBooking = async (hotelBooking: BookingDto) => httpInternalApi.httpPost("/hotelBooking", undefined, "include", hotelBooking)
}

const hotelBookingApi = new HotelBookingAPI();
export default hotelBookingApi;