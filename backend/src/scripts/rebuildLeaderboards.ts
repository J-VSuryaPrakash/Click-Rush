import { rebuildDailyLeaderboard } from "../services/rebuildDailyLeaderBoard.js";
import { rebuildWeeklyLeaderboard } from "../services/rebuildWeeklyLeaderBoard.js";

const rebuildLeaderboards = async () => {
    const daily = await rebuildDailyLeaderboard();
    const weekly = await rebuildWeeklyLeaderboard();

    return {
        daily,
        weekly,
    };
};

rebuildLeaderboards().then((result) => {
    console.log("Leaderboards rebuilt successfully:", result);
}).catch((error) => {
    console.error("Error rebuilding leaderboards:", error);
    process.exit(1);
});