import { PlayerState } from "../gameCore/gameState";
import { animated, useSpring } from '@react-spring/web';

type PlayerAreaName = "pN" | "pE" | "pS" | "pW";
type PlayerIndex = 0 | 1 | 2 | 3;
export function playerAreaFor(n: PlayerIndex): PlayerAreaName {
    const lookup: Record<PlayerIndex, PlayerAreaName> = {
        0: "pN",
        1: "pE",
        2: "pS",
        3: "pW",
    };
    return lookup[n];
}


interface PlayerAtTableEdgesProps {
    player: PlayerState;
    currentPlayer: PlayerState;
    ix: number; //for rotational layout
}
export function PlayerAtTableEdge(props: PlayerAtTableEdgesProps) {
    const { player, currentPlayer, ix } = props;

    const isCurrentPlayer = currentPlayer.name === player.name;
    const springs = useSpring({
        fontWeight: isCurrentPlayer ? "bolder" : "normal",
    });

    const classNames = [
        "playerArea",
        player.isStillIn ? "" : "eliminated",
        player.name === currentPlayer.name ? "currentPlayer" : "",
        playerAreaFor(ix as 0 | 1 | 2 | 3)
    ];

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
    );

}



