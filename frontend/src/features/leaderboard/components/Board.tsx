import { useState } from "react";
import TableRow from "./TableRow";
import { Button } from "@/components/ui/button";
import { useLeaderBoard } from "@/hooks/useLeaderBoard";
import type { Leader } from "@/api/leaderboard.api";

function Board() {

    const categories = ["global", "daily", "weekly"] as const;
    const [category, setCategory] =
        useState<"global" | "daily" | "weekly">("daily");

    const {
        data: leaders = [],
        isLoading,
    } = useLeaderBoard(category);
    console.log(leaders);
    return (
        <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6">

            {/* Main Container */}
            <div className="mx-auto w-full max-w-3xl">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                        Leaderboard
                    </h1>

                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                        See who's leading the rush.
                    </p>
                </div>

                {/* Category Selector */}
                <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-900 p-1.5 sm:gap-3">

                    {categories.map((val) => (
                        <Button
                            key={val}
                            variant="ghost"
                            onClick={() => setCategory(val)}
                            className={`
                                h-9 rounded-lg
                                text-xs font-bold capitalize
                                transition-all
                                sm:h-10 sm:text-sm
                                ${category === val
                                    ? "bg-violet-600 text-white hover:bg-violet-500 hover:text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }
                            `}
                        >
                            {val}
                        </Button>
                    ))}

                </div>

                {/* Leaderboard */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-2 sm:p-4">

                    {/* Column Header */}
                    <div className="mb-2 flex items-center px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:px-4 sm:text-xs">

                        <div className="w-12 sm:w-14">
                            Rank
                        </div>

                        <div className="flex-1">
                            Player
                        </div>

                        <div>
                            Score
                        </div>

                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                        {leaders.map((leader: Leader) => (
                            <TableRow
                                key={leader.id}
                                rank={Number(leader.rank)}
                                username={leader.username}
                                score={leader.score}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Board;