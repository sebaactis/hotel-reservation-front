import CategoryCard from "./CategoryCard"

const Categories = () => {
  return (
    <div className="py-6">
        <p className="text-center md:text-start md:pl-16 text-2xl md:text-3xl font-bold text-indigo-950 italic mb-8 md:mb-5">Categorias más buscadas</p>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-items-center md:gap-0 gap-5">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
    </div>
  )
}

export default Categories