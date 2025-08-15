import { HttpBaseAPI } from "./http.service";

const API_URL = "http://localhost:3000/api"

class HttpInternalAPI extends HttpBaseAPI {
    constructor() {
        super(API_URL);
    }

}

const httpInternalApi = new HttpInternalAPI();
export default httpInternalApi;