import { Action } from "../gameCore/action";
import { GameState, getPlayerByPosIndex, PlayerState } from "../gameCore/gameState";

interface RoundEndControlsProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    winnerIx: number;
}
export function RoundEndControls({ gameState, dispatch, winnerIx }: RoundEndControlsProps) {
    const winner: PlayerState = getPlayerByPosIndex(gameState, winnerIx);
    return (
        <>
            <button onClick={() => dispatch({ type: "award-treasure", winnerIx: winnerIx })}>Award Treasure to {winner.name}!</button>
        </>
    );
}
