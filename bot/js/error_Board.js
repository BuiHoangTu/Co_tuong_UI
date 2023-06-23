export class ErrorNoPrevMove extends Error {
    constructor(board, message) {
        if (message)
            message = message;
        else
            message = "Board lack prevMove.";
        if (board)
            message += "The board: \n" + board.toString();
        super(message);
    }
}
export class ErrorTreeNotBuilt extends Error {
    constructor() {
        super("Tree is not built here");
    }
}
