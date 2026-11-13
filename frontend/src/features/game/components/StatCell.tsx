import type { ReactNode } from "react";

interface StatCellProps {
    label: string;
    value: ReactNode;
    unit?: string;
    alert?: boolean;
    // Optional small figure beside the label (e.g. the score behind a rank).
    note?: ReactNode;
}

// One cell of a telemetry grid. Fixed height and tabular figures,
// so values changing on every click never shift the layout.
function StatCell({ label, value, unit, alert = false, note }: StatCellProps) {
    return (
        <div className="flex h-24 min-w-0 flex-col justify-between bg-rush-paper px-4 py-3 sm:h-28 sm:px-5 sm:py-4">
            <span className="flex items-baseline justify-between gap-3 text-[13px] text-rush-muted">
                <span className="truncate">{label}</span>
                {note !== undefined && (
                    <span className="shrink-0 tabular-nums">{note}</span>
                )}
            </span>

            <span
                className={`truncate text-3xl font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-4xl ${
                    alert ? "text-rush-accent" : "text-rush-ink"
                }`}
            >
                {value}
                {unit && (
                    <span className="ml-1 text-sm font-normal tracking-normal text-rush-muted">
                        {unit}
                    </span>
                )}
            </span>
        </div>
    );
}

export default StatCell;
