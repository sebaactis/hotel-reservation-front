interface Props {
    hotelName: string
    reservationDate: Date
    hotelEmail: string
    hotelPhone: string
}

const WelcomeEmailTemplate = ({ hotelName, reservationDate, hotelEmail, hotelPhone }) => {
    return (
        <div>
            <h1>Registro exitoso!</h1>
            <p>Gracias por tu reserva en el hotel: {hotelName}</p>
            <p>Fecha de reserva: {reservationDate}</p>
            <p>Email del hotel: {hotelEmail}</p>
            <p>Teléfono del hotel: {hotelPhone} </p>
        </div>
    )
}

export default WelcomeEmailTemplate