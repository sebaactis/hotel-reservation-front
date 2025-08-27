import { HttpBaseAPI } from "./http.service";
import { API_PUBLIC_URL } from "./urls";

class HttpExternalAPI extends HttpBaseAPI {
    constructor() {
        super(API_PUBLIC_URL);
    }

}

const httpExternalApi = new HttpExternalAPI();
export default httpExternalApi;