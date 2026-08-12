import type { LoginFormData, RegisterFormData } from "@/features/auth/schemas/auth.schema";
import { api } from "./api";
import type { ApiResponse } from "@/types/ApiResponse.type";


interface User {
    id: string,
    name: string,
    score: number,
    email: string
}

export const registerUser = async (data: RegisterFormData) => {

    const response = await api.post('/auth/register', data);
    
    return response.data

}

export const loginUser = async (data: LoginFormData) => {
    try {
        const response = await api.post<ApiResponse<User>>('/auth/login', data);
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const logoutUser = async () => {
    await api.post('/auth/logout')
}

