import { Action } from "../gameCore/action";
import { Card } from "./Card";

interface CardViewProps {
    card: Card;
    dispatch: React.Dispatch<Action>;
}
export function CardView({ card, dispatch }: CardViewProps): JSX.Element {
    const facingClass = card.isFaceUp ? "faceUp" : "faceDown";
    return (
        <div
            className={`card ${card.creature} ${card.backing} ${facingClass}`}
            onClick={() => dispatch({ type: "flip", clickedCard: card })}
        >
            {card.isFaceUp ? card.creature : ""}
        </div>
    );
}
