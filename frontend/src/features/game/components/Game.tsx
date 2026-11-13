import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Play, RotateCcw } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import Arena from "./Arena";
import Timer from "./Timer";
import HighScore from "./HighScore";
import LiveScore from "./LiveScore";
import StatCell from "./StatCell";
import StatusPill, { type StatusTone } from "./StatusPill";
import LiveLeaderboard from "./LiveLeaderboard";
import GameResultModal from "./GameResultModal";
import { useGame } from "@/hooks/useGame";
import Loading from "@/components/Loading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { MAX_AVERAGE_CPS, PACE_WARNING_CPS } from "../limits";

type Status = "idle" | "starting" | "playing" | "finished" | "completing" | "completed" | "error";

// Browser online/offline, read without re-rendering on every click.
const subscribeOnline = (cb: () => void) => {
    window.addEventListener("online", cb);
    window.addEventListener("offline", cb);
    return () => {
        window.removeEventListener("online", cb);
        window.removeEventListener("offline", cb);
    };
};
const getOnline = () => navigator.onLine;

const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rush-ink";

function Game() {
    const { user, isLoading } = useCurrentUser();
    const [gameStatus, setGameStatus] = useState<Status>("idle");
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [liveScore, setLiveScore] = useState<number>(0);
    const [activeGameId, setActiveGameId] = useState<string | null>(null);
    const [isCompleting, setIsCompleting] = useState(false);

    // Display-only telemetry
    const [latencyMs, setLatencyMs] = useState<number | null>(null);
    const [syncFailed, setSyncFailed] = useState(false);
    const [roundLength, setRoundLength] = useState<number>(60);
    const isOnline = useSyncExternalStore(subscribeOnline, getOnline, () => true);

    const navigate = useNavigate();

    const { startGame: startMutation, completeGame: completeMutation, abandonGame: abandonMutation } = useGame();

    // When countdown reaches zero, mark locally finished (do NOT call server)
    useEffect(() => {
        if (gameStatus !== "playing") return;
        if (timeLeft <= 0) {
            setGameStatus("finished");
        }
    }, [timeLeft, gameStatus]);

    const handleBatchResult = useCallback((ok: boolean, ms: number) => {
        setSyncFailed(!ok);
        if (ok) setLatencyMs(ms);
    }, []);

    const handleStart = () => {
        setGameStatus("starting");
        setLiveScore(0);
        setSyncFailed(false);
        setLatencyMs(null);
        startMutation.mutate(undefined, {
            onSuccess(data) {
                setActiveGameId(data.gameId);
                const remaining = Math.max(0, Math.ceil((new Date(data.expiresAt).getTime() - Date.now()) / 1000));
                setRoundLength(remaining);
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
        if (activeGameId) {
            abandonMutation.mutate(activeGameId, {
                onSuccess: () => {
                    setLiveScore(0);
                    setTimeLeft(60);
                    setActiveGameId(null);
                    setIsCompleting(false);
                    setGameStatus("idle");
                }
            });
        }
    };

    const openLeaderboard = useCallback(() => navigate({ to: "/leaderboard" }), [navigate]);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    // Derived telemetry
    const bestScore = user?.data.bestScore ?? 0;
    const isPlaying = gameStatus === "playing";
    const elapsed = isPlaying ? roundLength - timeLeft : 0;
    const clickRate = elapsed > 0 ? liveScore / elapsed : 0;
    const paceKnown = isPlaying && elapsed >= 2;
    const overPace = paceKnown && clickRate > MAX_AVERAGE_CPS;
    const nearPace = paceKnown && !overPace && clickRate > PACE_WARNING_CPS;
    const gapToBest = bestScore - liveScore;

    const saveError =
        gameStatus === "finished" && completeMutation.error instanceof AxiosError
            ? completeMutation.error.response?.data?.error?.message ?? "Couldn't save this round."
            : undefined;

    let status: { label: string; detail?: string; tone: StatusTone };
    if (!isOnline) {
        status = { label: "Offline", tone: "alert" };
    } else if (gameStatus === "starting") {
        status = { label: "Connecting", tone: "neutral" };
    } else if (gameStatus === "error") {
        status = { label: "Couldn't start round", tone: "alert" };
    } else if (isPlaying && syncFailed) {
        status = { label: "Sync failed", tone: "alert" };
    } else if (overPace) {
        status = { label: "Over pace limit", detail: `${MAX_AVERAGE_CPS}/s max`, tone: "alert" };
    } else if (nearPace) {
        status = { label: "Near pace limit", detail: `${MAX_AVERAGE_CPS}/s max`, tone: "live" };
    } else if (isPlaying) {
        status = { label: "Live", detail: latencyMs !== null ? `${latencyMs} ms` : undefined, tone: "live" };
    } else if (gameStatus === "completing") {
        status = { label: "Saving", tone: "neutral" };
    } else if (gameStatus === "finished") {
        status = saveError ? { label: "Not saved", tone: "alert" } : { label: "Round over", tone: "neutral" };
    } else {
        status = { label: "Ready", tone: "neutral" };
    }

    return (
        <div className="min-h-[calc(100dvh-4rem)] w-full bg-rush-paper text-rush-ink antialiased">
            {(gameStatus === "finished" || gameStatus === "completing") && (
                <GameResultModal
                    score={liveScore}
                    highScore={bestScore}
                    isNewHighScore={liveScore > bestScore}
                    onSave={handleComplete}
                    onCancel={handleCancel}
                    isSaving={completeMutation.isPending || isCompleting}
                    errorMessage={saveError}
                />
            )}

            <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6 lg:py-8">
                <div className="grid grid-cols-1 border border-rush-rule lg:grid-cols-[minmax(0,1fr)_340px]">

                    {/* Round */}
                    <section aria-labelledby="round-heading" className="flex min-w-0 flex-col">

                        <div className="flex h-14 items-center justify-between gap-4 border-b border-rush-rule px-5">
                            <h1 id="round-heading" className="text-base font-semibold tracking-[-0.01em]">
                                Round
                            </h1>
                            <StatusPill label={status.label} detail={status.detail} tone={status.tone} />
                        </div>

                        {/* Telemetry */}
                        <div className="grid grid-cols-2 gap-px border-b border-rush-rule bg-rush-rule sm:grid-cols-3">
                            <LiveScore liveScore={liveScore} />
                            <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} gameStatus={gameStatus} />
                            <StatCell
                                label="Click rate"
                                value={isPlaying ? clickRate.toFixed(1) : "0.0"}
                                unit="/s"
                                alert={overPace}
                            />
                            <HighScore highScore={bestScore} />
                            <StatCell
                                label={gapToBest < 0 ? "Ahead of best" : "To beat best"}
                                value={gapToBest < 0 ? `+${-gapToBest}` : gapToBest + 1}
                            />
                            <StatCell
                                label="Latency"
                                value={latencyMs !== null ? latencyMs : "—"}
                                unit={latencyMs !== null ? "ms" : undefined}
                            />
                        </div>

                        {/* Target */}
                        <div className="flex-1 border-b border-rush-rule">
                            <Arena
                                gameStatus={gameStatus}
                                setLiveScore={setLiveScore}
                                gameId={activeGameId!}
                                onBatchResult={handleBatchResult}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-rush-muted">
                                Keep your average under {MAX_AVERAGE_CPS} clicks a second.
                            </p>

                            {!isPlaying && (
                                <button
                                    type="button"
                                    onClick={handleStart}
                                    aria-busy={gameStatus === "starting" || undefined}
                                    className={`inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-rush-accent px-6 text-sm font-semibold text-rush-accent-ink transition-transform duration-75 hover:bg-rush-accent-hover active:scale-[0.98] active:bg-rush-accent-press motion-reduce:transition-none sm:w-44 ${focusRing}`}
                                >
                                    <Play aria-hidden="true" className="h-4 w-4 fill-current" />
                                    {gameStatus === "starting" ? "Starting…" : "Start Game"}
                                </button>
                            )}

                            {isPlaying && (
                                <button
                                    type="button"
                                    onClick={resetGame}
                                    className={`inline-flex h-11 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-rush-rule px-6 text-sm font-medium text-rush-ink transition-transform duration-75 hover:border-rush-muted active:scale-[0.98] motion-reduce:transition-none sm:w-44 ${focusRing}`}
                                >
                                    <RotateCcw aria-hidden="true" className="h-4 w-4" />
                                    Reset Game
                                </button>
                            )}
                        </div>
                    </section>

                    {/* Leaderboard */}
                    <aside
                        aria-label="Leaderboard"
                        className="border-t border-rush-rule lg:border-l lg:border-t-0"
                    >
                        <LiveLeaderboard currentUserId={user?.data.id} onOpenFull={openLeaderboard} />
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default Game;
