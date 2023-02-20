import { pick } from "../utils/pick";

export interface Card {
    backing: Backing;
    creature: Creature;
    isFaceUp: boolean;
}


export const allBackings = ["lava", "water", "desert", "flowers", "jungle"] as const;
export type Backing = typeof allBackings[number];
export const allCreatures = ["🐧", "🐢", "🐙", "🐋", "🦀"] as const;
export type Creature = typeof allCreatures[number];

export function createDeck() {
    const cards: Card[] = [];
    for (const backing of allBackings) {
        for (const creature of allCreatures) {
            const c: Card = {
                backing,
                creature,
                isFaceUp: pick([true, false])
            };
            cards.push(c);
        }
    }
    const shuffled = shuffle(cards);
    shuffled.pop();
    return shuffled;
}
export function shuffle<T>(arr: T[]): T[] {
    return [...arr.sort(() => Math.random() < 0.5 ? -1 : 1)];
}


