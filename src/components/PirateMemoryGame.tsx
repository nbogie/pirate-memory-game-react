import { useReducer } from "react";
import { countNumFailsBeforeWin, createInitialGameState } from "../gameCore/gameState";
import { reducerFunction } from "../gameCore/reducerFunction";
import { Card } from "./Card";
import { CardView } from "./CardView";
import { GameOverView } from "./GameOverView";
import { PlayersAtTable } from "./PlayersAtTable";
import { RoundEndControls } from "./RoundEndControls";
import { TreasureCard } from "./TreasureCard";

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
            <TreasureCard {...{ gameState }} />
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
        {
            gameState.roundPhase.type === "round-end" &&
            <RoundEndControls gameState={gameState} dispatch={dispatch} winnerIx={gameState.roundPhase.winnerIx} />
        }
        <PlayersAtTable gameState={gameState} />

        <div>{gameState.roundPhase.type}</div>
        <div>{gameState.treasureCardPile.length} treasure(s) remain</div>


        {
            gameState.roundPhase.type === "game-over" &&
            <GameOverView gameState={gameState} dispatch={dispatch} />
        }
    </div>
}
