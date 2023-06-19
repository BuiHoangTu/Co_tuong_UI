// ----------------------------------------------------------------
// class_Bot
// ----------------------------------------------------------------

// Await for async function 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Some type in bot
function boardDepth(board) {
    return board.turn * 2 + (board.redToPlay ? 0 : 1);
}

// Class Bot for calculate move in depth
class Bot {
    constructor(searchDepth, botIsRed, startPositions) {
        this.board = new BoardBot(startPositions, null, null);
        this.board = new BoardBot(startPositions, undefined, undefined, undefined);
        this.searchDepth = searchDepth;
        this.botIsRed = botIsRed;
    }
    setBoard(board) {
        this.board = board;
    }
    async opponentMakeMove(move) {
        return __awaiter(this, void 0, void 0, function* () {
            this.board = this.board.movePiece(move).board;

            // if black haven't any moves to move. Black lose
            if (allValidMove().length == 0) {
                alert("Game over !!! You win !!!");
                location.reload();
            }

            console.log("main", (yield this._minMaxAlphaBeta()));
            let botMove = (yield this._minMaxAlphaBeta()).move;

            // move in UI (web)
            game.move(parseMove(botMove));
            board.position(game.fen());
            board1.position(game.fen());

            // move in boardBot
            this.board = this.board.movePiece(botMove).board;

            // if Red haven't any moves to move. Red lose
            if (allValidMove().length == 0) {
                alert("Game over !!! You lose !!!");
                location.reload();
            }

            // return (yield this._minMaxAlphaBeta()).move;
        });
    }
    _minMaxAlphaBeta() {
        return __awaiter(this, void 0, void 0, function* () {
            let alphaBeta = { alpha: -100000, beta: 100000 };
            let minMaxOutput;
            if (this.botIsRed)
                minMaxOutput = this._maxAlphaBeta(this.board, alphaBeta);
            else
                minMaxOutput = this._minAlphaBeta(this.board, alphaBeta);
            return minMaxOutput;
        });
    }
    _minAlphaBeta(nextBoard, alphaBeta) {
        return __awaiter(this, void 0, void 0, function* () {
            if (boardDepth(nextBoard) - boardDepth(this.board) >= this.searchDepth) {
                if (nextBoard.prevMove.length != 0) {
                    return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
                } else throw new Error("This board `" + nextBoard + "` lack prevMove");
            }
            else {
                let oldFen = game.fen();

                let waiter;
                if (nextBoard.nextBoards.length == 0) {
                    if (nextBoard.prevMove.length != 0) {
                        game.move(parseMove(nextBoard.prevMove));
                        board.position(game.fen());
                    }
                    waiter = nextBoard.buildBoardLayer();
                }
                let point = -100000;
                let move;
                if (waiter)
                    yield waiter;
                let nextnextBoards = nextBoard.nextBoards;
                // console.log(nextnextBoards);
                for (let i = 0; i < nextnextBoards.length; i++) {
                    let maxValue = yield this._maxAlphaBeta(nextnextBoards[i], alphaBeta);
                    if (point <= maxValue.point) {
                        point = maxValue.point;
                        move = nextnextBoards[i].prevMove;
                    }
                    console.log(point, move);
                    if (point >= alphaBeta.alpha)
                        break;
                    alphaBeta.beta = alphaBeta.beta < point ? alphaBeta.beta : point;
                }
                if (move) {
                    // console.log({ point: point, move: move });
                    game.load(oldFen);
                    board.position(game.fen());
                    return { point: point, move: move };
                } else {
                    move = makeRandomMove();
                }
            }
        });
    }
    _maxAlphaBeta(nextBoard, alphaBeta) {
        return __awaiter(this, void 0, void 0, function* () {
            if (boardDepth(nextBoard) - boardDepth(this.board) >= this.searchDepth) {
                if (nextBoard.prevMove.length != 0) {
                    return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
                } else throw new Error("This board `" + nextBoard + "` lack prevMove");
            }
            else {
                let oldFen = game.fen();

                let waiter;
                if (nextBoard.nextBoards.length == 0) {
                    if (nextBoard.prevMove.length != 0) {
                        game.move(parseMove(nextBoard.prevMove));
                        board.position(game.fen());
                    }
                    waiter = nextBoard.buildBoardLayer();
                }
                let point = -100000;
                let move;
                if (waiter)
                    yield waiter;
                let nextnextBoards = nextBoard.nextBoards;
                // console.log(nextnextBoards);
                for (let i = 0; i < nextnextBoards.length; i++) {
                    let minValue = yield this._minAlphaBeta(nextnextBoards[i], alphaBeta);
                    if (point <= minValue.point) {
                        point = minValue.point;
                        move = nextnextBoards[i].prevMove;
                    }
                    console.log(point, move);
                    if (point >= alphaBeta.beta)
                        break;
                    alphaBeta.alpha = alphaBeta.beta > point ? alphaBeta.beta : point;
                }
                if (move) {
                    // console.log({ point: point, move: move });
                    game.load(oldFen);
                    board.position(game.fen());
                    return { point: point, move: move };
                } else {
                    move = makeRandomMove();
                    console.log(move);
                }
            }
        });
    }
}

// Class Board of Bot
class BoardBot extends Board {
    constructor(startPositions, prevMove, prevCaptured, redToPlay) {
        super(startPositions, redToPlay);
        this.nextBoards = [];
        if (prevMove) this.prevMove = prevMove;
        if (prevCaptured) this.prevCaptured = prevCaptured;
    }
    buildBoardLayer() {
        return __awaiter(this, void 0, void 0, function* () {
            let moves = [];
            if (this.nextBoards.length == 0) {
                allValidMove().forEach((move) => {
                    moves.push(parseMove(move));
                    this.nextBoards.push(this.movePiece(move).board);
                });
            }
        });
    }
    movePiece(move) {
        for (let i = 0; i < this.nextBoards.length; i++) {
            if (this.nextBoards[i].prevMove === move) {
                return {
                    captured: this.nextBoards[i].prevCaptured,
                    board: this.nextBoards[i]
                };
            }
        }
        let b = new BoardBot(this.piecesPositionOnBoard, move, this.prevCaptured, this.redToPlay);
        b.turn = this.turn;
        return b._movePiece(move);
    }
}