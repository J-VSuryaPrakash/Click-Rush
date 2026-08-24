import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api: AxiosInstance = axios.create({
    headers: {
        "Content-Type": 'application/json'
    },
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, async (errors) => {
    const originalRequest = errors.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const isAuthRequest =
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/register") ||
        originalRequest.url?.includes("/auth/tokenrefresh");
        
    if (
        errors.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthRequest
    ) {
        originalRequest._retry = true;
        try {
            await api.post('/auth/tokenrefresh');
            return api(originalRequest);
        } catch (refreshError) {
            window.location.href = `${window.location.origin}/login`;
            return Promise.reject(refreshError);
        }
    }

    return Promise.reject(errors);
})