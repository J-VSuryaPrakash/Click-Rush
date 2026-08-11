/*

get user
get user game history
get user high score


*/

import { eq, desc } from "drizzle-orm"
import { db } from "../../common/db/index.js"
import { gameSessions, users } from "../../common/db/schema.js"
import ApiError from "../../common/utils/ApiError.js";


const userProfile = async (userId: string) => {
    const user = await db.select({ id: users.id, username: users.username, email: users.email, best_score: users.bestScore, }).from(users).where(eq(users.id, userId));
    if (!user) {
        throw ApiError.userNotFound('User not found');
    }
    return user;
}

const gameHistory = async (userId: string) => {

    const gameHistory = await db.select()
                                .from(gameSessions)
                                .where(eq(gameSessions.userId, userId))
                                .orderBy(desc(gameSessions.endedAt));

    return gameHistory;
}

const bestScore = async (userId: string) => {

    const [stats] = await db.select({bestScore: users.bestScore, bestScoreAt: users.bestScoreAt}).from(users).where(eq(users.id, userId));

    return stats;
}

export {
    userProfile,
    gameHistory,
    bestScore
}

