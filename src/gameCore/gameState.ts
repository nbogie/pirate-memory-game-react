import { Card, createDeck } from "../components/Card";

export type RoundPhase = { type: "pre-look" } | { type: "in-play" } | { type: "round-end", winnerIx: number }

export interface GameState {
    cards: Card[];
    prevCard: Card | null;
    players: PlayerState[];
    currentPlayerIx: number;
    roundPhase: RoundPhase;
}

export type PlayerState = { name: string, isStillIn: boolean }

export function createInitialGameState(): GameState {
    const gameState: GameState = {
        cards: createDeck(),
        players: createPlayers(["Larry", "Curly", "Mo"]),
        prevCard: null,
        currentPlayerIx: 0,
        roundPhase: { type: "in-play" }
    };
    return gameState;
}

function createPlayers(names: string[]): PlayerState[] {
    return names.map(name => ({ name, isStillIn: true }))
}

export function getPlayerByPosIndex(gameState: GameState, ix: number): PlayerState {
    console.log("getPlayerByPosIndex", ix);
    return gameState.players[ix];

}