import { useQuery } from "@tanstack/react-query";
import {
    getAllGlobalLeaders,
    getAllDailyLeaders,
    getAllWeeklyLeaders,
} from "@/api/leaderboard.api";

type LeaderboardType = "global" | "daily" | "weekly";

const leaderboardQueries = {
    global: getAllGlobalLeaders,
    daily: getAllDailyLeaders,
    weekly: getAllWeeklyLeaders,
};

export const useLeaderBoard = (type: LeaderboardType) => {
    return useQuery({
        queryKey: ["leaderboard", type],
        queryFn: leaderboardQueries[type],
    });
};