import { colorsAux } from "@/styles/colorsAux";
import {
    WifiIcon,
    ParkingCircleIcon,
    UtensilsIcon,
    DumbbellIcon,
    BathIcon,
    WashingMachineIcon
} from "lucide-react";


interface BadgeListFromJsonProps {
    features: Record<string, string>;
}

export const stringToIconMap: Record<string, JSX.Element> = {
    Wifi: <WifiIcon size={16} />,
    Estacionamiento: <ParkingCircleIcon size={16} />,
    Desayuno: <UtensilsIcon size={16} />,
    Restaurante: <UtensilsIcon size={16} />,
    Gimnasio: <DumbbellIcon size={16} />,
    Piscina: <BathIcon size={16} />,
    Lavanderia: <WashingMachineIcon size={16} />,
};

export const stringToIconMapToDetails: Record<string, LucideIcon> = {
    Wifi: WifiIcon,
    Estacionamiento: ParkingCircleIcon,
    Desayuno: UtensilsIcon,
    Restaurante: UtensilsIcon,
    Gimnasio: DumbbellIcon,
    Piscina: BathIcon,
    Lavanderia: WashingMachineIcon,
};


export const BadgeListFromJson = ({ features }: BadgeListFromJsonProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {
                features.map((feature, index) => {
                    return (
                        <div
                            style={{ backgroundColor: colorsAux.lighter, color: colorsAux.primary }}
                            key={index}
                            className="flex items-center gap-1 px-3 py-1 rounded-full shadow-sm"
                        >
                            {stringToIconMap[feature] || <WifiIcon size={16} />}
                            <span className="text-sm">{feature}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export const BadgeListFromJsonBigger = ({ features }: BadgeListFromJsonProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => {
                const IconComponent = stringToIconMapToDetails[feature];

                return (
                    <div key={index} className="flex items-center gap-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: "#BAAFC4" }}>
                            {IconComponent ? (
                                <IconComponent className="w-5 h-5" style={{ color: "#3B234A" }} />
                            ) : (
                                <WifiIcon className="w-5 h-5" style={{ color: "#3B234A" }} />
                            )}
                        </div>
                        <span className="text-sm font-medium" style={{ color: "#523961" }}>
                            {feature}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}