

import { MapPin, PenToolIcon, Star } from 'lucide-react'

import HotelItemEdit from './HotelItemEdit'
import HotelItemDelete from './HotelItemDelete'
import { Feature } from '@/types/feature';
import { Categorie } from '@/types/categorie';
import { Hotel } from '@/types/hotel';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Props {
    hotel: Hotel;
    index: number;
    categories: Categorie[];
    features: Feature[];
}

const HotelItem = ({ hotel, index, categories, features }: Props) => {

    const router = useRouter();

    return (
        <div
            key={hotel.id}
            className={`p-6 border-1`}
            style={{ borderColor: "#BAAFC4" }}
        >
            <div className="flex flex-col lg:flex-row gap-4">

                <div className="flex gap-4 flex-1">
                    <img
                        src={hotel.images[0].url}
                        alt={hotel.name}
                        className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h3 className="text-lg font-semibold truncate" style={{ color: "#3B234A" }}>
                                    {hotel.name}
                                </h3>
                                <div className="flex items-center gap-1 text-sm" style={{ color: "#523961" }}>
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{hotel.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex gap-1">
                                <span className="font-medium" style={{ color: "#523961" }}>
                                    ID:
                                </span>
                                <div className="font-bold" style={{ color: "#3B234A" }}>
                                    {hotel.id}
                                </div>
                            </div>

                            <div>
                                <span className="font-medium" style={{ color: "#523961" }}>
                                    Precio:
                                </span>
                                <div className="font-bold" style={{ color: "#3B234A" }}>
                                    ${hotel.price}/noche
                                </div>
                            </div>

                            <div>
                                <span className="font-medium" style={{ color: "#523961" }}>
                                    Calificación:
                                </span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold" style={{ color: "#3B234A" }}>
                                        {hotel.score.toFixed(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="flex lg:flex-col gap-2 lg:w-auto w-full">
                    <HotelItemEdit hotel={hotel} categories={categories} features={features} />

                    <div className='flex gap-2'>
                        <Button
                            style={{
                                borderColor: "#523961",
                                color: "#523961",
                                backgroundColor: "transparent",

                            }}
                            variant="outline"
                            className='border-2'
                            onClick={() => router.push(`/administration/policies/${hotel.id}`)}
                        >
                            <PenToolIcon />
                            Politicas
                        </Button>
                    </div>

                    <HotelItemDelete hotel={hotel} />
                </div>
            </div>
        </div>
    )
}

export default HotelItem