import { createDeck } from "../components/Card";
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
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: false })),
        players: gs.players.map(p => ({ ...p, isStillIn: true })),
        prevCard: null,
        prevPrevCard: null,
        roundPhase: { type: "in-play" }//TODO: rounds left?,

    };
}

