import type { LoginFormData, RegisterFormData } from "@/features/auth/schemas/auth.schema";
import { api } from "./api";
import type { ApiResponse } from "@/types/ApiResponse.type";


interface User {
    id: string,
    name: string,
    bestScore: number,
    bestScoreAt: string,
    email: string
}

export const registerUser = async (data: RegisterFormData) => {

    const response = await api.post('/auth/register', data);

    return response.data
}

export const loginUser = async (data: LoginFormData) => {

    const response = await api.post<ApiResponse<User>>('/auth/login', data);

    return response.data;
}

export const logoutUser = async () => {
    await api.post('/auth/logout')
}

export const getCurrentUser = async () => {

    const response = await api.get<ApiResponse<User>>("/auth/me");

    return response.data;
};