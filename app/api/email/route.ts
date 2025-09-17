import { NextResponse } from "next/server";
import WelcomeEmailTemplate from "@/components/Email/WelcomeEmailTemplate";
import sg from "@sendgrid/mail"

sg.setApiKey(process.env.MAIL_API_KEY!)

export async function POST(req: Request) {

    const { hotelName, reservationDate, hotelEmail, hotelPhone, to } = await req.json();

    if (!hotelName || !reservationDate || !hotelEmail || !hotelPhone || !to) {
        return NextResponse.json({
            error: "Falta informacion"
        }, { status: 400 })
    }

    await sg.send(
        {
            to: to,
            from: "sebaactis@gmail.com",
            subject: `Gracias por su reserva en ${hotelName}`,
            html: `
        <p>Fecha de reserva: ${reservationDate}</p>
            <p>Email del hotel: ${hotelEmail}</p>
            <p>Teléfono del hotel: ${hotelPhone} </p>
        `
        }
    )

    return NextResponse.json({
        message: data
    }, { status: 200 })

}