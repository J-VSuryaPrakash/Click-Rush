function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-black tracking-tight text-white">
                    Click<span className="text-violet-400">Rush</span>
                </h1>

                <div className="mt-5 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-violet-500" />

                <p className="mt-3 text-xs text-slate-500">
                    Loading...
                </p>
            </div>
        </div>
    );
}

export default Loading;