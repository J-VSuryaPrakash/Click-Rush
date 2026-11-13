import { ledgerGrid } from "@/lib/ui";

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
        <li className={`${ledgerGrid} h-12 border-b border-rush-rule text-sm tabular-nums last:border-b-0`}>
            {/* S.No */}
            <span className="text-rush-muted">
                {String(serialNo).padStart(2, "0")}
            </span>

            {/* Score */}
            <span className="text-base font-medium text-rush-ink">
                {score}
            </span>

            {/* Date */}
            <span className="text-right text-rush-muted">
                {date}
            </span>
        </li>
    );
}

export default History;
