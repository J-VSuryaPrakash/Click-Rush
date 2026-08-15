import type { ApiResponse } from "@/types/ApiResponse.type";
import { api } from "./api";
import type { SaveGame } from "@/features/game/schema/game.schem";

export const saveGame = async (data: SaveGame) => {

    const response = await api.post<ApiResponse<SaveGame>>('/game/gamescore', data)

    return response.data.data;
}