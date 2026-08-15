import { memo } from "react";

interface HighScoreProps {
    highScore: number;
}

function HighScore({ highScore }: HighScoreProps) {
    return (
        <div className="
            flex
            w-full
            flex-col
            rounded-xl
            border border-violet-500/20
            bg-slate-950
            px-4
            py-3
        ">

            <span className="
                border-b
                border-slate-800
                pb-2
                text-xs
                text-center
                font-bold
                tracking-[0.2em]
                text-violet-400
            ">
                HIGH SCORE
            </span>

            <span className="
                mt-2
                text-center
                text-3xl
                font-black
                text-violet-400
            ">
                {highScore}
            </span>

        </div>
    );
}

export default memo(HighScore);