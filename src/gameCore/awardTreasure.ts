import { GameState, getPlayerByPosIndex, PlayerState } from "./gameState";
import { setupGameOver } from "./setupGameOver";

export function awardTreasure(gs: GameState, winnerIx: number): GameState {
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


export function setupNextRound(gs: GameState): GameState {
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