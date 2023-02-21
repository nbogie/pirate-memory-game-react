export function seatPlayersAtTable<T>(players: T[]): (T | null)[] {
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
