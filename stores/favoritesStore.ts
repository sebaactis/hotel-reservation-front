// stores/favoritesStore.ts
import { Hotel } from "@/types"
import { create } from "zustand"

type FavoriteDto = {
  id: number
  hotel: Hotel
  userId: number
  createdAt: string;
}

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
      const res = await fetch(`http://localhost:8080/api/v1/favorite/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      const json = await res.json()

      if (res.ok) {
        const ids = json.entity.map((fav: FavoriteDto) => fav.hotelDto.id)
        const hotels = json.entity.map((fav: FavoriteDto) => fav.hotelDto)
        set({ favoriteHotelIds: ids })
        set({ favoriteHotels: hotels })
      }
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      set({ loading: false })
    }
  },

  toggleFavorite: async (userId, hotelId) => {
    const { favoriteHotelIds, favoriteHotels } = get()
    const isFav = favoriteHotelIds.includes(hotelId)

    try {
      const method = isFav ? "DELETE" : "POST"
      const res = await fetch(`http://localhost:8080/api/v1/favorite/${userId}/${hotelId}`, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.ok) {
        set({
          favoriteHotelIds: isFav
            ? favoriteHotelIds.filter((id) => id !== hotelId)
            : [...favoriteHotelIds, hotelId],
          favoriteHotels: favoriteHotels.filter((hotel) => hotel.id !== hotelId)
        })
      } else {
        const err = await res.json()
        console.error(err.message)
      }
    } catch (error) {
      console.error("Error toggling favorite", error)
    }
  },

  isFavorite: (hotelId) => get().favoriteHotelIds.includes(hotelId),
}))
