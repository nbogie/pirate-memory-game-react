import { Action } from "../gameCore/action";
import { Card } from "./Card";
import { animated, useSpring } from '@react-spring/web'

interface CardViewProps {
    card: Card;
    dispatch: React.Dispatch<Action>;
    isLatestFlip: boolean;
    isPreviousFlip: boolean;
}
export function CardView({ card, dispatch, isLatestFlip, isPreviousFlip }: CardViewProps): JSX.Element {
    const springs = useSpring({
        transform: `perspective(600px) rotateX(${card.isFaceUp ? 0 : 180}deg)`
    });
    const facingClass = card.isFaceUp ? "faceUp" : "faceDown";
    const highlightClass = isLatestFlip ? "latest" : (isPreviousFlip ? "previous" : "");
    return (
        <animated.div
            style={{ ...springs }}
            className={`card ${card.creature} ${card.backing} ${facingClass} ${highlightClass}`}
            onClick={() => dispatch({ type: "flip", clickedCard: card })}
        >
            {card.isFaceUp ? card.creature : ""}
        </animated.div>
    );
}
