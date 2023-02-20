import { allBackings, allCreatures, Card, createDeck } from "./Card";

export function PirateMemoryGame() {
    const deck = createDeck();
    return <div className="game">
        <div className="cardGrid">
            {deck.map(c => (
                <div className={`card ${c.creature} ${c.backing} faceDown`}>{c.creature}</div>
            ))}
            <div className={`centreCard volcano`}>🌋</div>
        </div>
    </div>;
}
