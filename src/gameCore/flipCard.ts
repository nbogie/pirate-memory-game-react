import { Card } from "../components/Card";
import { FlipCardAction } from "./action";
import { GameState, PlayerState } from "./gameState";

export function flipCard(gs: GameState, action: FlipCardAction): GameState {
    const newCards = [...gs.cards];
    const foundIndex = newCards.findIndex(c => c.id === action.clickedCard.id);
    newCards[foundIndex] = { ...newCards[foundIndex], isFaceUp: true };

    const playerStaysIn = (gs.prevCard === null || isMatch(gs.prevCard, action.clickedCard));
    const newPlayers = !playerStaysIn ?
        eliminatePlayer(gs.players, gs.currentPlayerIx) : gs.players;
    const isRoundOver = newPlayers.filter(p => p.isStillIn).length <= 1;

    const newCurrentPlayerIx = [...newPlayers, ...newPlayers].findIndex((p, ix) => ix > gs.currentPlayerIx && p.isStillIn) % newPlayers.length;

    return {
        ...gs,
        currentPlayerIx: newCurrentPlayerIx,
        players: newPlayers,
        cards: newCards,
        prevCard: action.clickedCard,
        prevPrevCard: gs.prevCard,
        roundPhase: isRoundOver ? { type: "round-end", winnerIx: newCurrentPlayerIx } : gs.roundPhase
    };
}
function isMatch(a: Card, b: Card): boolean {
    return a.creature === b.creature || a.backing === b.backing;
}
function eliminatePlayer(
    players: PlayerState[],
    currentPlayerIx: number): PlayerState[] {
    const copyOfPlayers = [...players];
    const newP = { ...copyOfPlayers[currentPlayerIx] };
    copyOfPlayers[currentPlayerIx] = newP;
    newP.isStillIn = false;
    return copyOfPlayers;
}
