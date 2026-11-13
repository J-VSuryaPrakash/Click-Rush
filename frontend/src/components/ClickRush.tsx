function ClickRush() {
    return (
        <div className="flex h-full min-h-[560px] flex-col justify-center gap-10 bg-rush-panel px-10 py-16">

            {/* Image */}
            <img
                src="https://ik.imagekit.io/uniwebsitecms/clickrush-removebg-preview.png"
                alt="Click Rush"
                width={96}
                height={96}
                className="h-24 w-24 object-contain"
            />

            <div>
                {/* Brand */}
                <p className="text-5xl font-semibold leading-none tracking-[-0.04em] text-rush-ink lg:text-6xl">
                    Click<span className="text-rush-accent">Rush</span>
                </p>

                {/* Tagline */}
                <p className="mt-5 text-xl font-medium text-rush-ink">
                    Test your speed. Beat your score.
                </p>

                <p className="mt-2 max-w-sm text-base text-rush-muted">
                    Click faster. Push your limits.
                    <br />
                    Become the fastest player.
                </p>
            </div>

        </div>
    );
}

export default ClickRush;
