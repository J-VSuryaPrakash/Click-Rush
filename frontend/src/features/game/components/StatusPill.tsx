import { memo } from "react";

export type StatusTone = "neutral" | "live" | "alert";

interface StatusPillProps {
    label: string;
    detail?: string;
    tone: StatusTone;
}

const toneClass: Record<StatusTone, string> = {
    neutral: "border-rush-rule text-rush-muted",
    live: "border-rush-rule text-rush-ink",
    alert: "border-rush-accent text-rush-accent",
};

// Connection and pace state. Only the label is announced to screen readers;
// the detail (latency) changes too often to read out.
function StatusPill({ label, detail, tone }: StatusPillProps) {
    return (
        <div
            className={`inline-flex h-7 shrink-0 items-center gap-2 rounded-full border px-3 text-[13px] font-medium ${toneClass[tone]}`}
        >
            <span role="status" aria-live="polite">
                {label}
            </span>

            {detail && (
                <>
                    <span aria-hidden="true" className="h-3 w-px bg-rush-rule" />
                    <span className="tabular-nums text-rush-muted">
                        {detail}
                    </span>
                </>
            )}
        </div>
    );
}

export default memo(StatusPill);
