import { Link } from "@tanstack/react-router";
import { MousePointer2, Trophy, Timer } from "lucide-react";

function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">

            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-lg flex-col items-center justify-center">

                {/* Logo / Brand */}
                <div className="text-center">
                    {/* Logo */}
                    <div className="
                            mx-auto
                            mb-2
                            flex
                            h-24
                            w-24
                            items-center
                            justify-center
                            sm:h-36
                            sm:w-36
                        ">
                        <img
                            src="https://ik.imagekit.io/uniwebsitecms/clickrush-removebg-preview.png"
                            alt="Click Rush"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    {/* Brand */}
                    <h1 className="
                        text-5xl
                        font-black
                        leading-none
                        tracking-[-0.04em]
                        text-white
                        sm:text-6xl
                    ">
                        Click<span className="text-violet-400">Rush</span>
                    </h1>

                    {/* Accent */}
                    <div className="
                        mx-auto
                        mt-4
                        flex
                        items-center
                        justify-center
                        gap-2
                    ">
                        <span className="h-1 w-8 rounded-full bg-violet-500" />
                        <span className="h-1 w-2 rounded-full bg-cyan-400" />
                        <span className="h-1 w-8 rounded-full bg-violet-500" />
                    </div>

                    {/* Tagline */}
                    <p className="
                        mt-5
                        text-xs
                        font-black
                        tracking-[0.2em]
                        text-cyan-400
                        sm:text-sm
                    ">
                        TEST YOUR SPEED
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        font-semibold
                        tracking-[0.15em]
                        text-slate-500
                        sm:text-sm
                    ">
                        BEAT YOUR SCORE
                    </p>

                </div>

                {/* Description */}
                <p className="
                    mt-2
                    max-w-md
                    text-center
                    text-sm
                    leading-6
                    text-slate-400
                    sm:text-base
                ">
                    Click as fast as you can in 60 seconds,
                    chase your high score, and climb the leaderboard.
                </p>

                {/* Actions */}
                <div className="
                    mt-8
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:flex-row
                ">

                    <Link
                        to="/login"
                        className="
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            bg-violet-600
                            px-6
                            text-sm
                            font-bold
                            text-white
                            shadow-lg
                            shadow-violet-900/30
                            transition-all
                            hover:bg-violet-500
                            hover:shadow-violet-500/20
                        "
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            px-6
                            text-sm
                            font-bold
                            text-slate-200
                            transition-all
                            hover:border-violet-500/40
                            hover:bg-slate-800
                            hover:text-white
                        "
                    >
                        Create Account
                    </Link>

                </div>

                {/* How to Play */}
                <div className="
                    mt-10
                    w-full
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-5
                    shadow-xl
                    sm:p-6
                ">

                    <h2 className="
                        text-center
                        text-lg
                        font-black
                        tracking-tight
                        text-white
                    ">
                        How to Play
                    </h2>

                    <div className="
                        mt-5
                        flex
                        flex-col
                        gap-4
                    ">

                        {/* Step 1 */}
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-violet-500/10
                                text-violet-400
                            ">
                                <MousePointer2 className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Click the arena
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Click as quickly as possible.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-cyan-500/10
                                text-cyan-400
                            ">
                                <Timer className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Beat the clock
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    You have 60 seconds to score.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-center gap-4">
                            <div className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-amber-400/10
                                text-amber-400
                            ">
                                <Trophy className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Climb the leaderboard
                                </h3>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Beat your high score and rank higher.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <p className="
                    mt-6
                    text-center
                    text-xs
                    text-slate-600
                ">
                    Ready to see how fast you can click?
                </p>

            </div>
        </div>
    );
}

export default LandingPage;