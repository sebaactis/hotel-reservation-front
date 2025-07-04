import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Hotel {
    id: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    price: number;
    features: { name: string; icon: JSX.Element }[];
    discount?: number;
    score: number;
}