import { pick } from "../utils/pick";

export interface Card {
    backing: Backing;
    creature: Creature;
    isFaceUp: boolean;
    id: number;
}


export const allBackings = ["lava", "water", "desert", "flowers", "jungle"] as const;
export type Backing = typeof allBackings[number];
export const allCreatures = ["🐧", "🐢", "🐙", "🐋", "🦀"] as const;
export type Creature = typeof allCreatures[number];

export function createDeck() {
    type IDlessCard = Omit<Card, "id">;

    const cards: IDlessCard[] = [];
    for (const backing of allBackings) {
        for (const creature of allCreatures) {
            const c: IDlessCard = {
                backing,
                creature,
                isFaceUp: pick([true, false])
            };
            cards.push(c);
        }
    }
    const shuffled = shuffle(cards);
    shuffled.pop();
    const cardsWithIDs: Card[] = shuffled.map((c, ix) => ({ ...c, id: ix + 1 }))
    return cardsWithIDs;
}

export function shuffle<T>(arr: T[]): T[] {
    return [...arr.sort(() => Math.random() < 0.5 ? -1 : 1)];
}


