import { useEffect, useMemo, useReducer, useState } from "react";
import useSound from 'use-sound';
import goodNotes from "../assets/goodNotes.wav";
import wrongNotes from "../assets/wrongNotes.wav";
import { Card } from "../gameCore/card";
import { countNumFailsBeforeWin, createInitialGameState, NumPlayers } from "../gameCore/gameState";
import { reducerFunction } from "../reducer/reducerFunction";
import { pick } from "../utils/pick";
import { CardView } from "./CardView";
import { GameOverView } from "./GameOverView";
import { PlayersAtTableEdges } from "./PlayersAtTableEdges";
import { TreasureCardView } from "./TreasureCardView";
// import { OLDPlayersAtTableMini } from "./OLDPlayersAtTableMini";

interface PirateMemoryGameProps {
    numPlayers: NumPlayers;
}

export function PirateMemoryGame(props: PirateMemoryGameProps) {
    const [soundIsOn, setSoundIsOn] = useState(true);

    const [playGoods] = useSound(goodNotes, {
        sprite:
        {
            good1: [0, 2500],
            good2: [2500, 2500],
            good3: [5040, 2500],
            good4: [7555, 2500],
            good5: [10090, 2500],
            good6: [12620, 2500]
        }
    });
    const [playBads] = useSound(wrongNotes, {
        sprite:
        {
            bad1: [0, 2400],
            bad2: [2430, 2090],
            bad3: [4530, 2530],
            bad4: [7088, 2700],
        }
    });


    const soundPlayer = useMemo(() => ({

        play: function (soundToPlay: "match" | "no-match") {

            function playGoodSound() {
                playGoods({ id: "good" + pick([1, 2, 3, 4, 5, 6]) });
            }

            function playBadSound() {
                playBads({ id: "bad" + pick([1, 2, 3, 4]) });
            }

            if (soundToPlay === "match") {
                playGoodSound();
            } else {
                playBadSound();
            }
        }
    }), [playGoods, playBads]);

    const [notesPlayedUpToTime, setNotesPlayedUpToTime] = useState<number>(0);

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

    //"Consume" any notes sequenced by the reducer but as yet unplayed notes - sounding them
    useEffect(() => {
        // const allNotes = [...gameState.notesToPlay];
        const mostRecentNote = gameState.notesToPlay.at(-1);
        if (mostRecentNote) {
            const { note, timeIssued } = mostRecentNote;
            if (notesPlayedUpToTime < timeIssued) {
                if (soundIsOn) {
                    soundPlayer.play(note);
                }
                setNotesPlayedUpToTime(timeIssued);
            }
        }
    }, [gameState.notesToPlay]);

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
