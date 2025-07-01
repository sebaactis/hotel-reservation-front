import { colorsAux } from "@/styles/colorsAux"
import RecommendationCard from "./RecommendationCard"

const Recommendations = () => {
    return (
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-20 mx-20">
            <RecommendationCard />
            <RecommendationCard />
        </div>
    )
}

export default Recommendations