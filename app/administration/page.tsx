import Link from "next/link"

const AdministrationHome = () => {
    return (
        <div className="flex flex-col justify-center items-center my-20">
            <Link href="/administration/hotels" className="bg-indigo-500 p-2 rounded-md">Gestionar Hoteles</Link>
        </div>
    )
}

export default AdministrationHome