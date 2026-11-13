import Spinner from "./Spinner";

function Loading() {
    return (
        <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center bg-rush-paper">
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold tracking-[-0.03em] text-rush-ink">
                    Click<span className="text-rush-accent">Rush</span>
                </p>

                <Spinner />

                <p className="text-sm text-rush-muted">
                    Loading...
                </p>
            </div>
        </div>
    );
}

export default Loading;
