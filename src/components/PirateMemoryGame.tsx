import { useReducer, useState } from "react";
import { Card } from "../gameCore/card";
import { countNumFailsBeforeWin, createInitialGameState, NumPlayers } from "../gameCore/gameState";
import { reducerFunction } from "../reducer/reducerFunction";
import { CardView } from "./CardView";
import { GameOverView } from "./GameOverView";
import { PlayersAtTableEdges } from "./PlayersAtTableEdges";
import { TreasureCardView } from "./TreasureCardView";
import { useSequencedSoundConsumer } from "./useSequencedSoundConsumer";
// import { OLDPlayersAtTableMini } from "./OLDPlayersAtTableMini";

interface PirateMemoryGameProps {
    numPlayers: NumPlayers;
}

export function PirateMemoryGame(props: PirateMemoryGameProps) {
    const [soundIsOn, setSoundIsOn] = useState(true);

    const initialGameState = createInitialGameState(props.numPlayers);

    const [gameState, dispatch] = useReducer(reducerFunction, initialGameState);

    const soundPlayer = useSequencedSoundConsumer(gameState.scheduledNotes, soundIsOn);

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
                <button onClick={() => soundPlayer.play("match")}>Play Good</button>
                <button onClick={() => soundPlayer.play("no-match")}>Play Bad</button>
                <button onClick={() => setSoundIsOn(prev => !prev)}>Sound is {soundIsOn ? "on" : "off"}</button>

                {/* <OLDPlayersAtTableMini gameState={gameState} /> */}
                <div>{gameState.roundPhase.type}</div>
                {
                    gameState.roundPhase.type === "game-over" &&
                    <GameOverView gameState={gameState} dispatch={dispatch} />
                }
            </div>
        </div>
    );
}


