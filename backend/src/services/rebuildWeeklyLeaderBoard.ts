import { eq } from "drizzle-orm";
import { db } from "../common/db/index.js";
import {
    weeklyLeaderboards,
} from "../common/db/schema.js";
import { redisClient } from "../services/redisclient.js";
import {
    isoWeekKey,
    secondsUntilNextIsoWeek,
} from "../common/utils/periodKeys.js";
import getWeekStart from "../modules/game_sessions/game.util.js";

const WEEKLY_PREFIX = "clickrush:leaderboard:weekly";

export const rebuildWeeklyLeaderboard = async () => {
    const now = new Date();

    const weekStart = getWeekStart(now);
    const weekKey = isoWeekKey(now);

    const leaderboard = await db
        .select({
            userId: weeklyLeaderboards.userId,
            score: weeklyLeaderboards.score,
        })
        .from(weeklyLeaderboards)
        .where(
            eq(weeklyLeaderboards.weekStart, weekStart),
        );

    const redisKey =
        `clickrush:leaderboard:weekly:${weekKey}`;

    await redisClient.del(redisKey);

    if (leaderboard.length === 0) {
        return {
            period: weekKey,
            count: 0,
        };
    }

    const pipeline = redisClient.pipeline();

    for (const entry of leaderboard) {
        pipeline.zadd(
            redisKey,
            entry.score,
            entry.userId,
        );
    }

    pipeline.expire(
        redisKey,
        secondsUntilNextIsoWeek(now),
    );

    await pipeline.exec();

    return {
        period: weekKey,
        count: leaderboard.length,
    };
};