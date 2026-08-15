import type { ApiResponse } from "@/types/ApiResponse.type";
import { api } from "./api";

interface History {

    avgClick: number,
    numOfGames: number,
    gameHistory: []

}

interface Ranks{
    globalRank: {rank: number, score: number}[],
    dailyRank: {rank: number, score: number}[],
    weeklyRank: {rank: number, score: number}[]
}

export const getProfile = async () => {

    const response = await api.get<ApiResponse<History>>('/user/history');
    return response.data.data;
}


export const getRanks = async () => {
    const response = await api.get<ApiResponse<Ranks>>('/user/ranks');

    return response.data.data
}