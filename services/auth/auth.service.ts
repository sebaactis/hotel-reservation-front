import { httpGet } from "@/lib/http/http.service";
import httpInternalApi from "@/lib/http/httpInternal.service";

class AuthAPI {
    getMe = async () => httpInternalApi.httpGet("/auth/me")
}

const authApi = new AuthAPI();
export default authApi;