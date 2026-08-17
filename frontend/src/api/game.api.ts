import type { ApiResponse } from "@/types/ApiResponse.type";
import { api } from "./api";

export const startGame = async () => {
    const response = await api.post<ApiResponse<{ gameId: string; startedAt: string; expiresAt: string }>>('/game/games/start');
    return response.data.data;
}

export const completeGame = async (gameId: string, data: { score: number }) => {
    const response = await api.post<ApiResponse<any>>(`/game/games/${gameId}/complete`, data);
    return response.data.data;
}

export const abandonGame = async (gameId: string) => {
    const response = await api.post<ApiResponse<any>>(`/game/games/${gameId}/abandon`);
    return response.data.data;
}
