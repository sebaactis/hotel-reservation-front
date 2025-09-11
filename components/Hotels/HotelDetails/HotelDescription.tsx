
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HotelDetailsSkeletonBagdes, HotelDetailsSkeletonDescription } from "../HotelDetailSkeletons"
import { MessageCircleWarningIcon, Shield } from "lucide-react"
import { IconBagde } from "@/components/Icons/IconBagde"
import { Hotel } from "@/types/hotel"


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
                        hotel?.features.length <= 0
                            ? <div
                                style={{ color: "#3B234A" }}
                                className="flex gap-2"
                            >
                                <MessageCircleWarningIcon />
                                <p>No hay servicios o amenidades para este hotel</p>

                            </div>
                            : <IconBagde key={hotel.id} features={hotel.features} />

                    )}
                </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
                <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                    <CardTitle style={{ color: "#3B234A" }} className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Políticas del hotel
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>
                    {hotel.policies?.length <= 0 ?
                        <div
                            style={{ color: "#3B234A" }}
                            className="flex gap-2"
                        >
                            <MessageCircleWarningIcon />
                            <p>No hay políticas para este hotel</p>

                        </div>
                        :
                        <div className="space-y-6">
                            {hotel.policies?.map((policy, index) => (
                                <div key={index} className="border-l-4 pl-4 py-2" style={{ borderColor: "#523961" }}>
                                    <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: "#3B234A" }}>
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#523961" }} />
                                        {policy.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed pl-4" style={{ color: "#523961" }}>
                                        {policy.description}
                                    </p>
                                </div>
                            ))}
                        </div>}
                </CardContent>
            </Card>
        </>
    )
}

export default HotelDescription