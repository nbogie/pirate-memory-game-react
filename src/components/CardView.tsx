import { Action } from "../gameCore/action";
import { Card } from "./Card";

interface CardViewProps {
    card: Card;
    dispatch: React.Dispatch<Action>;
    isLatestFlip: boolean;
    isPreviousFlip: boolean;
}
export function CardView({ card, dispatch, isLatestFlip, isPreviousFlip }: CardViewProps): JSX.Element {
    const facingClass = card.isFaceUp ? "faceUp" : "faceDown";
    const highlightClass = isLatestFlip ? "latest" : (isPreviousFlip ? "previous" : "");
    return (
        <div
            className={`card ${card.creature} ${card.backing} ${facingClass} ${highlightClass}`}
            onClick={() => dispatch({ type: "flip", clickedCard: card })}
        >
            {card.isFaceUp ? card.creature : ""}
        </div>
    );
}
