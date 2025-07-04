import Link from "next/link"

const AdministrationHome = () => {
    return (
        <div>
            <Link href="/administration/addHotel" className="bg-indigo-500 p-2">Agregar Hotel</Link>
        </div>
    )
}

export default AdministrationHome