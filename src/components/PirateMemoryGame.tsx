import { useReducer } from "react";
import { countNumFailsBeforeWin, createInitialGameState, GameState, getPlayerByPosIndex } from "../gameCore/gameState";
import { reducerFunction } from "../gameCore/reducerFunction";
import { Card } from "./Card";
import { CardView } from "./CardView";

export function PirateMemoryGame() {
    const initialGameState = createInitialGameState();
    const [gameState, dispatch] = useReducer(reducerFunction, initialGameState);
    const currentPlayer = gameState.players[gameState.currentPlayerIx];
    const numFailsBeforeWin = countNumFailsBeforeWin(gameState);
    function isCardLatestFlip(card: Card): boolean {
        const roundPhase = gameState.roundPhase;
        return roundPhase.type === "in-play" && roundPhase.prevCard?.id === card.id
    }
    function isCardPreviousFlip(card: Card): boolean {
        const roundPhase = gameState.roundPhase;
        return roundPhase.type === "in-play" && roundPhase.prevPrevCard?.id === card.id
    }

    const centreCard = gameState.roundPhase.type === "round-end" ?
        (
            <div className={`centreCard treasure`}>
                <div>💰</div>
            </div>
        ) :
        (
            <div className={`centreCard volcano`}>
                <div>🌋</div>
                <div className="overlay">{numFailsBeforeWin}</div>
            </div>
        );


    return <div className="game">
        <div className="cardGrid">
            {
                gameState.cards.map(c => <CardView
                    card={c}
                    dispatch={dispatch}
                    key={c.id}
                    isLatestFlip={isCardLatestFlip(c)}
                    isPreviousFlip={isCardPreviousFlip(c)}
                />)

            }
            {centreCard}
        </div>
        <div>
            Whose turn? {currentPlayer.name}
            <br />
            {gameState.players.map(p => <span
                key={p.name}
                className={`player ${p.isStillIn ? "" : "eliminated"}`}
            >
                {p.name}
            </span>
            )}
        </div>
        <div>{gameState.roundPhase.type}</div>
        {gameState.roundPhase.type === "round-end" && (<>
            <p>Winner: {getPlayerByPosIndex(gameState, gameState.roundPhase.winnerIx).name}</p>
            <button onClick={() => dispatch({ type: "start-first-round" })}>start next round</button>
        </>)}
    </div>
}


