import { useReducer } from "react";
import { countNumFailsBeforeWin, createInitialGameState } from "../gameCore/gameState";
import { reducerFunction } from "../gameCore/reducerFunction";
import { Card } from "./Card";
import { CardView } from "./CardView";
import { GameOverView } from "./GameOverView";
import { PlayersAtTable } from "./PlayersAtTable";
import { RoundEndControls } from "./RoundEndControls";

export function PirateMemoryGame() {
    const initialGameState = createInitialGameState();
    const [gameState, dispatch] = useReducer(reducerFunction, initialGameState);

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
                <div className="centerCardOverlay">{gameState.treasureCardPile.length}</div>
            </div>
        ) :
        (
            <div className={`centreCard volcano`}>
                <div>🌋</div>
                <div className="centerCardOverlay">{countNumFailsBeforeWin(gameState)}</div>
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
        <PlayersAtTable gameState={gameState} />

        <div>{gameState.roundPhase.type}</div>
        <div>{gameState.treasureCardPile.length} treasure(s) remain</div>

        {
            gameState.roundPhase.type === "round-end" &&
            <RoundEndControls gameState={gameState} dispatch={dispatch} winnerIx={gameState.roundPhase.winnerIx} />
        }

        {
            gameState.roundPhase.type === "game-over" &&
            <GameOverView gameState={gameState} dispatch={dispatch} />
        }
    </div>
}


