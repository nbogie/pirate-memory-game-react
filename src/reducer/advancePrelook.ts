import { seatPlayersAtTable } from "../components/seatPlayersAtTable";
import { Card } from "../gameCore/card";
import { GameState, PlayerState, turnAllCardsFaceDown } from "../gameCore/gameState";

export function advancePrelook(gs: GameState): GameState {

    if (gs.roundPhase.type !== "pre-look") {
        return gs;
    }

    const { who, stage } = gs.roundPhase;
    //shows a player their cards
    if (stage === "get-ready") {
        return {
            ...gs,
            roundPhase: { ...gs.roundPhase, stage: "look" },
            cards: cardsForPrelookForPlayer(gs, (who - 1) as 0 | 1 | 2 | 3)
        }
    }

    //finishes look phase for a player.  
    //turn cards all face down
    // if not at last player
    //    go next player
    // else
    //    move into game
    if (who < gs.players.length) {
        return {
            ...gs, cards: turnAllCardsFaceDown(gs.cards),
            roundPhase: {
                ...gs.roundPhase,
                who: who + 1 as 1 | 2 | 3 | 4,
                stage: "get-ready"
            }
        }
    }
    //all done with prelook for all players
    return { ...gs, cards: turnAllCardsFaceDown(gs.cards), roundPhase: { type: "in-play", prevCard: null, prevPrevCard: null } }
}

function cardsForPrelookForPlayer(gs: GameState, playerIx: 0 | 1 | 2 | 3): Card[] {
    const cardIndicesOnCompassPoints: Record<0 | 1 | 2 | 3, [number, number, number]> = {
        0: [1, 2, 3],
        1: [9, 13, 18],
        2: [20, 21, 22],
        3: [5, 10, 14]
    }
    const seatedPlayers = seatPlayersAtTable(gs.players);
    const seatsWithIndices = seatedPlayers.map((playerOrNull, ix) => ({ player: playerOrNull, indices: cardIndicesOnCompassPoints[ix as 0 | 1 | 2 | 3] }));
    const indicesForThesePlayers = seatsWithIndices.filter(({ player }) => player !== null).map(({ player, indices }) => indices);
    const cardIndicesForPlayer = indicesForThesePlayers[playerIx];
    return gs.cards.map((c, ix) => ({ ...c, isFaceUp: cardIndicesForPlayer.includes(ix) }));

}

