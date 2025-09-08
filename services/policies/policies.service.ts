import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class PolicieAPI {
    getPoliciesByHotelId = async (hotelId: number) => httpExternalApi.httpGet(`/hotelPolicy/${hotelId}`)
    createPolicy = async (hotelId: number, policyData: { title: string, description: string }) => httpInternalApi.httpPost(`/policy/${hotelId}`, undefined, "include", policyData)
    editPolicy = async (hotelId: number, policyData: { title: string, description: string }) => httpInternalApi.httpPut(`/policy/${hotelId}`, undefined, "include", policyData)
    deletePolicy = async (hotelId: number, policyData: { title: string, description: string }) => httpInternalApi.httpDelete(`/policy/${hotelId}`, undefined, "include")

}

const policyAPI = new PolicieAPI();
export default policyAPI;