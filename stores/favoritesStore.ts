
import favoriteApi from "@/services/favorite/favorite.service"
import { Hotel } from "@/types"
import { toast } from "sonner"
import { create } from "zustand"

type FavoritesState = {
  favoriteHotelIds: number[]
  favoriteHotels: FavoriteDto[]
  loading: boolean
  fetchFavorites: (userId: number) => Promise<void>
  toggleFavorite: (userId: number, hotelId: number) => Promise<void>
  isFavorite: (hotelId: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteHotelIds: [],
  favoriteHotels: [],
  loading: false,

  fetchFavorites: async (userId) => {
    set({ loading: true })

    try {
      const res = await favoriteApi.getFavorites(userId);
      set({ favoriteHotelIds: res.ids })
      set({ favoriteHotels: res.hotels })

    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  toggleFavorite: async (userId, hotelId) => {
    const { favoriteHotelIds, favoriteHotels } = get()
    const isFav = favoriteHotelIds.includes(hotelId)

    try {
      const method = isFav ? "DELETE" : "POST"
      const res = isFav ? await favoriteApi.deleteFavorite(userId, hotelId) : await favoriteApi.createFavorite(userId, hotelId)

      set({
        favoriteHotelIds: isFav
          ? favoriteHotelIds.filter((id) => id !== hotelId)
          : [...favoriteHotelIds, hotelId],
        favoriteHotels: favoriteHotels.filter((hotel) => hotel.id !== hotelId)
      })

    } catch (error) {
      console.error("Error toggling favorite", error)
    }
  },

  isFavorite: (hotelId) => get().favoriteHotelIds.includes(hotelId),
}))
