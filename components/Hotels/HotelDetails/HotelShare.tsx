import { Hotel } from '@/types'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"

import {
    Facebook,
    Twitter,
    Instagram,
    Share2,
    Copy,
    Check
} from "lucide-react"
import { useState } from 'react'
import { colorsAux } from '@/styles/colorsAux';

interface Props {
    hotel: Hotel
    showShareModal: boolean
    setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>

}

const HotelShare = ({ hotel, showShareModal, setShowShareModal }: Props) => {

    const [selectedSocialNetwork, setSelectedSocialNetwork] = useState("")
    const [customMessage, setCustomMessage] = useState("")
    const [linkCopied, setLinkCopied] = useState(false)

    const productUrl = `http://localhost:3000/hotel/${hotel.id}`

    const defaultShareContent = {
        title: hotel.name,
        description: `Descubre ${hotel.name} en ${hotel.location}. Desde €${hotel.price} por noche. ¡Una experiencia única te espera!`,
        image: hotel.imageUrl,
        url: productUrl,
    }

    const socialNetworks = [
        {
            id: "facebook",
            name: "Facebook",
            icon: Facebook,
            color: "#1877F2",
            shareUrl: (url: string, text: string) =>
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
        },
        {
            id: "twitter",
            name: "Twitter",
            icon: Twitter,
            color: "#1DA1F2",
            shareUrl: (url: string, text: string) =>
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        },
        {
            id: "instagram",
            name: "Instagram",
            icon: Instagram,
            color: "#E4405F",
            shareUrl: (url: string, text: string) => `https://www.instagram.com/`
        },
    ]

    const handleShareToSocial = (networkId: string) => {
        const network = socialNetworks.find((n) => n.id === networkId)
        if (!network) return

        const shareText = customMessage || defaultShareContent.description
        const shareUrl = network.shareUrl(productUrl, shareText)

        if (networkId === "instagram") {

            alert("Instagram se abrirá. Puedes copiar el enlace y compartirlo manualmente en tu historia o publicación.")
            window.open("https://www.instagram.com/", "_blank")
        } else {

            window.open(shareUrl, "share-dialog", "width=600,height=400,scrollbars=yes,resizable=yes")
        }

        setShowShareModal(false)
        setSelectedSocialNetwork("")
        setCustomMessage("")
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(productUrl)
            setLinkCopied(true)
            setTimeout(() => setLinkCopied(false), 2000)
        } catch (err) {
            console.error("Error al copiar enlace:", err)
        }
    }


    return (
        <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
            <DialogContent className="max-w-md" style={{ backgroundColor: "#C3BBC9" }}>
                <DialogHeader>
                    <DialogTitle style={{ color: "#3B234A" }} className="flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Compartir Hotel
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">

                    <div className="border-2 rounded-lg p-4" style={{ borderColor: "#BAAFC4", backgroundColor: "white" }}>
                        <div className="flex gap-3">
                            <img
                                src={defaultShareContent.image || "/placeholder.svg"}
                                alt={defaultShareContent.title}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate" style={{ color: "#3B234A" }}>
                                    {defaultShareContent.title}
                                </h4>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{defaultShareContent.description}</p>
                                <p className="text-xs mt-2" style={{ color: "#523961" }}>
                                    {productUrl}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="custom-message" className="text-sm font-medium" style={{ color: "#523961" }}>
                            Mensaje personalizado:
                        </Label>
                        <Textarea
                            id="custom-message"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Agrega tu mensaje personalizado..."
                            className="mt-2 border-2 focus:ring-0"
                            style={{
                                borderColor: "#BAAFC4",
                                backgroundColor: "white",
                                color: colorsAux.darkprimary
                            }}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium" style={{ color: "#523961" }}>
                            Compartir en:
                        </Label>
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            {socialNetworks.map((network) => {
                                const IconComponent = network.icon
                                return (
                                    <Button
                                        key={network.id}
                                        onClick={() => handleShareToSocial(network.id)}
                                        variant="outline"
                                        className="flex items-center justify-start gap-3 p-3 border-2 hover:bg-opacity-10 bg-transparent"
                                        style={{
                                            borderColor: network.color,
                                            color: network.color,
                                        }}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        <span>Compartir en {network.name}</span>
                                    </Button>
                                )
                            })}
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm font-medium" style={{ color: "#523961" }}>
                            O copia el enlace:
                        </Label>
                        <div className="flex gap-2 mt-2">
                            <Input
                                value={productUrl}
                                readOnly
                                className="flex-1 border-2 focus:ring-0"
                                style={{
                                    borderColor: "#BAAFC4",
                                    backgroundColor: "white",
                                    color: colorsAux.darkprimary
                                }}
                            />
                            <Button
                                onClick={handleCopyLink}
                                variant="outline"
                                className="border-2 hover:bg-opacity-10 bg-transparent"
                                style={{
                                    borderColor: "#523961",
                                    color: "#523961",
                                }}
                            >
                                {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                        {linkCopied && (
                            <p className="text-xs mt-1" style={{ color: "#059669" }}>
                                ✓ Enlace copiado al portapapeles
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default HotelShare