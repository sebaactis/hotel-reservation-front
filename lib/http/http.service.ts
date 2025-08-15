export class HttpBaseAPI {
    protected api_url: string;

    constructor(api_url: string) {
        this.api_url = api_url;
    }

    httpGet = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            credentials: credentialsInclude === "include" ? "include" : "omit"
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();
    }

    httpPost = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string, body: unknown): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: credentialsInclude,
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return res.json();
    }

}


