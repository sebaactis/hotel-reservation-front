export interface RegisterData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginResponse {
    user: {
        email: string;
        userId: number;
        name: string;
        lastName: string;
        role: string;
    };
    authenticated: boolean;

}