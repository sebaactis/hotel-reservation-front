import { colorsAux } from "@/styles/colorsAux";
import { Feature } from "@/types/feature";
import {
    WifiIcon,
    ParkingCircleIcon,
    UtensilsIcon,
    DumbbellIcon,
    BathIcon,
    WashingMachineIcon
} from "lucide-react";
import IconRender from "./IconRender";


interface BadgeListFromJsonProps {
    features: Feature[]
}



export const IconBagde = ({ features }: BadgeListFromJsonProps) => {



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
                            <IconRender name={feature?.icon} />
                            <span className="text-sm">{feature.name}</span>
                        </div>
                    )
                })
            }
        </div>
    );
};