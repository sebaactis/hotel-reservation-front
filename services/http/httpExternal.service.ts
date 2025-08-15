import { HttpBaseAPI } from "./http.service";

const API_URL = "http://localhost:8080/api/v1"

class HttpExternalAPI extends HttpBaseAPI {
    constructor() {
        super(API_URL);
    }

}

const httpExternalApi = new HttpExternalAPI();
export default httpExternalApi;