import httpExternalApi from "../http/httpExternal.service";

class CategorieAPI {
    getCategories = async () => httpExternalApi.httpGet("/category");
}

const categorieAPI = new CategorieAPI();
export default categorieAPI;