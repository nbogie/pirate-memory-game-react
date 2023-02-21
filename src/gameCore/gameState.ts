import { Card, createDeck } from "./card";
import { shuffle } from "../utils/shuffle";
import { sample } from "../utils/sample";

export type NumPlayers = 2 | 3 | 4;

export type RoundPhase =
    | { type: "pre-look" }
    | {
        type: "in-play",
        prevCard: Card | null,
        prevPrevCard: Card | null
    }
    | { type: "round-end", winnerIx: number }
    | { type: "game-over" }

export interface GameState {
    cards: Card[];
    players: PlayerState[];
    playerToStartNextRound: PlayerState | null;
    currentPlayerIx: number;
    roundPhase: RoundPhase;
    treasureCardPile: TreasureCard[];
}

export type TreasureCard = { value: number };

export type PlayerState = { name: string, isStillIn: boolean, treasures: TreasureCard[] }

export function createInitialGameState(numPlayers: NumPlayers): GameState {
    const deck = createDeck();
    const players = createRandomPlayers(numPlayers);

    const cardsToPreview = shuffle(deck).slice(0, 3);
    cardsToPreview.forEach(c => c.isFaceUp = true)
    const gameState: GameState = {
        cards: shuffle(deck),
        players,
        currentPlayerIx: 0,
        playerToStartNextRound: null,
        roundPhase: { type: "pre-look" },
        treasureCardPile: createTreasureCardPile()
    };
    return gameState;
}

function createRandomPlayers(numPlayers: NumPlayers) {
    return createPlayers(sample(["Larry", "Curly", "Mo", "Ted"], numPlayers))
}

function createPlayers(names: string[]): PlayerState[] {
    return names.map(name => ({ name, isStillIn: true, treasures: [] }))
}

export function getPlayerByPosIndex(gameState: GameState, ix: number): PlayerState {
    return gameState.players[ix];

}
export function countNumFailsBeforeWin(gameState: GameState): number {
    return gameState.players.filter(p => p.isStillIn).length - 1;
}

function createTreasureCardPile(): TreasureCard[] {
    const treasureValues = [1, 1, 2, 2, 2, 3, 4];
    return shuffle(treasureValues).map(v => ({ value: v }))
}
