import { Card } from "../components/Card";

export type Action = FlipCardAction | StartNewGameAction | AwardTreasureAction | CheatSetGameOverAction;

export type FlipCardAction = { type: "flip"; clickedCard: Card };
export type AwardTreasureAction = { type: "award-treasure", winnerIx: number };
export type StartNewGameAction = { type: "start-new-game" };
export type CheatSetGameOverAction = { type: "cheat-set-game-over" };
