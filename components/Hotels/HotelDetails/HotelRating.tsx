import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from '../../ui/textarea';
import { Button } from "@/components/ui/button"

import {
    Star,
    MessageSquare,
    User
} from "lucide-react"
import { Hotel } from '@/types'
import { toast } from 'sonner';
import { colorsAux } from '@/styles/colorsAux';
import { useAuthStore } from '@/stores/authStore';

const HotelRating = ({ hotel }: Hotel) => {

    const { isAuthenticated, user: userData } = useAuthStore();

    const [reviews, setReviews] = useState([])
    const [userRating, setUserRating] = useState(0)
    const [userComment, setUserComment] = useState("")
    const [showReviewForm, setShowReviewForm] = useState(false)

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    useEffect(() => {
        if (!hotel.id) return;
        const getRatings = async () => {
            const request = await fetch(`http://localhost:8080/api/v1/rating/${hotel.id}`)
            const response = await request.json();

            console.log(response);

            if (request.ok) {
                setReviews(response.entity ?? [])

            }
        }

        getRatings();
    }, [hotel.id])


    const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 cursor-pointer transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                        onClick={() => interactive && onStarClick && onStarClick(star)}
                    />
                ))}
            </div>
        )
    }

    const handleSubmitReview = async () => {
        if (userRating === 0) return

        const newReview = {
            score: userRating,
            comment: userComment
        }

        try {

            const submit = await fetch(`http://localhost:8080/api/v1/rating/${userData?.userId}/${hotel.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newReview)
            })

            const response = await submit.json();

            if (submit.ok) {
                setReviews(
                    [{
                        ...newReview,
                        user: {
                            userData
                        },
                        date: Date.now()
                    },
                    ...reviews]
                )
                setUserRating(0)
                setUserComment("")
                setShowReviewForm(false)

                toast.success("Reseña agregada correctamente")
            }

        } catch (error) {
            toast.error(error.message)
        }


    }

    return (
        <Card className="shadow-lg border-0">
            <CardHeader style={{ backgroundColor: "#C3BBC9" }}>
                <CardTitle style={{ color: "#3B234A" }} className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    Valoraciones y Reseñas
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6" style={{ backgroundColor: "#C3BBC9" }}>

                {/* Resumen de puntuación */}
                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: "#BAAFC4" }}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div
                                className="flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-2xl"
                                style={{ backgroundColor: "#3B234A" }}
                            >
                                {hotel.score?.toFixed(1)}
                            </div>
                            <div>
                                <div className="text-lg font-semibold" style={{ color: "#3B234A" }}>
                                    {hotel.score >= 4.5 ? "Excelente" : hotel.score >= 3.5 ? "Muy bueno" : "Bueno"}
                                </div>
                                <div className="flex items-center gap-2">
                                    {renderStars(Math.round(hotel.score))}
                                    <span className="text-sm" style={{ color: "#523961" }}>
                                        {reviews?.length > 0 ? `Basado en ${reviews?.length} reseñas` : "No hay reseñas todavia para este hotel"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario para nueva reseña (solo usuarios autenticados con reserva completada) */}
                {isAuthenticated && (
                    <div className="mb-6 p-4 border-2 rounded-lg" style={{ borderColor: "#BAAFC4" }}>
                        <h4 className="font-semibold mb-3" style={{ color: "#3B234A" }}>
                            Comparte tu experiencia
                        </h4>
                        {!showReviewForm ? (
                            <Button
                                onClick={() => setShowReviewForm(true)}
                                className="text-white font-semibold hover:opacity-90 transition-opacity"
                                style={{ backgroundColor: "#523961" }}
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Escribir reseña
                            </Button>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "#523961" }}>
                                        Tu puntuación:
                                    </label>
                                    {renderStars(userRating, true, setUserRating)}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: "#523961" }}>
                                        Tu comentario (opcional):
                                    </label>
                                    <Textarea
                                        value={userComment}
                                        onChange={(e) => setUserComment(e.target.value)}
                                        placeholder="Comparte los detalles de tu experiencia..."
                                        className="border-2 focus:ring-0"
                                        style={{
                                            borderColor: "#BAAFC4",
                                            backgroundColor: "white",
                                            color: colorsAux.darkprimary
                                        }}
                                        rows={4}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleSubmitReview}
                                        disabled={userRating === 0}
                                        className="text-white font-semibold hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#3B234A" }}
                                    >
                                        Publicar reseña
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setShowReviewForm(false)
                                            setUserRating(0)
                                            setUserComment("")
                                        }}
                                        variant="outline"
                                        className="border-2 hover:bg-opacity-10 bg-transparent"
                                        style={{
                                            borderColor: "#523961",
                                            color: "#523961",
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Lista de reseñas */}
                <div className="space-y-4">
                    <h4 className="font-semibold" style={{ color: "#3B234A" }}>
                        Reseñas de huéspedes ({reviews.length})
                    </h4>
                    {reviews.map((review, index) => (
                        <div key={index} className="p-4 border rounded-lg" style={{ borderColor: "#BAAFC4" }}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: "#523961" }}
                                    >
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-medium" style={{ color: "#3B234A" }}>
                                            {review.user?.email}
                                        </div>
                                        <div className="text-xs text-gray-600">{formatDate(review.date)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {renderStars(review.score)}
                                    <span className="font-bold" style={{ color: "#3B234A" }}>
                                        {review.score}.0
                                    </span>
                                </div>
                            </div>
                            {review.comment && <p className="text-gray-700 leading-relaxed ml-13">{review.comment}</p>}
                            {review.hasReservation && (
                                <Badge
                                    variant="outline"
                                    className="mt-2 ml-13 text-xs"
                                    style={{
                                        borderColor: "#059669",
                                        color: "#059669",
                                    }}
                                >
                                    ✓ Reserva verificada
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default HotelRating