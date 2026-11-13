import { useState } from "react";
import TableRow from "./TableRow";
import { useLeaderBoard } from "@/hooks/useLeaderBoard";
import type { Leader } from "@/api/leaderboard.api";
import EmptyState from "@/components/EmptyState";
import Spinner from "@/components/Spinner";
import { container, focusRing, ledgerGrid } from "@/lib/ui";

function Board() {

    const categories = ["global", "daily", "weekly"] as const;
    const [category, setCategory] =
        useState<"global" | "daily" | "weekly">("daily");

    const {
        data: leaders = [],
        isLoading
    } = useLeaderBoard(category);

    if (!isLoading && leaders.length === 0) {
        return (
            <EmptyState
                title="No players yet"
                description="Be the first player to complete a game and claim your place on the leaderboard."
                buttonText="Play Now"
            />
        )
    }

    return (
        <div className="min-h-[calc(100dvh-4rem)] bg-rush-paper text-rush-ink">
            <div className={`${container} py-5 lg:py-8`}>

                <div className="mx-auto w-full max-w-3xl border border-rush-rule">

                    {/* Header */}
                    <div className="flex flex-col gap-3 border-b border-rush-rule px-5 pt-4 sm:flex-row sm:items-stretch sm:justify-between sm:pt-0">
                        <div className="sm:py-4">
                            <h1 className="text-xl font-semibold tracking-[-0.02em]">
                                Leaderboard
                            </h1>

                            <p className="mt-1 text-sm text-rush-muted">
                                See who&rsquo;s leading the rush.
                            </p>
                        </div>

                        {/* Category Selector */}
                        <div role="group" aria-label="Leaderboard period" className="flex items-stretch gap-5">
                            {categories.map((val) => {
                                const active = category === val;
                                return (
                                    <button
                                        key={val}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setCategory(val)}
                                        className={`-mb-px h-11 cursor-pointer border-b-2 text-sm capitalize sm:h-auto ${focusRing} ${
                                            active
                                                ? "border-rush-accent text-rush-ink"
                                                : "border-transparent text-rush-muted hover:text-rush-ink"
                                        }`}
                                    >
                                        {val}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column Header */}
                    <div className={`${ledgerGrid} h-10 border-b border-rush-rule text-[13px] text-rush-muted`}>
                        <span>Rank</span>
                        <span>Player</span>
                        <span className="text-right">Score</span>
                    </div>

                    {/* Rows */}
                    {isLoading ? (
                        <div className="flex h-48 items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <ol>
                            {leaders.map((leader: Leader) => (
                                <TableRow
                                    key={leader.id}
                                    rank={Number(leader.rank)}
                                    username={leader.username}
                                    score={leader.score}
                                />
                            ))}
                        </ol>
                    )}

                </div>

            </div>
        </div>
    );
}

export default Board;
