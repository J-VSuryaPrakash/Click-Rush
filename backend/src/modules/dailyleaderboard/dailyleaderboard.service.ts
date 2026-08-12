import { desc } from "drizzle-orm";
import { db } from "../../common/db/index.js"
import { dailyLeaderboards } from "../../common/db/schema.js"

export const leaders = async () => {

    const topLeaders = await db.select().from(dailyLeaderboards).orderBy(desc(dailyLeaderboards.score)).limit(3);

    return topLeaders;
}  

export const allLeaders = async () => {

    const [leaders] = await db.select().from(dailyLeaderboards).orderBy(desc(dailyLeaderboards.score));

    return leaders;
}