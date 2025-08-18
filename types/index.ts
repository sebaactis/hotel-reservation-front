import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Policy {
  id: number;
  title: string;
  description: string;
}
export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  features: { name: string; icon: JSX.Element }[];
  policies: Policy[];
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

export interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginResponse {
  user: {
    email: string;
    userId: number;
    name: string;
    lastName: string;
    role: string;
  };
  authenticated: boolean;

}

export type FavoriteDto = {
  id: number
  hotel: Hotel
  userId: number
  createdAt: string;
}

export type BookingDto = {
  hotelId: number;
  userId: number;
  bookedFrom: string;
  bookedTo: string;
  guests: number;
  totalPrice: number;
  nights: number;
}