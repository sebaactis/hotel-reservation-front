import { colorsAux } from "@/styles/colorsAux"
import { Calendar } from "@heroui/calendar";
import { Button } from "../ui/button";
import Link from "next/link";

const Search = () => {

  return (
    <div className="flex flex-col justify-center items-center bg-[#c3bbc9] py-20 gap-7">
      <p className="text-2xl text-center md:text-start md:text-4xl font-bold text-slate-50">
        Tu hotel ideal te espera. Encuentra el lugar perfecto para tu viaje
      </p>
      <div className="flex flex-col md:flex-row gap-2">
        <input className={`bg-slate-100/50 py-2 pl-3 pr-20 rounded-md placeholder:font-bold text-gray-600 font-semibold`} type="text" placeholder="Ubicación..." />
        <input className="bg-slate-100/50 py-2 pl-3 pr-20 rounded-md text-gray-600 font-semibold" type="date" />
        <input className="bg-slate-100/50 py-2 pl-3 pr-20 rounded-md text-gray-600 font-semibold" type="date" />
        <button style={{ backgroundColor: colorsAux.primary }} className={`py-2 px-10 rounded-md transition-all hover:opacity-90`}>Buscar</button>
      </div>

      <Button>
        <Link href="/categories">
          Buscar por categorias
        </Link>
      </Button>
    </div>
  )
}

export default Search