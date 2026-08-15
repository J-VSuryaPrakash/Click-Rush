import { Trophy, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GameResultModalProps {
    score: number;
    highScore: number;
    isNewHighScore: boolean;
    onSave: () => void;
    onCancel: () => void;
    isSaving: boolean;
}

function GameResultModal({
    score,
    highScore,
    isNewHighScore,
    onSave,
    onCancel,
    isSaving,
}: GameResultModalProps) {
    return (
        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/80
            px-4
            backdrop-blur-sm
        ">
            <div className="
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                border
                border-slate-700
                bg-slate-900
                shadow-2xl
                shadow-black/50
            ">

                {/* Header */}
                <div className="
                    border-b
                    border-slate-800
                    bg-slate-950
                    px-6
                    py-5
                    text-center
                ">
                    <div className="
                        mx-auto
                        mb-3
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-violet-500/10
                        text-violet-400
                    ">
                        <Trophy className="h-6 w-6" />
                    </div>

                    <h2 className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-white
                    ">
                        Game Over
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-slate-400
                    ">
                        Great run! Here's your result.
                    </p>
                </div>

                {/* Score */}
                <div className="px-6 py-6">

                    <div className="
                        rounded-xl
                        border
                        border-cyan-500/20
                        bg-slate-950
                        p-5
                        text-center
                    ">
                        <p className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-cyan-400
                        ">
                            Your Score
                        </p>

                        <p className="
                            mt-2
                            text-5xl
                            font-black
                            tracking-tight
                            text-cyan-400
                        ">
                            {score}
                        </p>
                    </div>

                    {/* High Score */}
                    <div className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-800/50
                        px-4
                        py-3
                    ">
                        <span className="text-sm font-medium text-slate-400">
                            High Score
                        </span>

                        <span className="
                            text-lg
                            font-black
                            text-violet-400
                        ">
                            {highScore}
                        </span>
                    </div>

                    {/* New High Score */}
                    {isNewHighScore && (
                        <div className="
                            mt-4
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-amber-400/30
                            bg-amber-400/10
                            px-4
                            py-3
                        ">
                            <Trophy className="h-5 w-5 text-amber-400" />

                            <span className="
                                font-bold
                                text-amber-400
                            ">
                                New High Score!
                            </span>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="
                        mt-6
                        flex
                        flex-col-reverse
                        gap-3
                        sm:flex-row
                    ">
                        <Button
                            variant="outline"
                            disabled={isSaving}
                            onClick={onCancel}
                            className="
                                h-11
                                flex-1
                                rounded-xl
                                border-slate-700
                                bg-slate-800
                                font-semibold
                                text-slate-300
                                hover:bg-slate-700
                                hover:text-white
                                hover:cursor-pointer
                            "
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>

                        <Button
                            disabled={isSaving}
                            onClick={onSave}
                            className="
                                h-11
                                flex-1
                                rounded-xl
                                bg-violet-600
                                font-bold
                                text-white
                                shadow-lg
                                shadow-violet-900/30
                                hover:bg-violet-500
                                hover:cursor-pointer
                            "
                        >
                            <Save className="mr-2 h-4 w-4" />
                            {isSaving ? "Saving..." : "Save Game"}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GameResultModal;