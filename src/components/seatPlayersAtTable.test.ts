import { expect, test } from 'vitest';
import { seatPlayersAtTable } from "./seatPlayersAtTable";

test("seatPlayersAtTable", () => {
    expect(3 + 4).toEqual(7);
    expect(seatPlayersAtTable(["one", "two"])).toEqual(["one", null, "two", null]);
    expect(seatPlayersAtTable(["one", "two", "three"])).toEqual(["one", "two", null, "three"]);
    expect(seatPlayersAtTable(["one", "two", "three", "four"])).toEqual(["one", "two", "three", "four"]);
});