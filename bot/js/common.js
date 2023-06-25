import { ErrorGameOver } from "./error_Board";
export function allMoves(b) {
    let x = [];
    if (x.length > 0)
        return x;
    else
        throw new ErrorGameOver(0);
}
