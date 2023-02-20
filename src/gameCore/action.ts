import { Card } from "../components/Card";

export type Action = FlipCardAction | StartFirstRoundAction;

export type FlipCardAction = { type: "flip"; clickedCard: Card };
export type StartFirstRoundAction = { type: "start-first-round" };
