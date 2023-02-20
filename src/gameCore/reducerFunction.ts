import {
    Action
} from "./action";
import { flipCard } from "./flipCard";
import { GameState } from "./gameState";

export function reducerFunction(gs: GameState, action: Action): GameState {
    switch (action.type) {
        case "flip":
            if (gs.roundPhase.type === "in-play") {
                return flipCard(gs, action);
            } else {
                return setupNextRound(gs);
            }
        case "start-first-round":
            return setupNextRound(gs);
        default: throw new Error("unexpected action type: " + JSON.stringify(action));
    }
}

function setupNextRound(gs: GameState): GameState {
    const startingPlayer = gs.playerToStartNextRound;
    const currentPlayerIx = startingPlayer ? gs.players.findIndex(ps => ps.name === startingPlayer.name) : 0;
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: false })),
        players: gs.players.map(p => ({ ...p, isStillIn: true })),
        currentPlayerIx,
        playerToStartNextRound: null,
        roundPhase: { type: "in-play", prevCard: null, prevPrevCard: null },
    };
}

