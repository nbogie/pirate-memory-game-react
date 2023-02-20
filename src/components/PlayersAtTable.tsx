import { GameState } from "../gameCore/gameState";

interface PlayersAtTableProps {
    gameState: GameState;
}
export function PlayersAtTable({ gameState }: PlayersAtTableProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];

    return (
        <div>
            Whose turn? {currentPlayer.name}
            <br />
            <div className="playersCircle">
                {gameState.players.map((p, ix) => {

                    const classNames = ["player",
                        p.isStillIn ? "" : "eliminated",
                        "rot" + ix]

                    return (
                        <div
                            key={p.name}
                            className={classNames.join(" ")}
                        >
                            {p.name}
                        </div>
                    )
                }

                )}
            </div>
        </div >

    );
}
