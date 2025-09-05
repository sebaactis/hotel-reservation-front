import { NextResponse } from "next/server";
import { Resend } from "resend"
import WelcomeEmailTemplate from "@/components/Email/WelcomeEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

    const { hotelName, reservationDate, hotelEmail, hotelPhone, to } = await req.json();

    if (!hotelName || !reservationDate || !hotelEmail || !hotelPhone || !to) {
        return NextResponse.json({
            error: "Falta informacion"
        }, { status: 400 })
    }

    const { error, data } = await resend.emails.send({
        from: 'App Demo <onboarding@resend.dev>',
        to: to,
        subject: "Registro confirmado en HotelWeb",
        react: WelcomeEmailTemplate({ hotelName, reservationDate, hotelEmail, hotelPhone })
    })

    console.log(error)

    if (error) {
        return NextResponse.json({
            error: error
        }, { status: 400 })
    }

    return NextResponse.json({
        message: data
    }, { status: 200 })

}