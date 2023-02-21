import { GameState, TreasureCard } from "../gameCore/gameState";
import { animated, useSpring } from '@react-spring/web';
import { Dispatch } from "react";
import { Action } from "../gameCore/action";

interface TreasureCardViewProps {
    gameState: GameState;
    dispatch: Dispatch<Action>;
}
export function TreasureCardView(props: TreasureCardViewProps) {

    const springs = useSpring({
        from: { rotateZ: -10 },
        to: { rotateZ: 0 },
        config: { damping: 0.1, frequency: 0.2 }
    })

    return (
        <animated.div
            className={`centreCard treasure`}
            style={{ ...springs }}
        // onClick={() => props.dispatch({ type: "award-treasure", winnerIx: -1 })}
        >
            <div>💰</div>
            <div className="centerCardOverlay">{props.gameState.treasureCardPile.length}</div>
        </animated.div>

    );
}
