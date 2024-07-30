import { PlayerIndex } from "../gameCore/gameState.js";
import { playerAreaFor } from "./PlayerAtTableEdge";



export interface PlaceholderAtTableEdge {
    ix: number;
}
export function PlaceholderAtTableEdge({ ix }: PlaceholderAtTableEdge) {
    return (
        <div
            key={ix}
            className={"playerArea placeholder " + playerAreaFor(ix as PlayerIndex)}
        >
            <div>
            </div>
        </div>
    );
}
