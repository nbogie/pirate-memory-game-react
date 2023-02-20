import { GameState } from "../gameCore/gameState";

interface PlayersAtTableProps {
    gameState: GameState;
}
export function PlayersAtTable({ gameState }: PlayersAtTableProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];

    const style = { "--numPlayers": gameState.players.length } as React.CSSProperties;

    return (
        <div className="playersCircle" style={style}>
            {
                gameState.players.map((p, ix) => {

                    const classNames = ["player",
                        p.isStillIn ? "" : "eliminated",
                        p.name === currentPlayer.name ? "currentPlayer" : "",
                        "rot" + ix]

                    return (
                        <div
                            key={p.name}
                            className={classNames.join(" ")}
                        >
                            {p.name}
                        </div>
                    )
                })
            }
        </div>
    );
}
