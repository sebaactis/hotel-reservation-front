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
  score: number;
  phone: number;
  email: string;
  category: string;
}

export interface Categorie {
  id: number;
  description: string;
  hotels: Hotel[];
}