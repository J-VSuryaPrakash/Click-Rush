import { inArray } from "drizzle-orm";
import { db } from "../../common/db/index.js";
import { users } from "../../common/db/schema.js";
import { redisClient } from "../../services/redisclient.js";
import {
    todayKey,
} from "../../common/utils/periodKeys.js";

export const allLeaders = async () => {
    const key = `clickrush:leaderboard:daily:${todayKey()}`;

    // Get top 100 from Redis
    const results = await redisClient.zrevrange(
        key,
        0,
        99,
        "WITHSCORES",
    );

    if (results.length === 0) {
        return [];
    }

    const leaderboard: {
        id: string;
        score: number;
        rank: number;
    }[] = [];

    let rank = 0;
    let previousScore: number | null = null;

    for (let i = 0; i < results.length; i += 2) {
        const id = results[i];
        const rawScore = results[i + 1];

        if (!id || rawScore === undefined) {
            continue;
        }

        const score = Number(rawScore);

        // DENSE_RANK()
        if (previousScore === null || score !== previousScore) {
            rank++;
        }

        leaderboard.push({
            id,
            score,
            rank,
        });

        previousScore = score;
    }

    // Get usernames from PostgreSQL
    const userIds = leaderboard.map(
        (leader) => leader.id,
    );

    const usersFromDb = await db
        .select({
            id: users.id,
            username: users.username,
        })
        .from(users)
        .where(inArray(users.id, userIds));

    const usernameMap = new Map(
        usersFromDb.map((user) => [
            user.id,
            user.username,
        ]),
    );

    return leaderboard.map((leader) => ({
        id: leader.id,
        username: usernameMap.get(leader.id) ?? "Unknown",
        score: leader.score,
        rank: leader.rank,
    }));
};