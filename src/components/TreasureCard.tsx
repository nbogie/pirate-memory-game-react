import { GameState } from "../gameCore/gameState";
import { animated, useSpring } from '@react-spring/web';

export function TreasureCard(props: { gameState: GameState; }) {

    const springs = useSpring({
        from: { rotateZ: -10 },
        to: { rotateZ: 0 },
        config: { damping: 0.1, frequency: 0.2 }

    })

    return (
        <animated.div
            className={`centreCard treasure`}
            style={{ ...springs }}>
            <div>💰</div>
            <div className="centerCardOverlay">{props.gameState.treasureCardPile.length}</div>
        </animated.div>

    );
}
