import { BadgeListFromJsonBigger } from "@/components/BagdeListFromJson"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Hotel } from "@/types"
import { HotelDetailsSkeletonBagdes, HotelDetailsSkeletonDescription } from "../HotelDetailSkeletons"

const HotelDescription = ({ hotel }: Hotel) => {
    return (
        <>
            <Card className="shadow-lg border-0">
                <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                    <CardTitle style={{ color: "#3B234A" }}>Acerca de este hotel</CardTitle>
                </CardHeader>
                <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                    {!hotel.description ? <HotelDetailsSkeletonDescription /> :
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {hotel.description}
                        </p>
                    }
                </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
                <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                    <CardTitle style={{ color: "#3B234A" }}>Servicios y Amenidades</CardTitle>
                </CardHeader>
                <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                    {!hotel.features ? (
                        <HotelDetailsSkeletonBagdes />
                    ) : (
                        <BadgeListFromJsonBigger key={hotel.id} features={hotel.features} />
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default HotelDescription