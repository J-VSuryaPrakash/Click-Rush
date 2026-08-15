interface LiveScoreProps {
    liveScore: number;
}

function LiveScore({ liveScore }: LiveScoreProps) {
    return (
        <div className="
            w-full
            rounded-xl
            border border-cyan-500/20
            bg-slate-950
            p-4
        ">

            {/* Header */}
            <div className="flex justify-center border-b border-slate-800 pb-3">
                <span className="
                    text-xs
                    font-bold
                    tracking-[0.2em]
                    text-cyan-400
                ">
                    LIVE SCORE
                </span>
            </div>

            {/* Score */}
            <div className="flex items-center justify-center pt-4">
                <p className="
                    text-4xl
                    font-black
                    tracking-tight
                    text-cyan-400
                ">
                    {liveScore}
                </p>
            </div>

        </div>
    );
}

export default LiveScore;