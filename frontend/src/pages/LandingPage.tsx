import { Link } from "@tanstack/react-router";
import { buttonPrimary, buttonSecondary, container, frameHeader } from "@/lib/ui";

const steps = [
    { title: "Click the arena", text: "Click as quickly as possible." },
    { title: "Beat the clock", text: "You have 60 seconds to score." },
    { title: "Climb the leaderboard", text: "Beat your high score and rank higher." },
];

function LandingPage() {
    return (
        <div className="min-h-dvh bg-rush-paper text-rush-ink">
            <div className={`${container} flex min-h-dvh flex-col justify-center py-6 lg:py-10`}>

                <div className="grid grid-cols-1 border border-rush-rule lg:grid-cols-[minmax(0,1fr)_400px]">

                    {/* Brand + actions */}
                    <section className="flex flex-col justify-center gap-10 px-6 py-12 sm:px-10 lg:py-20">
                        <img
                            src="https://ik.imagekit.io/uniwebsitecms/clickrush-removebg-preview.png"
                            alt="Click Rush"
                            width={72}
                            height={72}
                            className="h-18 w-18 object-contain"
                        />

                        <div className="min-w-0">
                            <h1 className="text-5xl font-semibold leading-none tracking-[-0.04em] break-words sm:text-7xl">
                                Click<span className="text-rush-accent">Rush</span>
                            </h1>

                            <p className="mt-5 text-xl font-medium text-rush-ink">
                                Test your speed. Beat your score.
                            </p>

                            <p className="mt-2 max-w-md text-base text-rush-muted">
                                Click as fast as you can in 60 seconds,
                                chase your high score, and climb the leaderboard.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link to="/login" className={`${buttonPrimary} w-full sm:w-44`}>
                                Login
                            </Link>

                            <Link to="/register" className={`${buttonSecondary} w-full sm:w-44`}>
                                Create Account
                            </Link>
                        </div>
                    </section>

                    {/* How to Play */}
                    <aside className="flex flex-col border-t border-rush-rule lg:border-l lg:border-t-0">
                        <div className={frameHeader}>
                            <h2 className="text-base font-semibold tracking-[-0.01em]">
                                How to Play
                            </h2>
                        </div>

                        <ol className="flex-1">
                            {steps.map((step, i) => (
                                <li
                                    key={step.title}
                                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-rush-rule px-5 py-5"
                                >
                                    <span className="text-sm font-semibold tabular-nums text-rush-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-base font-semibold text-rush-ink">
                                            {step.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-rush-muted">
                                            {step.text}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        {/* Footer */}
                        <p className="px-5 py-4 text-sm text-rush-muted">
                            Ready to see how fast you can click?
                        </p>
                    </aside>

                </div>

            </div>
        </div>
    );
}

export default LandingPage;
