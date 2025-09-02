import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class FeatureAPI {
    getFeatures = async () => httpExternalApi.httpGet("/feature");
    createFeature = async (featureData: { name: string, icon: string }) => httpInternalApi.httpPost("/feature", undefined, "include", featureData);
    editFeature = async (featureData: { name: string, icon: string }, featureId: number) => httpInternalApi.httpPut(`/feature/${featureId}`, undefined, "include", featureData)
    deleteFeature = async (featureId: number) => httpInternalApi.httpDelete(`/feature/${featureId}`, undefined, "include")
}

const featureAPI = new FeatureAPI();
export default featureAPI;