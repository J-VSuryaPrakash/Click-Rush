import { memo } from "react";
import StatCell from "./StatCell";

interface HighScoreProps {
    highScore: number;
}

function HighScore({ highScore }: HighScoreProps) {
    return (
        <StatCell label="Best score" value={highScore} />
    );
}

export default memo(HighScore);
