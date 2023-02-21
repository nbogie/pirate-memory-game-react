import { shuffle } from "./shuffle";

export function sample<T>(arr: T[], numToSample: number): T[] {
    return shuffle([...arr]).slice(0, numToSample);
}
