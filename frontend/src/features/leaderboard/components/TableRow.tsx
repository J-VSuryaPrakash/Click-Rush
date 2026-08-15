interface TableRowProps {
    rank: number;
    username: string;
    score: number;
}

function TableRow({
    rank,
    username,
    score,
}: TableRowProps) {

    const rankStyle = rank === 1 ? {
        container: "border-amber-400/40 bg-amber-400/10",
        rank: "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20",
        text: "text-amber-400",
    }
        : rank === 2 ?
            {
                container: "border-slate-400/40 bg-slate-400/10",
                rank: "bg-slate-300 text-slate-950 shadow-lg shadow-slate-300/20",
                text: "text-slate-300",
            }
            : rank === 3 ?
                {
                    container: "border-orange-700/40 bg-orange-700/10",
                    rank: "bg-orange-700 text-white shadow-lg shadow-orange-700/20",
                    text: "text-orange-500",
                } : {
                    container: "border-cyan-500/20 bg-slate-900",
                    rank: "bg-cyan-400/10 text-cyan-400",
                    text: "text-cyan-400",
                };

    return (
        <div
            className={`
                flex
                items-center
                gap-4
                rounded-xl
                border
                px-4
                py-3
                transition-all
                hover:-translate-y-0.5
                hover:bg-slate-800
                ${rankStyle.container}
            `}
        >

            {/* Rank */}
            <div
                className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-black
                    ${rankStyle.rank}
                `}
            >
                {rank}
            </div>

            {/* Username */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-white">
                    {username}
                </h3>

                <p className="text-xs text-slate-500">
                    Rank #{rank}
                </p>
            </div>

            {/* Score */}
            <div className="text-right">
                <p
                    className={`
                        text-lg
                        font-black
                        tracking-tight
                        ${rankStyle.text}
                    `}
                >
                    {score}
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    Score
                </p>
            </div>

        </div>
    );
}

export default TableRow;