import { storeBatchScore } from "@/api/game.api";
import { throttle } from "@/utils/throttle";
import { memo } from "react";
import { useRef } from "react";

interface ArenaProps {
    gameId: string;
    gameStatus: string;
    setLiveScore: React.Dispatch<React.SetStateAction<number>>;
}

function Arena({
    gameId,
    gameStatus,
    setLiveScore,
}: ArenaProps) {

    const lastClickTime = useRef<number | null>(null);
    const batchIntervals = useRef<number[]>([]);

    const sendBatchScore = throttle(() => {
        const intervals = batchIntervals.current;

        batchIntervals.current = [];

        if (intervals.length === 0) return;

        storeBatchScore(gameId!, intervals);
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

    return (
        <div className="h-full w-full">
            <div
                onClick={handleClick}
                className={`
                    flex
                    h-full
                    w-full
                    select-none
                    items-center
                    justify-center
                    rounded-2xl
                    border-2
                    border-dashed
                    bg-slate-900
                    shadow-2xl
                    transition-all
                    ${gameStatus === "playing"
                        ? `
                                cursor-pointer
                                border-violet-500/50
                                hover:border-violet-400
                                hover:bg-slate-800
                              `
                        : `
                                cursor-not-allowed
                                border-slate-700
                              `
                    }
                `}
            >
                {gameStatus !== "playing" && (
                    <div className="text-center">
                        <p className="text-sm font-semibold text-slate-500">
                            Press Start to play
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                            Click as fast as you can
                        </p>
                    </div>
                )}

                {gameStatus === "playing" && (
                    <p className="select-none text-sm font-semibold tracking-wider text-violet-400/50">
                        CLICK!
                    </p>
                )}
            </div>
        </div>
    );
}

export default memo(Arena);