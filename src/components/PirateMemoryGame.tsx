import { allBackings, allCreatures, createDeck } from "./Card";
import { CardView } from "./CardView";

export function PirateMemoryGame() {
    const deck = createDeck();
    return <div className="game">
        <div className="cardGrid">
            {deck.map(c => (
                <CardView card={c} />
            ))}
            <div className={`centreCard volcano`}>🌋</div>
        </div>
    </div>;
}


