import {memo} from "react";

interface ArenaProps {
    gameStatus: string;
    setLiveScore: React.Dispatch<React.SetStateAction<number>>;
}

function Arena({
    gameStatus,
    setLiveScore,
}: ArenaProps) {

    const handleClick = () => {
        if (gameStatus !== "playing") return;

        setLiveScore((prev) => prev + 1);
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