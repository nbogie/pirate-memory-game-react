import { Card, createDeck, shuffle } from "../components/Card";

export type RoundPhase =
    | { type: "pre-look" }
    | {
        type: "in-play",
        prevCard: Card | null,
        prevPrevCard: Card | null
    }
    | { type: "round-end", winnerIx: number }

export interface GameState {
    cards: Card[];
    players: PlayerState[];
    currentPlayerIx: number;
    roundPhase: RoundPhase;
}

export type PlayerState = { name: string, isStillIn: boolean }

export function createInitialGameState(): GameState {
    const deck = createDeck();
    const cardsToPreview = shuffle(deck).slice(0, 3);
    cardsToPreview.forEach(c => c.isFaceUp = true)
    const gameState: GameState = {
        cards: shuffle(deck),
        players: createPlayers(["Larry", "Curly", "Mo"]),
        currentPlayerIx: 0,
        roundPhase: { type: "pre-look" }
    };
    return gameState;
}

function createPlayers(names: string[]): PlayerState[] {
    return names.map(name => ({ name, isStillIn: true }))
}

export function getPlayerByPosIndex(gameState: GameState, ix: number): PlayerState {
    return gameState.players[ix];

}
export function countNumFailsBeforeWin(gameState: GameState): number {
    return gameState.players.filter(p => p.isStillIn).length - 1;

}