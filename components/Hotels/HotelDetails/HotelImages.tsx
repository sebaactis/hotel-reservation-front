import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const HotelImages = () => {

    const [showGallery, setShowGallery] = useState(false)

    const images = [
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
        "https://imgs.search.brave.com/zekckRCy-3DvoqpeSJ7Z4-tU6HAtAcnOFy0K6WxfAFA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS92aXN0YS1waXNj/aW5hXzEwNDg5NDQt/MjA4MjEzMTkuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
    ]

    return (
        <>
            <Card className="overflow-hidden shadow-lg border-0">
                <CardContent className="p-0">
                    <div className="relative w-full">

                        <div className="hidden md:flex h-96">

                            <div className="w-1/2 relative">
                                <img
                                    src={images[0] || "/placeholder.svg"}
                                    alt="Imagen principal del hotel"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-1">
                                {images.slice(1, 5).map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Hotel imagen ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="md:hidden">

                            <div className="relative h-64">
                                <img
                                    src={images[0] || "/placeholder.svg"}
                                    alt="Imagen principal del hotel"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-1 h-20">
                                {images.slice(1, 5).map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`Hotel imagen ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button
                            className="absolute bottom-4 right-4 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                            style={{ backgroundColor: "#3B234A" }}
                            onClick={() => {
                                setShowGallery(true);
                            }}
                        >
                            Ver más
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {showGallery && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                    <div className="relative w-full max-w-4xl">
                        <Button
                            onClick={() => setShowGallery(false)}
                            className="absolute top-4 right-4 z-50 bg-white text-black"
                        >
                            Cerrar
                        </Button>

                        {/* Carrusel */}
                        <div className="flex overflow-x-auto space-x-4 p-4">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Imagen ${index + 1}`}
                                    className="h-[500px] object-contain rounded shadow-lg"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default HotelImages