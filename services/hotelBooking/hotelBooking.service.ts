import { BookingDto } from "@/types";
import httpInternalApi from "../http/httpInternal.service";
import httpExternalApi from "../http/httpExternal.service";

class HotelBookingAPI {
    getHotelBooking = async (userId: string) => httpInternalApi.httpGet(`/hotelBooking/user/${userId}`, undefined, "include")
    getHotelBookings = async (hotelId: string) => httpExternalApi.httpGet(`/hotelBooking/hotel/${hotelId}`)
    createHotelBooking = async (hotelBooking: BookingDto) => httpInternalApi.httpPost("/hotelBooking", undefined, "include", hotelBooking)
}

const hotelBookingApi = new HotelBookingAPI();
export default hotelBookingApi;