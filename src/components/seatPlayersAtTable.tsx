/** Given an array of 2, 3, or 4 players (really, things), sit them appropriately at 
 * the N, E, S, W sides of the table by placing them in a returned array at those positions.  
 * Empty seats will be marked with null. 
 * 
 * @returns a tuple of 4 items or nulls, to be interpreted as the seating plan in order: N, E, S, W */
export function seatPlayersAtTable<T>(players: T[]): [T | null, T | null, T | null, T | null] {
    const [a, b, c, d] = players;
    switch (players.length) {
        case 2:
            return [a, null, b, null];
        case 3:
            return [a, b, null, c];
        case 4:
            return [a, b, c, d];
        default:
            throw new Error("unexpected number of players given: " + players.length);
    }
}
