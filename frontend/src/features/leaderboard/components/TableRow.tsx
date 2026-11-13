import { ledgerGrid } from "@/lib/ui";
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

    const isPodium = rank <= 3;

    return (
        <li className={`${ledgerGrid} h-12 border-b border-rush-rule text-sm tabular-nums last:border-b-0`}>

            {/* Rank */}
            <span className={isPodium ? "font-semibold text-rush-accent" : "text-rush-muted"}>
                {String(rank).padStart(2, "0")}
            </span>

            {/* Username */}
            <span className={`truncate text-rush-ink ${isPodium ? "font-semibold" : ""}`}>
                {username}
            </span>

            {/* Score */}
            <span className="text-right text-base font-medium text-rush-ink">
                {score}
            </span>

        </li>
    );
}

export default TableRow;
