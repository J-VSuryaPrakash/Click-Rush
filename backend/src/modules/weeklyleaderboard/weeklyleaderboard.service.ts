import { desc, eq, sql } from "drizzle-orm";
import { db } from "../../common/db/index.js"
import { users, weeklyLeaderboards } from "../../common/db/schema.js"

export const allLeaders = async () => {

    const leaders = await db.select({
        id: users.id,
        username: users.username,
        score: weeklyLeaderboards.score,
        rank: sql<number>`DENSE_RANK() OVER (ORDER BY ${weeklyLeaderboards.score} DESC)`,
    }).from(weeklyLeaderboards).innerJoin(users, eq(weeklyLeaderboards.userId, users.id)).orderBy(desc(weeklyLeaderboards.score));

    return leaders;
}