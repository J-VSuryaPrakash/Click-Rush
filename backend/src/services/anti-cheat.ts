type AntiCheatResult = {
    isCheating: boolean;

    totalIntervals: number;

    averageMean: number;
    windowMeanStdDev: number;

    windows: {
        index: number;
        size: number;
        mean: number;
        cps: number;
        stdDev: number;
    }[];

    reason: string;
};

const MAX_HUMAN_CPS = 15;
const MIN_WINDOW_MEAN_STD_DEV = 2;
const MIN_AVERAGE_MEAN = 100;

export const antiCheat = (
    intervals: number[],
    windowSize = 25,
): AntiCheatResult | null => {
    if (intervals.length < 2) {
        return null;
    }
    const windows: AntiCheatResult["windows"] = [];
    // 1. Divide intervals into windows
    for (let i = 0; i < intervals.length; i += windowSize) {

        const window = intervals.slice(i, i + windowSize);

        if (window.length < 2) {
            continue;
        }
        // Mean
        const mean = window.reduce((sum, interval) => sum + interval, 0) / window.length;
        // CPS
        const cps = 1000 / mean;
        // Standard deviation
        const variance = window.reduce((sum, interval) => sum + Math.pow(interval - mean, 2), 0) / window.length;
        const stdDev = Math.sqrt(variance);
        const index = windows.length + 1;

        windows.push({
            index,
            size: window.length,
            mean,
            cps,
            stdDev,
        });
    }

    if (windows.length === 0) {
        return null;
    }
    // 2. Mean of window means
    const averageMean = windows.reduce((sum, window) => sum + window.mean, 0) / windows.length;
    // 3. Standard deviation of window means
    const windowMeanVariance = windows.reduce((sum, window) => sum + Math.pow(window.mean - averageMean, 2), 0) / windows.length;

    const windowMeanStdDev = Math.sqrt(windowMeanVariance);
    // 4. CPS validation
    const maxCps = Math.max(...windows.map((window) => window.cps));

    const cpsViolation = maxCps > MAX_HUMAN_CPS;
    // 5. Average mean validation
    const averageMeanViolation = averageMean < MIN_AVERAGE_MEAN;
    // 6. Consistency validation
    const consistencyViolation = windowMeanStdDev < MIN_WINDOW_MEAN_STD_DEV;
    
    // 7. Final decision
    let isCheating = false;
    let reason = "Click pattern appears human.";
    if (cpsViolation) {
        isCheating = true;
        reason = `CPS exceeded ${MAX_HUMAN_CPS}.`;
    } else if (averageMeanViolation) {
        isCheating = true;
        reason = `Average click interval was below ${MIN_AVERAGE_MEAN}ms.`;
    } else if (consistencyViolation) {
        isCheating = true;
        reason = "Click intervals were unusually consistent across windows.";
    }
    return {
        isCheating,
        totalIntervals: intervals.length,
        averageMean,
        windowMeanStdDev,
        windows,
        reason,
    };
};