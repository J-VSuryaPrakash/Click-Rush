interface HistoryProps {
    serialNo: number;
    score: number;
    date: string;
}

function History({
    serialNo,
    score,
    date,
}: HistoryProps) {
    return (
        <div
            className="
                grid grid-cols-[60px_1fr_120px]
                items-center
                border-t border-slate-800
                px-3 py-3
                text-sm
                sm:grid-cols-[80px_1fr_160px]
                sm:px-4 sm:py-4
            "
        >
            {/* S.No */}
            <p className="font-medium text-slate-500">
                {serialNo}
            </p>

            {/* Score */}
            <h3 className="font-bold text-cyan-400">
                {score}
            </h3>

            {/* Date */}
            <p className="text-right text-xs text-slate-400 sm:text-sm">
                {date}
            </p>
        </div>
    );
}

export default History;