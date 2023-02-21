import { useReducer } from "react";
import { countNumFailsBeforeWin, createInitialGameState, NumPlayers } from "../gameCore/gameState";
import { reducerFunction } from "../gameCore/reducerFunction";
import { Card } from "./Card";
import { CardView } from "./CardView";
import { GameOverView } from "./GameOverView";
import { PlayersAtTableMini } from "./PlayersAtTableMini";
import { PlayersAtTableEdges } from "./PlayersAtTableEdges";
import { TreasureCardView } from "./TreasureCardView";

interface PirateMemoryGameProps {
    numPlayers: NumPlayers;
}

export function PirateMemoryGame(props: PirateMemoryGameProps) {
    const initialGameState = createInitialGameState(props.numPlayers);
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
            <TreasureCardView {...{ gameState, dispatch }} />
        ) :
        (
            <div className={`centreCard volcano`}>
                <div>🌋</div>
                <div className="centerCardOverlay">{countNumFailsBeforeWin(gameState)}</div>
            </div>
        );


    return (
        <div className="game">

            <div className="gameTable">
                <PlayersAtTableEdges gameState={gameState} />

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
            </div>
            <div>
                <button onClick={() => dispatch({ type: "cheat-set-game-over" })}>Set Game Over</button>
                <div>{gameState.roundPhase.type}</div>

                {
                    gameState.roundPhase.type === "game-over" &&
                    <GameOverView gameState={gameState} dispatch={dispatch} />
                }
            </div>
        </div>
    );
}
