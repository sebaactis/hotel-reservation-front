import { toast } from "sonner";
import { API_PUBLIC_URL } from "./urls";

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

        if (!res.ok && endpoint != "/auth/me") {
            toast.error(this.api_url == API_PUBLIC_URL ? response.message : response.error)
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
            toast.error(this.api_url == API_PUBLIC_URL ? response.message : response.error)
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
            toast.error(this.api_url == API_PUBLIC_URL ? response.message : response.error)
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
            toast.error(this.api_url == API_PUBLIC_URL ? response.message : response.error)
        }

        return response;
    }

}


