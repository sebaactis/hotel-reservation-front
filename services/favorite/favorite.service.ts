import httpInternalApi from "../http/httpInternal.service";

class FavoriteAPI {
    getFavorites = async (userId: number) => httpInternalApi.httpGet(`/favorite/${userId}`, undefined, "include");
}

const favoriteApi = new FavoriteAPI();
export default favoriteApi;