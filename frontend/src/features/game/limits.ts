// Mirrors the thresholds in backend/src/services/anti-cheat.ts.
// The server checks these when a round is completed; keep the two in sync.

// MIN_AVERAGE_MEAN = 100ms between clicks, so at most 10 clicks/s on average.
export const MAX_AVERAGE_CPS = 10;

// Start warning a little before the limit.
export const PACE_WARNING_CPS = 8.5;
