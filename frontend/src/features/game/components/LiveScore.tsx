import StatCell from "./StatCell";

interface LiveScoreProps {
    liveScore: number;
}

function LiveScore({ liveScore }: LiveScoreProps) {
    return (
        <StatCell label="Score" value={liveScore} />
    );
}

export default LiveScore;
