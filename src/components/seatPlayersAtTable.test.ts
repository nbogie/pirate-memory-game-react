import { expect, test } from 'vitest';
import { seatPlayersAtTable } from "./seatPlayersAtTable";

test("seatPlayersAtTable", () => {
    expect(seatPlayersAtTable(["one", "two"])).toEqual(["one", null, "two", null]);
    expect(seatPlayersAtTable(["one", "two", "three"])).toEqual(["one", "two", null, "three"]);
    expect(seatPlayersAtTable(["one", "two", "three", "four"])).toEqual(["one", "two", "three", "four"]);
});