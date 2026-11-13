import { storeBatchScore } from "@/api/game.api";
import { throttle } from "@/utils/throttle";
import { memo } from "react";
import { useRef } from "react";

// Sends one batch and reports whether it landed and how long the round trip took.
const sendTimedBatch = (
    gameId: string,
    intervals: number[],
    onResult?: (ok: boolean, ms: number) => void,
) => {
    const sentAt = performance.now();

    storeBatchScore(gameId, intervals)
        .then(() => onResult?.(true, Math.round(performance.now() - sentAt)))
        .catch(() => onResult?.(false, 0));
};

interface ArenaProps {
    gameId: string;
    gameStatus: string;
    setLiveScore: React.Dispatch<React.SetStateAction<number>>;
    // Optional: reports each score sync (ok, round-trip ms). Display only.
    onBatchResult?: (ok: boolean, ms: number) => void;
}

function Arena({
    gameId,
    gameStatus,
    setLiveScore,
    onBatchResult,
}: ArenaProps) {

    const lastClickTime = useRef<number | null>(null);
    const batchIntervals = useRef<number[]>([]);

    const sendBatchScore = throttle(() => {
        const intervals = batchIntervals.current;

        batchIntervals.current = [];

        if (intervals.length === 0) return;

        sendTimedBatch(gameId!, intervals, onBatchResult);
    }, 500);


    const handleClick = () => {
        if (gameStatus !== "playing") return;

        const now = performance.now();

        if (lastClickTime.current !== null) {
            const interval = now - lastClickTime.current;

            batchIntervals.current.push(Number(Math.ceil(interval)));
        }

        lastClickTime.current = now;

        setLiveScore((prev) => prev + 1);

        sendBatchScore();
    };

    const isPlaying = gameStatus === "playing";

    return (
        <div
            onClick={handleClick}
            className={`group flex h-full min-h-[320px] w-full touch-manipulation select-none items-center justify-center bg-rush-panel ${
                isPlaying ? "cursor-pointer" : "cursor-not-allowed"
            }`}
        >
            <div
                className={`flex size-52 items-center justify-center rounded-full sm:size-60 ${
                    isPlaying
                        ? "bg-rush-accent text-rush-accent-ink transition-transform duration-75 ease-out group-hover:bg-rush-accent-hover group-active:scale-[0.96] group-active:bg-rush-accent-press motion-reduce:transition-none motion-reduce:group-active:scale-100"
                        : "border border-rush-rule text-rush-muted"
                }`}
            >
                {isPlaying ? (
                    <span className="text-2xl font-semibold tracking-[-0.02em]">
                        Click
                    </span>
                ) : (
                    <span className="px-6 text-center">
                        <span className="block text-base font-medium text-rush-ink">
                            Press Start to play
                        </span>
                        <span className="mt-1 block text-sm text-rush-muted">
                            Click as fast as you can
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}

export default memo(Arena);
