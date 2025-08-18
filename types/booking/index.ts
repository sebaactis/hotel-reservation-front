export type BookingDto = {
    hotelId: number;
    userId: number;
    bookedFrom: string;
    bookedTo: string;
    guests: number;
    totalPrice: number;
    nights: number;
}