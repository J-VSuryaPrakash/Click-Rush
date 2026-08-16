import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, RotateCcw, Trophy } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import Arena from "./Arena";
import Timer from "./Timer";
import HighScore from "./HighScore";
import LiveScore from "./LiveScore";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/api/auth.api";
import GameResultModal from "./GameResultModal";
import { useStartGame, useCompleteGame } from "@/hooks/useGame";

type Status = "idle" | "starting" | "playing" | "finished" | "completing" | "completed" | "error";

function Game() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["auth", "me"],
        queryFn: getCurrentUser,
    });

    const [gameStatus, setGameStatus] = useState<Status>("idle");
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [liveScore, setLiveScore] = useState<number>(0);
    const [activeGameId, setActiveGameId] = useState<string | null>(null);
    const [isCompleting, setIsCompleting] = useState(false);

    const navigate = useNavigate();

    const startMutation = useStartGame();
    const completeMutation = useCompleteGame();

    // When countdown reaches zero, mark locally finished (do NOT call server)
    useEffect(() => {
        if (gameStatus !== "playing") return;
        if (timeLeft <= 0) {
            setGameStatus("finished");
        }
    }, [timeLeft, gameStatus]);

    const handleStart = () => {
        setGameStatus("starting");
        setLiveScore(0);
        startMutation.mutate(undefined, {
            onSuccess(data) {
                setActiveGameId(data.gameId);
                const remaining = Math.max(0, Math.ceil((new Date(data.expiresAt).getTime() - Date.now()) / 1000));
                setTimeLeft(remaining);
                setGameStatus("playing");
            },
            onError() {
                setGameStatus("error");
            },
        });
    };

    const handleComplete = () => {
        if (!activeGameId || isCompleting) return;
        setIsCompleting(true);
        setGameStatus("completing");
        completeMutation.mutate({ gameId: activeGameId, score: liveScore }, {
            onSuccess() {
                // on success, reset local game state and return to idle
                resetGame();
            },
            onError() {
                // keep modal open and allow retry
                setGameStatus("finished");
                setIsCompleting(false);
            },
        });
    };

    const handleCancel = () => {
        resetGame();
    };

    const resetGame = () => {
        setLiveScore(0);
        setTimeLeft(60);
        setActiveGameId(null);
        setIsCompleting(false);
        setGameStatus("idle");
    };

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-slate-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden bg-slate-950">
            <div className="flex w-full flex-1 overflow-hidden">
                <div className="hidden lg:block lg:w-[15%]" />
                <main className="h-full w-full overflow-hidden px-4 py-5 sm:px-6 lg:w-[70%]">
                    {(gameStatus === "finished" || gameStatus === "completing") && (
                        <GameResultModal
                            score={liveScore}
                            highScore={user?.data.bestScore ?? 0}
                            isNewHighScore={liveScore > (user?.data.bestScore ?? 0)}
                            onSave={handleComplete}
                            onCancel={handleCancel}
                            isSaving={completeMutation.isPending || isCompleting}
                        />
                    )}

                    <div className="flex h-full w-full flex-col gap-5">
                        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-5">
                            <div className="order-2 min-h-[320px] lg:order-1 lg:col-span-4 lg:min-h-0">
                                <Arena gameStatus={gameStatus} setLiveScore={setLiveScore} />
                            </div>

                            <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-1">
                                <div className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-xl lg:flex-col lg:items-stretch lg:justify-around">
                                    <div className="hidden w-full lg:block">
                                        <HighScore highScore={user?.data.bestScore ?? 0} />
                                    </div>

                                    <div className="w-full flex-1 lg:flex-none">
                                        <LiveScore liveScore={liveScore} />
                                    </div>

                                    <div className="w-full flex-1 lg:flex-none">
                                        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} gameStatus={gameStatus} />
                                    </div>
                                </div>

                                <Button variant="outline" className="h-12 w-full rounded-xl" onClick={() => navigate({ to: "/leaderboard" })}>
                                    <Trophy className="mr-2 h-4 w-4" /> Leaderboard
                                </Button>
                            </div>
                        </div>

                        <div className="flex shrink-0 justify-center pb-1">
                            {gameStatus !== "playing" && (
                                <Button size="lg" className="h-12 w-full rounded-xl bg-violet-600 px-8 text-base font-black text-white sm:w-48" onClick={handleStart}>
                                    <Play className="mr-2 h-4 w-4 fill-current" /> Start Game
                                </Button>
                            )}

                            {gameStatus === "playing" && (
                                <Button size="lg" variant="outline" className="h-12 w-full rounded-xl sm:w-48" onClick={resetGame}>
                                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Game
                                </Button>
                            )}
                        </div>
                    </div>
                </main>
                <div className="hidden lg:block lg:w-[15%]" />
            </div>
        </div>
    );
}

export default Game;
