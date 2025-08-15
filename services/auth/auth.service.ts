import { httpGet } from "@/services/http/http.service";
import httpExternalApi from "@/services/http/httpExternal.service";
import httpInternalApi from "@/services/http/httpInternal.service";
import { RegisterData } from "@/types";

class AuthAPI {
    register = async (registerData: RegisterData) => httpInternalApi.httpPost("/auth/register", undefined, undefined, registerData)
    login = async (email: string, password: string) => httpInternalApi.httpPost("/auth/login", undefined, undefined, { email, password })
    logout = async () => httpInternalApi.httpPost("/auth/logout", undefined, "include")
    getMe = async () => httpInternalApi.httpGet("/auth/me", undefined, "include")
}

const authApi = new AuthAPI();
export default authApi;