import { Card } from "./card";


export type RoundPhase = { type: "pre-look"; } |
{
    type: "in-play";
    prevCard: Card | null;
    prevPrevCard: Card | null;
} |
{ type: "round-end"; winnerIx: number; } |
{ type: "game-over"; };
