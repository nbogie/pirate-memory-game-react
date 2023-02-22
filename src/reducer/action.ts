import { Card } from "../gameCore/card";

export type Action = FlipCardAction | StartNewGameAction | AwardTreasureAction | CheatSetGameOverAction | AdvancePreLookAction;

export type FlipCardAction = { type: "flip"; clickedCard: Card };
export type AwardTreasureAction = { type: "award-treasure", winnerIx: number };
export type AdvancePreLookAction = { type: "advance-prelook" };
export type StartNewGameAction = { type: "start-new-game" };
export type CheatSetGameOverAction = { type: "cheat-set-game-over" };
