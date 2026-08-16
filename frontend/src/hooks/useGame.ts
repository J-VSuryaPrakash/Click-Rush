import { startGame, completeGame } from "@/api/game.api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useStartGame = () => {
    return useMutation({
        mutationFn: () => startGame(),
    });
};

export const useCompleteGame = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ gameId, score }: { gameId: string; score: number }) => completeGame(gameId, { score }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["ranks"] });
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        },
    });
};
