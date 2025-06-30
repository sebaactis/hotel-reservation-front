import { colorsAux } from "@/styles/colorsAux"

const Search = () => {


  return (
    <div className="flex flex-col justify-center items-center bg-[#c3bbc9] py-20 gap-5">
      <p className="text-4xl font-bold text-slate-50">
        Tu hotel ideal te espera. Encuentra el lugar perfecto para tu viaje
      </p>
      <div className="flex gap-2">
          <input className={`bg-slate-100/50 py-1 px-5 rounded-lg placeholder:text-[#897396] placeholder:font-bold`} type="text" placeholder="Ubicación..."/>
          <input className="bg-slate-100/50 py-1 px-5 rounded-lg" type="date" />
          <input className="bg-slate-100/50 py-1 px-5 rounded-lg" type="date" />
          <button>Search</button>
      </div>
    </div>
  )
}

export default Search