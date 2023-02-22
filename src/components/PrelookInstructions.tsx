import { Dispatch } from "react";
import { GameState } from "../gameCore/gameState";
import { PrelookRoundPhase } from "../gameCore/roundPhase";
import { Action } from "../reducer/action";

export type GameStateInPrelookRoundPhase = GameState & { roundPhase: PrelookRoundPhase; };
export function PrelookInstructions<T extends GameStateInPrelookRoundPhase>(props: { gameState: T; dispatch: Dispatch<Action>; }): JSX.Element {
    const { who, stage } = props.gameState.roundPhase;

    return <div className="prelookInstructions">
        <p>
            Player {who}:
        </p>
        {stage === "get-ready" ?
            <>
                <p>Get ready to see your cards.</p>
                <p>All other players look away!</p>
            </> :
            <p>Memorise your cards.</p>}
        <button onClick={() => props.dispatch({ type: "advance-prelook" })}>{stage === "get-ready" ? "Show me!" : "I'm done!"}</button>
    </div>;
}
