import { playerAreaFor } from "./PlayerAtTableEdge";



export interface PlaceholderAtTableEdge {
    ix: number;
}
export function PlaceholderAtTableEdge({ ix }: PlaceholderAtTableEdge) {
    return (
        <div
            key={ix}
            className={"playerArea placeholder " + playerAreaFor(ix as 0 | 1 | 2 | 3)}
        >
            <div>
            </div>
        </div>
    );
}
