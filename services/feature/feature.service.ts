import httpExternalApi from "../http/httpExternal.service";
import httpInternalApi from "../http/httpInternal.service";

class FeatureAPI {
    getFeatures = async () => httpExternalApi.httpGet("/feature");
    createFeature = async (featureData: { name: string, icon: string }) => httpInternalApi.httpPost("/feature", undefined, "include", featureData);
}

const featureAPI = new FeatureAPI();
export default featureAPI;