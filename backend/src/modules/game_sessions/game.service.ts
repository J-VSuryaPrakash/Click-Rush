import { eq, and, sql, lt, lte } from "drizzle-orm"
import { db } from "../../common/db/index.js"
import { dailyLeaderboards, gameSessions, users, weeklyLeaderboards } from "../../common/db/schema.js"
import type { ScoreType } from "./dto/score.dto.js"
import ApiError from "../../common/utils/ApiError.js";
import getWeekStart from "./game.util.js";

const GAME_DURATION_MS = 60_000;

const getIstDate = (date: Date): string => {
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
};

export const startGame = async (userId: string) => {
    return await db.transaction(async (tx) => {
        const startedAt = new Date();
        const expiresAt = new Date(startedAt.getTime() + GAME_DURATION_MS);

        await tx.update(gameSessions)
            .set({
                status: "EXPIRED",
                endedAt: startedAt,
            })
            .where(and(
                eq(gameSessions.userId, userId),
                eq(gameSessions.status, "ACTIVE"),
                lte(gameSessions.expiresAt, startedAt)
            ));

        const [existingActiveGame] = await tx.select({ id: gameSessions.id })
            .from(gameSessions)
            .where(and(
                eq(gameSessions.userId, userId),
                eq(gameSessions.status, "ACTIVE")
            ))
            .limit(1);

        if (existingActiveGame) {
            throw ApiError.invalidData("An active game session already exists");
        }

        const [game] = await tx.insert(gameSessions)
            .values({
                userId,
                status: "ACTIVE",
                startedAt,
                expiresAt,
            })
            .returning({
                gameId: gameSessions.id,
                startedAt: gameSessions.startedAt,
                expiresAt: gameSessions.expiresAt,
            });

        if (!game) {
            throw ApiError.serverError("Failed to start game session");
        }

        return game;
    });
};

export const completeGame = async (userId: string, gameId: string, data: ScoreType) => {
    return await db.transaction(async (tx) => {
        const completedAt = new Date();

        const [game] = await tx.update(gameSessions)
            .set({
                status: "COMPLETED",
                score: data.score,
                endedAt: completedAt,
            })
            .where(and(
                eq(gameSessions.id, gameId),
                eq(gameSessions.userId, userId),
                eq(gameSessions.status, "ACTIVE"),
                lte(gameSessions.expiresAt, completedAt)
            ))
            .returning({
                gameId: gameSessions.id,
                score: gameSessions.score,
                startedAt: gameSessions.startedAt,
                expiresAt: gameSessions.expiresAt,
                endedAt: gameSessions.endedAt,
                status: gameSessions.status,
            });

        if (!game) {
            const [existingGame] = await tx.select({
                userId: gameSessions.userId,
                status: gameSessions.status,
                expiresAt: gameSessions.expiresAt,
            })
                .from(gameSessions)
                .where(eq(gameSessions.id, gameId))
                .limit(1);

            if (!existingGame) {
                throw ApiError.invalidData("Game session not found");
            }

            if (existingGame.userId !== userId) {
                throw ApiError.invalidToken("Unauthorized access");
            }

            if (existingGame.status === "COMPLETED") {
                throw ApiError.invalidData("Game session already completed");
            }

            if (existingGame.status === "EXPIRED") {
                throw ApiError.invalidData("Game session has expired");
            }

            if (completedAt < existingGame.expiresAt) {
                throw ApiError.invalidData("Game session cannot be completed before expiry");
            }

            throw ApiError.invalidData("Game completion failed");
        }

        if (!game.endedAt) {
            throw ApiError.serverError("Failed to finalize completed game");
        }

        const [userScore] = await tx.update(users)
            .set({ bestScore: game.score, bestScoreAt: game.endedAt })
            .where(and(eq(users.id, userId), lt(users.bestScore, game.score)))
            .returning({
                userScore: users.bestScore
            });

        const gameDate = getIstDate(game.endedAt);

        const weekStart = getWeekStart(game.endedAt);

        await tx.insert(dailyLeaderboards)
            .values({ userId, leaderboardDate: gameDate, score: game.score })
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

        await tx.insert(weeklyLeaderboards)
            .values({ userId, weekStart, score: game.score })
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

        return {
            ...game,
            userScore: userScore?.userScore ?? null,
        };
    });
};

