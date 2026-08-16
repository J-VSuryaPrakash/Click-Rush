import { eq } from "drizzle-orm";
import { db } from "../common/db/index.js";
import {
    dailyLeaderboards
} from "../common/db/schema.js";
import { redisClient } from "../services/redisclient.js";
import {
    todayKey,
    secondsUntilNextIstDay,
} from "../common/utils/periodKeys.js";

const DAILY_PREFIX = "clickrush:leaderboard:daily";
const WEEKLY_PREFIX = "clickrush:leaderboard:weekly";

export const rebuildDailyLeaderboard = async () => {
    const today = todayKey();

    const leaderboard = await db
        .select({
            userId: dailyLeaderboards.userId,
            score: dailyLeaderboards.score,
        })
        .from(dailyLeaderboards)
        .where(
            eq(
                dailyLeaderboards.leaderboardDate,
                today,
            ),
        );

    const key = `${DAILY_PREFIX}:${today}`;

    // Remove the old Redis representation first.
    await redisClient.del(key);

    if (leaderboard.length === 0) {
        return {
            period: today,
            count: 0,
        };
    }

    const pipeline = redisClient.pipeline();

    for (const entry of leaderboard) {
        pipeline.zadd(
            key,
            entry.score,
            entry.userId,
        );
    }

    pipeline.expire(
        key,
        secondsUntilNextIstDay(),
    );

    await pipeline.exec();

    return {
        period: today,
        count: leaderboard.length,
    };
};