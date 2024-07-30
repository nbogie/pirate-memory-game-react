import { animated, useSpring } from '@react-spring/web';
import { Dispatch } from "react";
import { Action } from "../reducer/action";
import { GameState } from "../gameCore/gameState";

interface TreasureCardViewProps {
    gameState: GameState;
    dispatch: Dispatch<Action>;
}
export function TreasureCardView(props: TreasureCardViewProps) {

    const { gameState, dispatch } = props;

    const _alternativeUnusedConfig = {
        from: { rotateZ: -10 },
        to: { rotateZ: 0 },
        config: { damping: 0.1, frequency: 0.2 }
    }
    
    const swellSprings = useSpring({
        from: { scale: 0.97 },
        to: { scale: 1 },
        config: { damping: 0, frequency: 0.8 }
    })

    if (gameState.roundPhase.type !== "round-end") {
        return <div>ERROR: TreasureCardView expects round-end but got {gameState.roundPhase.type} </div>
    }

    const winnerIx = gameState.roundPhase.winnerIx;
    
    return (
        <animated.div
            className={`centreCard treasure`}
            onClick={() => dispatch({ type: "award-treasure", winnerIx: winnerIx })}
            style={{ ...swellSprings }}
        >
            <div>💰</div>
            <div className="centerCardOverlay">{props.gameState.treasureCardPile.length}</div>
        </animated.div >

    );
}
