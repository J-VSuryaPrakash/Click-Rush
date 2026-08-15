import { useEffect } from "react";

interface TimerProps {
    gameStatus: string;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

function Timer({
    gameStatus,
    timeLeft,
    setTimeLeft,
}: TimerProps) {

    useEffect(() => {
        if (gameStatus !== "playing") return;

        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [gameStatus, timeLeft, setTimeLeft]);

    const isDanger = timeLeft <= 10 && timeLeft > 0;

    return (
        <div className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            rounded-xl
            border border-amber-500/20
            bg-slate-950
            p-4
        ">

            <span className={`
                mb-3
                text-xs
                font-bold
                tracking-[0.2em]
                ${isDanger ? "text-rose-400" : "text-amber-400"}
            `}>
                TIME
            </span>

            <div
                className={`
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    font-black
                    transition-colors
                    ${
                        isDanger
                            ? "border-rose-500 text-rose-400"
                            : "border-amber-500/50 text-amber-400"
                    }
                `}
            >
                {timeLeft}
            </div>

        </div>
    );
}

export default Timer;