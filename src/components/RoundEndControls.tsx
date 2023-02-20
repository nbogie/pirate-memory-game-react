import { Action } from "../gameCore/action";
import { GameState, getPlayerByPosIndex } from "../gameCore/gameState";

interface RoundEndControlsProps {
    gameState: GameState;
    dispatch: React.Dispatch<Action>;
    winnerIx: number;
}
export function RoundEndControls({ gameState, dispatch, winnerIx }: RoundEndControlsProps) {
    return (
        <>
            <p>Winner: {getPlayerByPosIndex(gameState, winnerIx).name}</p>
            <button onClick={() => dispatch({ type: "award-treasure", winnerIx: winnerIx })}>award treasure!</button>
        </>
    );
}
