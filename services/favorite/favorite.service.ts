import httpInternalApi from "../http/httpInternal.service";

class FavoriteAPI {
    getFavorites = async (userId: number) => httpInternalApi.httpGet(`/favorite/${userId}`, undefined, "include");
    createFavorite = async (userId: number, hotelId: number) => httpInternalApi.httpPost(`/favorite/${userId}/${hotelId}`, undefined, "include");
    deleteFavorite = async (userId: number, hotelId: number) => httpInternalApi.httpDelete(`/favorite/${userId}/${hotelId}`, undefined, "include");
}

const favoriteApi = new FavoriteAPI();
export default favoriteApi;