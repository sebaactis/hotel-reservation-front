import { colorsAux } from "@/styles/colorsAux"
import RecommendationCard from "./RecommendationCard"

const Recommendations = () => {
    return (
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-20 bg-[#c3bbc98e] w-full">
            <RecommendationCard />
            <RecommendationCard />
        </div>
    )
}

export default Recommendations