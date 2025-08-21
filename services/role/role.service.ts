import httpInternalApi from "../http/httpInternal.service";

class RoleAPI {
    getUsersRole = async () => httpInternalApi.httpGet("/role", undefined, "include")
    editUserRole = async (userUpdate: { email: string, role: string }) => httpInternalApi.httpPost("/role", undefined, "include", userUpdate)
}

const roleApi = new RoleAPI();
export default roleApi;

