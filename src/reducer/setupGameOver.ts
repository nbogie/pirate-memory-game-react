import { GameState } from "../gameCore/gameState";



export function setupGameOver(gs: GameState): GameState {
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: true })),
        roundPhase: { type: "game-over" },
    };
}
