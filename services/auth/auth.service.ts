import { httpGet } from "@/lib/http/http.service";
import httpInternalApi from "@/lib/http/httpInternal.service";

class AuthAPI {
    login = async (email: string, password: string) => httpInternalApi.httpPost("/auth/login", undefined, undefined, body: { email, password })
    logout = async () => 
    getMe = async () => httpInternalApi.httpGet("/auth/me", undefined, "include")
}

const authApi = new AuthAPI();
export default authApi;