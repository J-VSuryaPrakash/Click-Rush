import { eq, and, sql, lt } from "drizzle-orm"
import { db } from "../../common/db/index.js"
import { dailyLeaderboards, gameSessions, users, weeklyLeaderboards } from "../../common/db/schema.js"
import type { ScoreType } from "./dto/score.dto.js"
import ApiError from "../../common/utils/ApiError.js";
import getWeekStart from "./game.util.js";

export const gameScore = async (userId: string, data: ScoreType) => {
    return await db.transaction(async (tx) => {
        // 1. Store the completed game
        const [game] = await tx.insert(gameSessions)
            .values({ userId, score: data.score, startedAt: data.startedAt, endedAt: data.endedAt, })
            .returning({ score: gameSessions.score, endedAt: gameSessions.endedAt });

        if (!game) {
            throw ApiError.serverError("Failed to record game session");
        }

        // 2. Update global best score only if this score is better
        const [userScore] = await tx.update(users).set({ bestScore: game.score, bestScoreAt: game.endedAt})
            .where(and(eq(users.id, userId),lt(users.bestScore, game.score))).returning({
                userScore : users.bestScore
            });
        
        // 3. Determine the leaderboard periods
        const gameDate = game.endedAt.toISOString().slice(0, 10);

        const weekStart = getWeekStart(game.endedAt);

        // 4. Daily leaderboard
        await tx.insert(dailyLeaderboards).values({userId,leaderboardDate: gameDate,score: game.score})
            .onConflictDoUpdate({
                target: [
                    dailyLeaderboards.userId,
                    dailyLeaderboards.leaderboardDate,
                ],
                set: {
                    score: sql`GREATEST(${dailyLeaderboards.score}, excluded.score)`,
                    updatedAt: new Date(),
                },
            });

        // 5. Weekly leaderboard
        await tx.insert(weeklyLeaderboards).values({userId,weekStart,score: game.score})
            .onConflictDoUpdate({
                target: [
                    weeklyLeaderboards.userId,
                    weeklyLeaderboards.weekStart,
                ],
                set: {
                    score: sql`GREATEST(${weeklyLeaderboards.score}, excluded.score)`,
                    updatedAt: new Date(),
                },
            });

        return {...game,...userScore};
    });
};

