import { startGame, completeGame, abandonGame } from "@/api/game.api";
import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useGame = () => {

    const completeGameMutation = useMutation({
        mutationFn: ({ gameId, score }: { gameId: string; score: number }) => completeGame(gameId, { score }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.invalidateQueries({ queryKey: ["ranks"] });
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
        },
    });

    const startGameMutation = useMutation({
        mutationFn: () => startGame()
    })

    const abandonGameMutation = useMutation({
        mutationFn: (gameId: string) => abandonGame(gameId)
    })

    return {
        startGame: startGameMutation,
        completeGame: completeGameMutation,
        abandonGame: abandonGameMutation
    }

}
