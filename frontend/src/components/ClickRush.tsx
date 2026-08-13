
function ClickRush() {
    return (
        <div className="flex h-full min-h-125 flex-col items-center justify-center bg-gray-900 px-10 text-center">

            {/* Image */}
            <div className="mb-8 flex h-48 w-48 items-center justify-center">
                {/* <img
                    src="/click-rush.png"
                    alt="Click Rush"
                    className="h-full w-full object-contain"
                /> */}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white">
                Click Rush
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                Test your speed.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
                Beat your score. Become the fastest player.
            </p>

        </div>
    )
}

export default ClickRush;