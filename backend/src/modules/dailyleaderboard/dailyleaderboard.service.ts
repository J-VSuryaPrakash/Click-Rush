import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../common/db/index.js"
import { dailyLeaderboards, users } from "../../common/db/schema.js"

export const allLeaders = async () => {
    const leaders = await db
        .select({
            id: users.id,
            username: users.username,
            score: dailyLeaderboards.score,
            rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${dailyLeaderboards.score} DESC)`,
        })
        .from(dailyLeaderboards)
        .innerJoin(
            users,
            eq(dailyLeaderboards.userId, users.id)
        )
        .orderBy(desc(dailyLeaderboards.score));

    return leaders;
};