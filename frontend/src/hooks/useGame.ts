import { saveGame } from "@/api/game.api";
import type { SaveGame } from "@/features/game/schema/game.schem";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useGame = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SaveGame) => saveGame(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"],
            });

            queryClient.invalidateQueries({
                queryKey: ["ranks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["leaderboard"],
            });

            queryClient.invalidateQueries({
                queryKey: ["auth", "me"],
            });
        },
    });
};
