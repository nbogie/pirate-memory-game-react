import { GameState } from "../gameCore/gameState";

interface PlayersAtTableProps {
    gameState: GameState;
}
export function PlayersAtTable({ gameState }: PlayersAtTableProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];
    return (
        <div>
            Whose turn? {currentPlayer.name}
            <br />
            {gameState.players.map(p => <span
                key={p.name}
                className={`player ${p.isStillIn ? "" : "eliminated"}`}
            >
                {p.name}
            </span>
            )}
        </div>

    );
}
