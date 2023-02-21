import { shuffle } from "../utils/shuffle";

export interface Card {
    backing: Backing;
    creature: Creature;
    isFaceUp: boolean;
    id: number;
}

export const allBackings = ["lava", "water", "desert", "flowers", "jungle"] as const;
export type Backing = typeof allBackings[number];
export const allCreatures = ["🐧", "🐢", "🐙", "🐋", "🦀"] as const;
export const moneyBag = "💰";
export type Creature = typeof allCreatures[number];

export function createDeck() {

    const cards: Card[] = [];
    let id = 1;
    for (const backing of allBackings) {
        for (const creature of allCreatures) {
            const c: Card = {
                backing,
                creature,
                isFaceUp: false,
                id: id++
            };
            cards.push(c);
        }
    }
    const shuffled = shuffle(cards);
    shuffled.pop(); //Each game is played with 24 of the 25 possible cards - lose one!
    return shuffled;
}


