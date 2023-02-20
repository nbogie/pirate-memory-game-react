import { Action } from "../gameCore/action";
import { GameState, PlayerState } from "../gameCore/gameState";

interface GameOverViewProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
}
export function GameOverView({ gameState, dispatch }: GameOverViewProps) {
    const scoringReport: ScoringReport = createScoringReport(gameState);
    return (
        <div className="gameOver">
            {scoringReport.players.map(p =>
                <div className="playerScore">{p.name}: {p.total} ({p.treasures.map(t => t.value).join(", ")})</div>
            )}

            <button onClick={() => dispatch({ type: "start-new-game" })}>Start game</button>
        </div>
    );
}

function createScoringReport(gameState: GameState): ScoringReport {
    const copyOfPlayers: PlayerStateWithScore[] = [...gameState.players].map(ps => ({
        ...ps,
        total: ps.treasures.reduce((tot, tresCard) => tot + tresCard.value, 0)
    }));
    copyOfPlayers.sort((a, b) => a.total < b.total ? -1 : 1).reverse();
    return { players: copyOfPlayers }
}
type PlayerStateWithScore = PlayerState & Score
interface ScoringReport {
    players: PlayerStateWithScore[]
}
interface Score {
    total: number;
}