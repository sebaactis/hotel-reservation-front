import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class CategorieAPI {
    getCategories = async () => httpExternalApi.httpGet("/category");
    createCategorie = async (categorieData: { description: string }) => httpInternalApi.httpPost("/category", undefined, "include", categorieData)
    editCategorie = async (categoryId: number, categorieData: { description: string }) => httpInternalApi.httpPut(`/category/${categoryId}`, undefined, "include", categorieData)
    deleteCategorie = async (categoryId: number) => httpInternalApi.httpDelete(`/category/${categoryId}`, undefined, "include")

}

const categorieAPI = new CategorieAPI();
export default categorieAPI;