import { GameState, PlayerState } from "../gameCore/gameState";
import { animated, useSpring } from '@react-spring/web'

interface PlayersAtTableProps {
    gameState: GameState;
}
export function PlayersAtTable({ gameState }: PlayersAtTableProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];

    const style = { "--numPlayers": gameState.players.length } as React.CSSProperties;

    return (
        <div className="playersCircle" style={style}>
            {
                gameState.players.map((p, ix) => <PlayerAtTable player={p} currentPlayer={currentPlayer} ix={ix} />)
            }
        </div>
    );
}
interface PlayerAtTableProps {
    player: PlayerState;
    currentPlayer: PlayerState;
    ix: number;//for rotational layout
}

function PlayerAtTable(props: PlayerAtTableProps) {
    const { player, currentPlayer, ix } = props;
    const isCurrentPlayer = currentPlayer.name === player.name;
    const springs = useSpring({
        transform: `scale(${isCurrentPlayer ? 1 : 0.9})`,
        textDecoration: isCurrentPlayer ? "underline" : ""
    });

    const classNames = ["player",
        player.isStillIn ? "" : "eliminated",
        player.name === currentPlayer.name ? "currentPlayer" : "",
        "rot" + ix]

    return (

        <div
            key={player.name}
            className={classNames.join(" ")}
        >
            <animated.div
                style={{ ...springs }}
            >
                {player.name} ({player.treasures.length})
            </animated.div>
        </div>
    )

}