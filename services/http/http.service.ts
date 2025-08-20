export class HttpBaseAPI {
    protected api_url: string;

    constructor(api_url: string) {
        this.api_url = api_url;
    }

    httpGet = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            credentials: credentialsInclude === "include" ? "include" : "omit"
        });

        const response = await res.json();

        if (!res.ok) {
            throw new Error(response.message);
        }

        return response;
    }

    httpPost = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string, body: unknown): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: credentialsInclude,
            body: JSON.stringify(body)
        });

        const response = await res.json();

        if (!res.ok) {
            throw new Error(response.message);
        }

        return response;
    }

    httpPut = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string, body: unknown): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: credentialsInclude,
            body: JSON.stringify(body)
        });

        const response = await res.json();

        if (!res.ok) {
            throw new Error(response.message);
        }

        return response;
    }

    httpDelete = async <T>(endpoint: string, params?: URLSearchParams, credentialsInclude?: string, body: unknown): Promise<T> => {
        const res = await fetch(`${this.api_url}${endpoint}${params ? `?${params}` : ''}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: credentialsInclude,
            body: JSON.stringify(body)
        });

        const response = await res.json();

        if (!res.ok) {
            throw new Error(response.message);
        }

        return response;
    }

}


