const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const SECONDS_IN_DAY = 24 * 60 * 60;

const getIstDate = (date: Date = new Date()) => {
    return new Date(date.getTime() + IST_OFFSET_MS);
};

const todayKey = (date: Date = new Date()) => {
    const ist = getIstDate(date);

    return [
        ist.getUTCFullYear(),
        String(ist.getUTCMonth() + 1).padStart(2, "0"),
        String(ist.getUTCDate()).padStart(2, "0"),
    ].join("-");
};

const isoWeekKey = (date: Date = new Date()) => {
    const ist = getIstDate(date);

    // ISO week: Monday = 1, Sunday = 7
    const day = ist.getUTCDay() || 7;

    const thursday = new Date(ist);
    thursday.setUTCDate(ist.getUTCDate() + 4 - day);

    const isoYear = thursday.getUTCFullYear();

    const yearStart = new Date(Date.UTC(isoYear, 0, 1));

    const weekNumber = Math.ceil(
        ((thursday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );

    return `${isoYear}-W${String(weekNumber).padStart(2, "0")}`;
};

const secondsUntilNextIstDay = (date: Date = new Date()) => {
    const ist = getIstDate(date);

    const nextDay = new Date(ist);

    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    nextDay.setUTCHours(0, 0, 0, 0);

    return Math.max(
        1,
        Math.ceil((nextDay.getTime() - ist.getTime()) / 1000),
    );
};

const secondsUntilNextIsoWeek = (date: Date = new Date()) => {
    const ist = getIstDate(date);

    // ISO day: Monday = 1 ... Sunday = 7
    const day = ist.getUTCDay() || 7;

    const nextMonday = new Date(ist);

    // Move to next Monday
    nextMonday.setUTCDate(
        ist.getUTCDate() + (8 - day),
    );

    nextMonday.setUTCHours(0, 0, 0, 0);

    return Math.max(
        1,
        Math.ceil(
            (nextMonday.getTime() - ist.getTime()) / 1000,
        ),
    );
};

export {
    getIstDate,
    todayKey,
    isoWeekKey,
    secondsUntilNextIstDay,
    secondsUntilNextIsoWeek,
};