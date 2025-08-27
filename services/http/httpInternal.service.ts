import { HttpBaseAPI } from "./http.service";
import { API_PRIVATE_URL } from "./urls";

class HttpInternalAPI extends HttpBaseAPI {
    constructor() {
        super(API_PRIVATE_URL);
    }

}

const httpInternalApi = new HttpInternalAPI();
export default httpInternalApi;