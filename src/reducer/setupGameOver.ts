import { GameState, turnAllCardsFaceUp } from "../gameCore/gameState";



export function setupGameOver(gs: GameState): GameState {
    return {
        ...gs,
        cards: turnAllCardsFaceUp(gs.cards),
        roundPhase: { type: "game-over" },
    };
}
