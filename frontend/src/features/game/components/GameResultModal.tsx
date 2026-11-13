import { RotateCcw, Save } from "lucide-react";

interface GameResultModalProps {
    score: number;
    highScore: number;
    isNewHighScore: boolean;
    onSave: () => void;
    onCancel: () => void;
    isSaving: boolean;
    // Optional: the server's reason when saving failed.
    errorMessage?: string;
}

const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rush-ink";

function GameResultModal({
    score,
    highScore,
    isNewHighScore,
    onSave,
    onCancel,
    isSaving,
    errorMessage,
}: GameResultModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-rush-paper/90 px-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="result-title"
                className="w-full max-w-md border border-rush-rule bg-rush-paper text-rush-ink"
            >

                {/* Header */}
                <div className="border-b border-rush-rule px-6 py-5">
                    <h2 id="result-title" className="text-2xl font-semibold tracking-[-0.02em]">
                        Game Over
                    </h2>

                    <p className="mt-1 text-sm text-rush-muted">
                        Great run! Here&rsquo;s your result.
                    </p>
                </div>

                {/* Figures */}
                <dl className="grid grid-cols-2 gap-px border-b border-rush-rule bg-rush-rule">
                    <div className="bg-rush-paper px-6 py-5">
                        <dt className="text-[13px] text-rush-muted">Your Score</dt>
                        <dd className="mt-2 text-5xl font-semibold leading-none tracking-[-0.03em] tabular-nums text-rush-accent">
                            {score}
                        </dd>
                    </div>

                    <div className="bg-rush-paper px-6 py-5">
                        <dt className="text-[13px] text-rush-muted">High Score</dt>
                        <dd className="mt-2 text-5xl font-semibold leading-none tracking-[-0.03em] tabular-nums">
                            {highScore}
                        </dd>
                    </div>
                </dl>

                {/* New High Score */}
                {isNewHighScore && (
                    <p className="border-b border-rush-rule px-6 py-3 text-sm font-semibold text-rush-accent">
                        New High Score!
                    </p>
                )}

                {/* Save error */}
                {errorMessage && (
                    <p role="alert" className="border-b border-rush-rule px-6 py-3 text-sm text-rush-accent">
                        {errorMessage}
                    </p>
                )}

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 px-6 py-5 sm:flex-row">
                    <button
                        type="button"
                        disabled={isSaving}
                        onClick={onCancel}
                        className={`inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[4px] border border-rush-rule text-sm font-medium text-rush-ink transition-transform duration-75 hover:border-rush-muted active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 motion-reduce:transition-none ${focusRing}`}
                    >
                        <RotateCcw aria-hidden="true" className="h-4 w-4" />
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={isSaving}
                        aria-busy={isSaving || undefined}
                        onClick={onSave}
                        className={`inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-rush-accent text-sm font-semibold text-rush-accent-ink transition-transform duration-75 hover:bg-rush-accent-hover active:scale-[0.98] active:bg-rush-accent-press disabled:cursor-progress disabled:opacity-60 disabled:active:scale-100 motion-reduce:transition-none ${focusRing}`}
                    >
                        <Save aria-hidden="true" className="h-4 w-4" />
                        {isSaving ? "Saving..." : "Save Game"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default GameResultModal;
