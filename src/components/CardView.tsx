import { Card } from "./Card";

interface CardViewProps {
    card: Card;
}
export function CardView({ card }: CardViewProps): JSX.Element {
    return (
        <div className={`card ${card.creature} ${card.backing} faceDown`}>{card.creature}</div>
    );
}
