import { GameState } from "../gameCore/gameState";

export function endPrelookPhase(gs: GameState): GameState {
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: false })),
        roundPhase: { type: "in-play", prevCard: null, prevPrevCard: null },
    };
}
