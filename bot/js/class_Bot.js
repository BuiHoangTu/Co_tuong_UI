var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Board } from "./class_Board.js";
import { allMoves } from "./common.js";
export class Bot {
    constructor(searchDepth, botIsRed, startPositions) {
        this.board = new BoardBot(startPositions, null, null);
        this.searchDepth = searchDepth;
        this.botIsRed = botIsRed;
    }
    botFirstMove() {
        let firstMove = {
            oldPosition: { x: 4, y: 3 },
            newPosition: { x: 4, y: 4 }
        };
        this.board._movePiece(firstMove);
        return firstMove;
    }
    opponentMakeMove(move) {
        return __awaiter(this, void 0, void 0, function* () {
            this.board = this.board.movePiece(move).board;
            yield this.board.buildBoardTree(this.board.turn + this.searchDepth);
            let botMove;
            if (this.botIsRed)
                botMove = this._maxValue(this.board).move;
            else
                botMove = this._minValue(this.board).move;
            return botMove;
        });
    }
    _maxValue(nextBoard) {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove)
                return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
            else
                throw new Error("This board `" + nextBoard + "` is broken");
        }
        else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = -100000;
            let move;
            if (nextnextBoards.length <= 0)
                throw new Error("Tree is not built here");
            for (let i = 0; i < nextnextBoards.length; i++) {
                let minValue = this._minValue(nextnextBoards[i]);
                if (point < minValue.point) {
                    point = minValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move)
                return { point: point, move: move };
            else
                throw new Error("This board `" + nextBoard + "` is broken");
        }
    }
    _minValue(nextBoard) {
        if (nextBoard.turn - this.board.turn >= this.searchDepth) {
            if (nextBoard.prevMove)
                return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
            else
                throw new Error("This board `" + nextBoard + "` is broken");
        }
        else {
            let nextnextBoards = nextBoard.nextBoards;
            let point = 100000;
            let move;
            if (nextnextBoards.length <= 0)
                throw new Error("Tree is not built here");
            for (let i = 0; i < nextnextBoards.length; i++) {
                let maxValue = this._maxValue(nextnextBoards[i]);
                if (point > maxValue.point) {
                    point = maxValue.point;
                    move = nextnextBoards[i].prevMove;
                }
            }
            if (move)
                return { point: point, move: move };
            else
                throw new Error("This board `" + nextBoard + "` is broken");
        }
    }
}
class BoardBot extends Board {
    constructor(startPositions, prevMove, prevCaptured) {
        super(startPositions);
        this.nextBoards = [];
        if (prevMove)
            this.prevMove = prevMove;
        if (prevCaptured)
            this.prevCaptured = prevCaptured;
    }
    buildBoardTree(untilTurnX) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.turn >= untilTurnX)
                return;
            if (!this.nextBoards) {
                let moves = allMoves(this);
                moves.forEach((move) => {
                    let b = this.movePiece(move).board;
                    this.nextBoards.push(b);
                });
            }
            this.nextBoards.forEach((nBoard) => {
                nBoard.buildBoardTree(untilTurnX);
            });
        });
    }
    movePiece(move) {
        for (let i = 0; i < this.nextBoards.length; i++) {
            if (this.nextBoards[i].prevMove === move) {
                return { captured: this.nextBoards[i].prevCaptured, board: this.nextBoards[i] };
            }
        }
        let b = new BoardBot(this.piecesPositionOnBoard, this.prevMove, this.prevCaptured);
        return b._movePiece(move);
    }
}
