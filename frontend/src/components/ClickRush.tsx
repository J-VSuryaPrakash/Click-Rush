function ClickRush() {
    return (
        <div className="
            relative
            flex
            h-full
            min-h-125
            flex-col
            items-center
            justify-center
            overflow-hidden
            bg-slate-950
            px-6
            text-center
        ">

            {/* Image */}
            <div className="mb-7 flex h-48 w-48 items-center justify-center">
                <img
                    src="https://ik.imagekit.io/uniwebsitecms/clickrush-removebg-preview.png"
                    alt="Click Rush"
                    className="h-full w-full object-contain"
                />
            </div>

            {/* Brand */}
            <div>
                <h1 className="
                    text-4xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-5xl
                ">
                    Click
                    <span className="text-violet-400">
                        Rush
                    </span>
                </h1>

                <div className="
                    mx-auto
                    mt-3
                    h-1
                    w-12
                    rounded-full
                    bg-violet-500
                " />
            </div>

            {/* Tagline */}
            <p className="
                mt-5
                text-sm
                font-semibold
                tracking-wide
                text-cyan-400
                sm:text-base
            ">
                TEST YOUR SPEED. BEAT YOUR SCORE.
            </p>

            <p className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-slate-400
            ">
                Click faster. Push your limits.
                <br />
                Become the fastest player.
            </p>

        </div>
    );
}

export default ClickRush;