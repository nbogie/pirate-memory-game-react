import { createInitialGameState, GameState, NumPlayers } from "../gameCore/gameState";

export function startNewGame(gs: GameState): GameState {
    return createInitialGameState(gs.players.length as NumPlayers);
}
