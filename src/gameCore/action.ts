import { Card } from "../components/Card";

export type Action = FlipCardAction;
export type FlipCardAction = { type: "flip"; clickedCard: Card };
