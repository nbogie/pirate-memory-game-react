import { GameState, PlayerState } from "../gameCore/gameState";
import { seatPlayersAtTable } from "./seatPlayersAtTable";
import { PlayerAtTableEdge } from "./PlayerAtTableEdge";
import { PlaceholderAtTableEdge } from "./PlaceholderAtTableEdge";

interface PlayersAtTableEdgesProps {
    gameState: GameState;
}
export function PlayersAtTableEdges({ gameState }: PlayersAtTableEdgesProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];

    const playersAndEmptySeats: (PlayerState | null)[] = seatPlayersAtTable(gameState.players);
    return (
        //No container as these are going into a grid along with some other siblings
        <>
            {
                playersAndEmptySeats.map((p, ix) => p === null ? <PlaceholderAtTableEdge ix={ix} key={ix} /> : <PlayerAtTableEdge player={p} currentPlayer={currentPlayer} ix={ix} key={ix} />)
            }
        </>
    );
}


