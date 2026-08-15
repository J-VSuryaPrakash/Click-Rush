import { eq, desc, sql } from "drizzle-orm"
import { db } from "../../common/db/index.js"
import { dailyLeaderboards, gameSessions, users, weeklyLeaderboards } from "../../common/db/schema.js"
import ApiError from "../../common/utils/ApiError.js";


const userProfile = async (userId: string) => {
    const user = await db.select({ id: users.id, username: users.username, email: users.email, best_score: users.bestScore, }).from(users).where(eq(users.id, userId));
    if (!user) {
        throw ApiError.userNotFound('User not found');
    }
    return user;
}

const globalLeaders = async () => {

    const leaders = await db.select({
        id: users.id,
        username: users.username,
        score: users.bestScore,
        rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${users.bestScore} DESC)`
    }).from(users).orderBy(desc(users.bestScore));
    return leaders;
}

const gameHistory = async (userId: string) => {

    const gameHistory = await db.select()
        .from(gameSessions)
        .where(eq(gameSessions.userId, userId))
        .orderBy(desc(gameSessions.endedAt));

    const numOfGames = gameHistory.length;

    const avg = gameHistory.reduce((avg, game) => {
        avg += game.score;
        return avg;
    }, 0)

    const avgClick = (avg / numOfGames).toFixed(2);

    return { avgClick, numOfGames, gameHistory };
}

const getGlobalRank = async (userId: string) => {

    const globalRank = await db.select({
        id: users.id,
        score: users.bestScore,
        rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${users.bestScore} DESC)`
    }).from(users).where(eq(users.id, userId));

    return globalRank;
}


const getDailyRank = async (userId: string) => {

    const dailyRank = await db.select({
        score: dailyLeaderboards.score,
        rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${dailyLeaderboards.score} DESC)`
    }).from(dailyLeaderboards).where(eq(dailyLeaderboards.userId, userId));

    return dailyRank;
}

const getWeeklyRank = async (userId: string) => {

    const weeklyRank = await db.select({
        score: weeklyLeaderboards.score,
        rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${weeklyLeaderboards.score} DESC)`
    }).from(weeklyLeaderboards).where(eq(weeklyLeaderboards.userId, userId));

    return weeklyRank;
}

export {
    userProfile,
    gameHistory,
    getGlobalRank,
    getDailyRank,
    getWeeklyRank,
    globalLeaders
}

