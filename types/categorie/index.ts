export interface Categorie {
    id: number;
    description: string;
    hotels: Hotel[];
}

export type CategorieWithoutHotels = Omit<Categorie, "hotels">;


