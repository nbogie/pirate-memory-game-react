import { Card } from "./Card";

interface CardViewProps {
    card: Card;
}
export function CardView({ card }: CardViewProps): JSX.Element {
    const facingClass = card.isFaceUp ? "faceUp" : "faceDown";
    return (
        <div
            className={`card ${card.creature} ${card.backing} ${facingClass}`}
        >
            {card.isFaceUp ? card.creature : ""}
        </div>
    );
}
