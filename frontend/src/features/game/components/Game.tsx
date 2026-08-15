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
import { useGame } from "@/hooks/useGame"

function Game() {
    const { data: user, isLoading } = useQuery({
        queryKey: ["auth", "me"],
        queryFn: getCurrentUser,
    });

    const [gameStatus, setGameStatus] = useState<"ready" | "playing" | "completed">("ready");
    const [timeLeft, setTimeLeft] = useState(60);
    const [liveScore, setLiveScore] = useState(0);
    const [gameStartedAt, setGameStartedAt] = useState<string | null>(null);
    const [gameEndedAt, setGameEndedAt] = useState<string | null>(null);

    useEffect(() => {
        if (timeLeft === 0 && gameStatus === "playing") {
            endGame();
        }
    }, [timeLeft, gameStatus]);

    const navigate = useNavigate();

    const startGame = () => {
        setTimeLeft(60);
        setLiveScore(0);
        setGameStartedAt(new Date().toISOString())
        setGameEndedAt(null)
        setGameStatus('playing');
    }

    const endGame = () => {
        setGameEndedAt(new Date().toISOString());
        setGameStatus('completed');
    }

    const saveGameMutation = useGame();
    
    const handleSave = () => {
        if (!gameStartedAt || !gameEndedAt) return;

        saveGameMutation.mutate(
            {
                score: liveScore,
                startedAt: gameStartedAt,
                endedAt: gameEndedAt,
            },
            {
                onSuccess: () => {
                    resetGame();
                },
            }
        );
    };

    const handleCancel = () => {
        resetGame();
    };

    const resetGame = () => {
        setLiveScore(0);
        setTimeLeft(60);
        setGameStartedAt(null);
        setGameEndedAt(null);
        setGameStatus('ready');
    }

    if (isLoading) {
        return (

            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm font-medium text-slate-400">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden bg-slate-950">

            {/* 15% / 70% / 15% */}
            <div className="flex w-full flex-1 overflow-hidden">

                {/* Left Empty Space */}
                <div className="hidden lg:block lg:w-[15%]" />

                {/* Main Game Area - 70% */}
                <main className="h-full w-full overflow-hidden px-4 py-5 sm:px-6 lg:w-[70%]">

                    {gameStatus === "completed" && (
                        <GameResultModal
                            score={liveScore}
                            highScore={user?.data.bestScore ?? 0}
                            isNewHighScore={liveScore > (user?.data.bestScore ?? 0)}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            isSaving={saveGameMutation.isPending}
                        />
                    )}

                    <div className="flex h-full w-full flex-col gap-5">

                        {/* Arena + Stats */}
                        <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-5">

                            {/* ARENA */}
                            <div className="order-2 min-h-[320px] lg:order-1 lg:col-span-4 lg:min-h-0">
                                <Arena
                                    gameStatus={gameStatus}
                                    setLiveScore={setLiveScore}
                                />
                            </div>

                            {/* STATS */}

                            <div className="order-1 flex flex-col gap-4 lg:order-2 lg:col-span-1">

                                {/* Stats Card */}
                                <div className="
                                    flex flex-1 items-center justify-between gap-3
                                    rounded-2xl
                                    border border-slate-800
                                    bg-slate-900
                                    p-4
                                    shadow-xl
                                    lg:flex-col
                                    lg:items-stretch
                                    lg:justify-around
                                ">

                                    {/* High Score */}
                                    <div className="hidden w-full lg:block">
                                        <HighScore
                                            highScore={user?.data.bestScore ?? 0}
                                        />
                                    </div>

                                    {/* Live Score */}
                                    <div className="w-full flex-1 lg:flex-none">
                                        <LiveScore
                                            liveScore={liveScore}
                                        />
                                    </div>

                                    {/* Timer */}
                                    <div className="w-full flex-1 lg:flex-none">
                                        <Timer
                                            timeLeft={timeLeft}
                                            setTimeLeft={setTimeLeft}
                                            gameStatus={gameStatus}
                                        />
                                    </div>

                                </div>

                                {/* Leaderboard */}
                                <Button
                                    variant="outline"
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border-amber-200
                                        bg-slate-900
                                        font-bold
                                        tracking-wide
                                        text-amber-200/80
                                        shadow-lg
                                        transition-all
                                        hover:border-violet-400
                                        hover:bg-violet-500/10
                                        hover:text-violet-300
                                    "
                                    onClick={() => navigate({ to: "/leaderboard" })}
                                >
                                    <Trophy className="mr-2 h-4 w-4" />
                                    Leaderboard
                                </Button>

                            </div>
                        </div>

                        {/* ================= GAME CONTROLS ================= */}
                        <div className="flex shrink-0 justify-center pb-1">

                            {/* Start */}
                            {gameStatus !== "playing" && (
                                <Button
                                    size="lg"
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        bg-violet-600
                                        px-8
                                        text-base
                                        font-black
                                        tracking-wide
                                        text-white
                                        shadow-lg
                                        shadow-violet-900/30
                                        transition-all
                                        hover:bg-violet-500
                                        hover:shadow-violet-500/20
                                        sm:w-48
                                    "
                                    onClick={() => (startGame())}
                                >
                                    <Play className="mr-2 h-4 w-4 fill-current" />
                                    Start Game
                                </Button>
                            )}

                            {/* Reset */}
                            {gameStatus === "playing" && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="
                                        h-12
                                        w-full
                                        rounded-xl
                                        border-rose-500/30
                                        bg-slate-900
                                        px-8
                                        text-base
                                        font-semibold
                                        text-rose-400
                                        shadow-lg
                                        transition-all
                                        hover:border-rose-400
                                        hover:bg-rose-500/10
                                        hover:text-rose-300
                                        sm:w-48
                                    "
                                    onClick={() =>
                                        setGameStatus("ready")
                                    }
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset Game
                                </Button>
                            )}

                        </div>
                    </div>
                </main>

                {/* Right Empty Space */}
                <div className="hidden lg:block lg:w-[15%]" />

            </div>
        </div>
    );
}

export default Game;