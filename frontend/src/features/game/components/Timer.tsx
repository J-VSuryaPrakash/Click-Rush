import { useEffect } from "react";
import StatCell from "./StatCell";

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
        <StatCell
            label="Time left"
            value={timeLeft}
            unit="s"
            alert={isDanger}
        />
    );
}

export default Timer;
