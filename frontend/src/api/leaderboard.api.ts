import type { ApiResponse } from "@/types/ApiResponse.type";
import { api } from "./api";

export interface Leader{
    id: string,
    username: string,
    score: number,
    rank: number
}


export const getAllDailyLeaders = async() => {
    const response = await api.get<ApiResponse<Leader[]>>('/daily/dailyleaders');
    return response.data.data;
} 

export const getAllWeeklyLeaders = async() => {
    const response = await api.get<ApiResponse<Leader[]>>('/weekly/weeklyleaders');
    return response.data.data;
}

export const getAllGlobalLeaders = async() => {
    const response = await api.get<ApiResponse<Leader[]>>('/global/globaleaders');
    return response.data.data;
}