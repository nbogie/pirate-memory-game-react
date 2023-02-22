import { GameState, turnAllCardsFaceDown } from "../gameCore/gameState";

export function endPrelookPhase(gs: GameState): GameState {
    return {
        ...gs,
        cards: turnAllCardsFaceDown(gs.cards),
        roundPhase: { type: "in-play", prevCard: null, prevPrevCard: null },
    };
}
