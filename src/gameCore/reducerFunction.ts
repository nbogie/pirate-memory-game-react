import { createDeck } from "../components/Card";
import {
    Action
} from "./action";
import { flipCard } from "./flipCard";
import { createInitialGameState, GameState, getPlayerByPosIndex, PlayerState } from "./gameState";

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
        default: throw new UnreachableCodeError(action, "unreachable");
    }
}

class UnreachableCodeError extends Error {
    constructor(myNever: never, message: string) {
        super(message);
    }
}

function awardTreasure(gs: GameState, winnerIx: number): GameState {
    const treasureCardsCopy = [...gs.treasureCardPile];

    const treasureCard = treasureCardsCopy.pop();
    if (!treasureCard) {
        throw new Error("Trying to award treasure when none left!");
    }

    const player = getPlayerByPosIndex(gs, winnerIx);
    const newPlayers: PlayerState[] = [...gs.players].map(p => p.name === player.name ? ({ ...p, treasures: [...p.treasures, treasureCard] }) : p);

    const nextGameState = {
        ...gs,
        treasureCardPile: treasureCardsCopy,
        players: newPlayers,
    };

    if (treasureCardsCopy.length === 0) {
        return setupGameOver(nextGameState);
    } else {
        return setupNextRound(nextGameState);
    }
}

function startNewGame(gs: GameState): GameState {
    return createInitialGameState();
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

function endPrelookPhase(gs: GameState): GameState {
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: false })),
        roundPhase: { type: "in-play", prevCard: null, prevPrevCard: null },
    }
}

function setupGameOver(gs: GameState): GameState {
    return {
        ...gs,
        cards: gs.cards.map(c => ({ ...c, isFaceUp: true })),
        roundPhase: { type: "game-over" },
    }
}
