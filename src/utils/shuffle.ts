import { ICards } from "../interface/interface";

export function shuffle(array: ICards[]) {
    return array.sort(() => Math.random() - 0.5);
}