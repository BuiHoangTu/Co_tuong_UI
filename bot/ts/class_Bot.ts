import { Board } from "./class_Board.js"
import { allMoves } from "./common.js"
import type { Move } from "./class_Board.js";
import { Piece } from "./class_Piece.js";

export class Bot {
    public board: BoardBot;
    public searchDepth: number;
    public botIsRed: boolean;

    /**
     *
     */
    constructor(searchDepth: number, botIsRed: boolean, startPositions: ((object | null)[][] | null)) {
        this.board = new BoardBot(startPositions, null, null);
        this.searchDepth = searchDepth;
        this.botIsRed = botIsRed;

    }

    /**
     * Use this if `bot is red` to make the first move 
     * @returns bot's move
     */
    botFirstMove() {
        let firstMove: Move = {
            oldPosition: { x: 4, y: 3},
            newPosition: {x : 4, y: 4}
        };
        this.board._movePiece(firstMove);
        return firstMove;
    }

    async opponentMakeMove(move: Move): Promise<Move> {
        this.board = this.board.movePiece(move).board;
        await this.board.buildBoardTree(this.board.turn + this.searchDepth);

        let botMove: Move;
        if (this.botIsRed) botMove = this._maxValue(this.board).move;
        else botMove = this._minValue(this.board).move;



        return botMove
    }

    _maxValue(nextBoard: BoardBot): { point: number, move: Move } {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove) return { point: nextBoard.getPoint(), move: nextBoard.prevMove }
            else throw new Error("This board `" + nextBoard + "` lack prevMove");
        } else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = -100_000;
            let move: Move | undefined;
            if (nextnextBoards.length <= 0) throw new Error("Tree is not built here")
            for (let i = 0; i < nextnextBoards.length; i++) {
                let minValue = this._minValue(nextnextBoards[i]);
                if (point < minValue.point) {
                    point = minValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move) return { point: point, move: move }
            else throw new Error("No move saved to achieve nextnextBoard `" + nextBoard + "`");
        }
    }

    _minValue(nextBoard: BoardBot): { point: number, move: Move } {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove) return { point: nextBoard.getPoint(), move: nextBoard.prevMove }
            else throw new Error("This board `" + nextBoard + "` lack prevMove");
        } else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = 100_000;
            let move: Move | undefined;
            if (nextnextBoards.length <= 0) throw new Error("Tree is not built here")
            for (let i = 0; i < nextnextBoards.length; i++) {
                let maxValue = this._maxValue(nextnextBoards[i]);
                if (point > maxValue.point) {
                    point = maxValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move) return { point: point, move: move }
            else throw new Error("No move saved to achieve nextnextBoard `" + nextBoard + "`");

        }
    }
}

class BoardBot extends Board {
    public nextBoards: BoardBot[] = [];
    public prevMove?: Move
    public prevCaptured?: Piece;

    /**
     *
     */
    constructor(startPositions: ((object | null)[][] | null), prevMove: null | Move | undefined, prevCaptured: Piece | null | undefined) {
        super(startPositions);
        if (prevMove) this.prevMove = prevMove;
        if (prevCaptured) this.prevCaptured = prevCaptured
    }

    async buildBoardTree(untilTurnX: number): Promise<void> {
        if (this.turn >= untilTurnX) return;

        if (!this.nextBoards) {
            let moves = allMoves(this);

            moves.forEach((move) => {
                let b = this.movePiece(move).board;

                this.nextBoards.push(b);
            });
        }

        this.nextBoards.forEach((nBoard) => {
            nBoard.buildBoardTree(untilTurnX);
        })

    }

    movePiece(move: Move): { captured: Piece | null | undefined, board: BoardBot } {
        for (let i = 0; i < this.nextBoards.length; i++) {
            if (this.nextBoards[i].prevMove === move) {
                return { captured: this.nextBoards[i].prevCaptured, board: this.nextBoards[i] }
            }
        }

        // if not found this moves-> 
        let b = new BoardBot(this.piecesPositionOnBoard, move, this.prevCaptured);
        b.turn = this.turn + 1;
        return b._movePiece(move);

    }
}