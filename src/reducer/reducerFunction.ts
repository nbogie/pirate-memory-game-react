import {
    Action
} from "./action";
import { awardTreasure } from "./awardTreasure";
import { endPrelookPhase } from "./endPrelookPhase";
import { flipCard } from "./flipCard";
import { GameState } from "../gameCore/gameState";
import { setupGameOver } from "./setupGameOver";
import { startNewGame } from "./startNewGame";

export function reducerFunction(gs: GameState, action: Action): GameState {
    switch (action.type) {
        case "flip":
            if (gs.roundPhase.type === "in-play") {
                return flipCard(gs, action);
            } else if (gs.roundPhase.type === "pre-look") {
                return endPrelookPhase(gs);
            } else {
                return gs;
            }
        case "start-new-game":
            return startNewGame(gs);
        case "award-treasure":
            return awardTreasure(gs, action.winnerIx);
        case "cheat-set-game-over":
            return setupGameOver(gs);
        default: throw new UnreachableCodeError(action, "unreachable");
    }
}

class UnreachableCodeError extends Error {
    constructor(myNever: never, message: string) {
        super(message);
    }
}
