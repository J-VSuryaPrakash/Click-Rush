import History from "./History.tsx";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/auth.api";
import { useProfile, useRanks } from "@/hooks/useProfile.ts";

interface HistoryData {
    id: number;
    score: number;
    endedAt: string;
}

function HistoryBoard() {


    const { data: user } = useQuery({
        queryKey: ["auth", "me"],
        queryFn: getCurrentUser,
    });

    const {
        data: profile
    } = useProfile();

    const {
        data: ranks
    } = useRanks();

    const history: HistoryData[] = profile?.gameHistory ?? [];

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6">

            <div className="mx-auto w-full max-w-4xl">

                {/* Stats */}
                <div className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-3
                    sm:gap-4
                ">

                    {/* High Score */}
                    <div className="
                        rounded-xl
                        border border-violet-500/20
                        bg-slate-900
                        p-4
                        text-center
                        shadow-lg
                    ">
                        <p className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-violet-400
                        ">
                            High Score
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-violet-400
                        ">
                            {user?.data.bestScore}
                        </p>
                    </div>

                    {/* Average Clicks */}
                    <div className="
                        rounded-xl
                        border border-cyan-500/20
                        bg-slate-900
                        p-4
                        text-center
                        shadow-lg
                    ">
                        <p className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-cyan-400
                        ">
                            Avg Clicks
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-cyan-400
                        ">
                            {profile?.avgClick}
                        </p>
                    </div>

                    {/* Games Played */}
                    <div className="
                        rounded-xl
                        border border-amber-500/20
                        bg-slate-900
                        p-4
                        text-center
                        shadow-lg
                    ">
                        <p className="
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-amber-400
                        ">
                            Games Played
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-black
                            text-amber-400
                        ">
                            {profile?.numOfGames}
                        </p>
                    </div>

                </div>

                {/* Ranks */}
                <div className="
                    mt-4
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-3
                    sm:gap-4
                ">

                    {/* Global */}
                    <div className="
                        rounded-xl
                        border border-slate-800
                        bg-slate-900
                        p-4
                        text-center
                    ">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Global Rank
                        </p>

                        <p className="mt-2 text-2xl font-black text-white">
                            #{ranks?.globalRank?.at(0)?.rank}
                        </p>
                        <p className="text-xs font-normal text-slate-400">
                            Score: {ranks?.globalRank?.at(0)?.score}
                        </p>
                    </div>

                    {/* Daily */}
                    <div className="
                        rounded-xl
                        border border-slate-800
                        bg-slate-900
                        p-4
                        text-center
                    ">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Daily Rank
                        </p>

                        <p className="mt-2 text-2xl font-black text-white">
                            #{ranks?.dailyRank?.at(0)?.rank}
                        </p>
                        <p className="text-xs font-normal text-slate-400">
                            Score: {ranks?.dailyRank?.at(0)?.score}
                        </p>
                    </div>

                    {/* Weekly */}
                    <div className="
                        rounded-xl
                        border border-slate-800
                        bg-slate-900
                        p-4
                        text-center
                    ">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Weekly Rank
                        </p>

                        <p className="mt-2 text-2xl font-black text-white">
                            #{ranks?.weeklyRank?.at(0)?.rank}

                        </p>
                        <p className="text-xs font-normal text-slate-400">
                            Score: {ranks?.weeklyRank?.at(0)?.score}
                        </p>
                    </div>

                </div>

                {/* History */}
                <div className="
                    mt-6
                    overflow-hidden
                    rounded-2xl
                    border border-slate-800
                    bg-slate-900
                    shadow-xl
                ">

                    {/* History Header */}
                    <div className="
                        grid
                        grid-cols-[60px_1fr_120px]
                        items-center
                        bg-slate-950
                        px-3
                        py-3
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                        sm:grid-cols-[80px_1fr_160px]
                        sm:px-4
                    ">
                        <p>S.No</p>

                        <p>Score</p>

                        <p className="text-right">
                            Date
                        </p>
                    </div>

                    {/* History Rows */}
                    <div>
                        {history.map((game, index) => (
                            <History
                                key={game.id}
                                serialNo={index + 1}
                                score={game.score}
                                date={game.endedAt.split('T')[0]}
                            />
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default HistoryBoard;