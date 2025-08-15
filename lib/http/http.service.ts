export class HttpBaseAPI {
    protected api_url: string;

    constructor(api_url: string) {
        this.api_url = api_url;
    }

    httpGet = async <T>(endpoint: string, params?: URLSearchParams): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();
    }

}


