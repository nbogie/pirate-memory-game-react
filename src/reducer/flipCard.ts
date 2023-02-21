import { Card } from "../gameCore/card";
import { GameState, getPlayerByPosIndex, PlayerState } from "../gameCore/gameState";
import { FlipCardAction } from "./action";

export function flipCard(gs: GameState, action: FlipCardAction): GameState {
    if (gs.roundPhase.type !== "in-play") {
        return gs;
    }

    const newCards = [...gs.cards];
    const foundIndex = newCards.findIndex(c => c.id === action.clickedCard.id);
    newCards[foundIndex] = { ...newCards[foundIndex], isFaceUp: true };

    const playerStaysIn = (gs.roundPhase.prevCard === null || isMatch(gs.roundPhase.prevCard, action.clickedCard));
    const newPlayers = !playerStaysIn ?
        eliminatePlayer(gs.players, gs.currentPlayerIx) : gs.players;
    const lastPlayer: PlayerState = getPlayerByPosIndex(gs, gs.currentPlayerIx);


    const isRoundOver = newPlayers.filter(p => p.isStillIn).length <= 1;

    const newCurrentPlayerIx = [...newPlayers, ...newPlayers].findIndex((p, ix) => ix > gs.currentPlayerIx && p.isStillIn) % newPlayers.length;

    return {
        ...gs,
        currentPlayerIx: newCurrentPlayerIx,
        players: newPlayers,
        cards: newCards,
        playerToStartNextRound: gs.playerToStartNextRound ?? (playerStaysIn ? null : lastPlayer),
        roundPhase: isRoundOver ? {
            type: "round-end", winnerIx: newCurrentPlayerIx
        } : {
            type: "in-play",
            prevCard: action.clickedCard,
            prevPrevCard: gs.roundPhase.prevCard,
        }
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
