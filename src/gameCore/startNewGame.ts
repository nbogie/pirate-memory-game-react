import { createInitialGameState, GameState, NumPlayers } from "./gameState";

export function startNewGame(gs: GameState): GameState {
    return createInitialGameState(gs.players.length as NumPlayers);
}
