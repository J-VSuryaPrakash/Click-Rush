// Shared class names for the ClickRush look (see the rush-* tokens in index.css).
// Flat surfaces, 1px rules, one terracotta accent, instant colour changes,
// and a small scale on press.

export const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6";

export const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rush-ink";

const buttonBase =
    "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[4px] px-6 text-sm transition-transform duration-75 ease-out active:scale-[0.98] motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

export const buttonPrimary =
    `${buttonBase} bg-rush-accent font-semibold text-rush-accent-ink hover:bg-rush-accent-hover active:bg-rush-accent-press ${focusRing}`;

export const buttonSecondary =
    `${buttonBase} border border-rush-rule font-medium text-rush-ink hover:border-rush-muted ${focusRing}`;

export const iconButton =
    `inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[4px] border border-rush-rule text-rush-ink transition-transform duration-75 ease-out hover:border-rush-muted active:scale-[0.96] motion-reduce:transition-none ${focusRing}`;

export const textLink =
    `rounded-[2px] font-medium text-rush-ink underline decoration-rush-rule underline-offset-4 hover:decoration-rush-ink active:text-rush-accent ${focusRing}`;

export const fieldLabel = "text-sm font-medium text-rush-ink";

export const fieldInput =
    "h-11 w-full rounded-[4px] border border-rush-field bg-rush-panel px-3.5 text-base text-rush-ink placeholder:text-rush-muted hover:border-rush-muted focus-visible:border-rush-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rush-ink aria-invalid:border-rush-accent";

export const fieldError = "text-sm text-rush-accent";

// Frame header row, matching the game's "Round" bar.
export const frameHeader =
    "flex min-h-14 items-center justify-between gap-4 border-b border-rush-rule px-5";

// Rank / player / score rows used by the leaderboard ledgers.
export const ledgerGrid =
    "grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 px-5";
