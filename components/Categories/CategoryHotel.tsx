import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Categorie, Hotel } from "@/types"

interface Props {
    category: Categorie
    hotel: Hotel
}

const CategoryHotel = ({ category, hotel }: Props) => {
    return (
        <div
            key={hotel.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <img
                src="https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA"
                alt={hotel.name}
                className="w-full h-32 object-cover"
            />
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm truncate" style={{ color: "#3B234A" }}>
                        {hotel.name}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium" style={{ color: "#523961" }}>
                            {hotel.score}
                        </span>
                    </div>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{hotel.description}</p>
                <div className="flex items-center justify-between">
                    <Badge
                        variant="outline"
                        className="text-xs"
                        style={{
                            borderColor: "#BAAFC4",
                            color: "#523961",
                        }}
                    >
                        {category?.description}
                    </Badge>
                    {hotel.price > 0 && (
                        <span className="font-bold text-sm" style={{ color: "#3B234A" }}>
                            ${hotel.price}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryHotel