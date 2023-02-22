import { Card } from "./card";


export type PrelookRoundPhase = { type: "pre-look"; who: 1 | 2 | 3 | 4, stage: "get-ready" | "look" }
export type RoundPhase =
    | PrelookRoundPhase
    | {
        type: "in-play";
        prevCard: Card | null;
        prevPrevCard: Card | null;
    }
    | { type: "round-end"; winnerIx: number; }
    | { type: "game-over"; };
