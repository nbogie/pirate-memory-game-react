import { GameState, PlayerState } from "../gameCore/gameState";
import { animated, useSpring } from '@react-spring/web'
import { seatPlayersAtTable } from "./seatPlayersAtTable";

interface PlayersAtTableEdgesProps {
    gameState: GameState;
}
export function PlayersAtTableEdges({ gameState }: PlayersAtTableEdgesProps) {
    const currentPlayer = gameState.players[gameState.currentPlayerIx];

    const playersAndEmptySeats: (PlayerState | null)[] = seatPlayersAtTable(gameState.players);
    return (
        <>
            {
                playersAndEmptySeats.map((p, ix) => p === null ? <PlaceholderAtTableEdge ix={ix} /> : <PlayerAtTableEdge player={p} currentPlayer={currentPlayer} ix={ix} />)
            }
        </>
    );
}
interface PlayerAtTableEdgesProps {
    player: PlayerState;
    currentPlayer: PlayerState;
    ix: number;//for rotational layout
}

type PlayerAreaName = "pN" | "pE" | "pS" | "pW";
function playerAreaFor(n: 0 | 1 | 2 | 3): PlayerAreaName {
    const lookup: Record<0 | 1 | 2 | 3, PlayerAreaName> = {
        0: "pN",
        1: "pE",
        2: "pS",
        3: "pW",
    }
    return lookup[n];
}

function PlayerAtTableEdge(props: PlayerAtTableEdgesProps) {


    const { player, currentPlayer, ix } = props;

    const isCurrentPlayer = currentPlayer.name === player.name;
    const springs = useSpring({
        transform: `scale(${isCurrentPlayer ? 1 : 0.9})`,
        textDecoration: isCurrentPlayer ? "underline" : ""
    });


    const classNames = [
        "playerArea",
        player.isStillIn ? "" : "eliminated",
        player.name === currentPlayer.name ? "currentPlayer" : "",
        playerAreaFor(ix as 0 | 1 | 2 | 3)]

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

interface PlaceholderAtTableEdge {
    ix: number;
}
function PlaceholderAtTableEdge({ ix }: PlaceholderAtTableEdge) {
    return (
        <div
            key={ix}
            className={"playerArea placeholder " + playerAreaFor(ix as 0 | 1 | 2 | 3)}
        >
            <div>
            </div>
        </div>
    )
}
