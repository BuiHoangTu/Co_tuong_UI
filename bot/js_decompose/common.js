// Khởi tạo
const game = new Xiangqi();

let _oldFen = [];
_oldFen.push(game.fen());
let _oldBoard = [];
let _depth = 4;

const config = {
    boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard2.svg",
    pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
    orientation: "white",
    position: game.fen(),
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop
};

let board = Xiangqiboard("#myBoard1", config);
let board1 = Xiangqiboard("#myBoard2", config);

// ----------------------------------------------------------------
// Main function for game
// ----------------------------------------------------------------

function parseMove(move) {
    let _move = "";
    switch (move.oldPosition.x) {
        case 0: _move += 'a'; break;
        case 1: _move += 'b'; break;
        case 2: _move += 'c'; break;
        case 3: _move += 'd'; break;
        case 4: _move += 'e'; break;
        case 5: _move += 'f'; break;
        case 6: _move += 'g'; break;
        case 7: _move += 'h'; break;
        case 8: _move += 'i'; break;
    }
    _move += move.oldPosition.y
    switch (move.newPosition.x) {
        case 0: _move += 'a'; break;
        case 1: _move += 'b'; break;
        case 2: _move += 'c'; break;
        case 3: _move += 'd'; break;
        case 4: _move += 'e'; break;
        case 5: _move += 'f'; break;
        case 6: _move += 'g'; break;
        case 7: _move += 'h'; break;
        case 8: _move += 'i'; break;
    }
    _move += move.newPosition.y

    return _move;
}

function allValidMove() {
    let validMoves = [];

    var moves = game.moves();

    for (let k = 0; k < moves.length; k++) {
        let tmp = "";

        for (let l = 0; l < 4; l++) {
            if (moves[k][l] == "a") tmp += "0";
            else if (moves[k][l] == "b") tmp += "1";
            else if (moves[k][l] == "c") tmp += "2";
            else if (moves[k][l] == "d") tmp += "3";
            else if (moves[k][l] == "e") tmp += "4";
            else if (moves[k][l] == "f") tmp += "5";
            else if (moves[k][l] == "g") tmp += "6";
            else if (moves[k][l] == "h") tmp += "7";
            else if (moves[k][l] == "i") tmp += "8";
            else tmp += moves[k][l];
        }

        viTri1 = { x: Number(tmp[0]), y: Number(tmp[1]) };
        viTri2 = { x: Number(tmp[2]), y: Number(tmp[3]) };
        validMoves.push({ oldPosition: viTri1, newPosition: viTri2 });
    }

    return validMoves;
}

let _turn;
let _bot = new Bot(_depth, false, null);

function onDragStart(source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // only pick up pieces for Red
    if (piece.search(/^b/) !== -1) return false;
}

function makeMove(move) {
    _turn = game.turn();
    if (_turn == "b") {

        let oppMove = "";

        for (let i = 0; i < 4; i++) {
            if (move[i] == "a") oppMove += "0";
            else if (move[i] == "b") oppMove += "1";
            else if (move[i] == "c") oppMove += "2";
            else if (move[i] == "d") oppMove += "3";
            else if (move[i] == "e") oppMove += "4";
            else if (move[i] == "f") oppMove += "5";
            else if (move[i] == "g") oppMove += "6";
            else if (move[i] == "h") oppMove += "7";
            else if (move[i] == "i") oppMove += "8";
            else oppMove += move[i];
        }

        let _oopMove = {
            oldPosition: {
                x: Number(oppMove[0]),
                y: Number(oppMove[1]),
            },
            newPosition: {
                x: Number(oppMove[2]),
                y: Number(oppMove[3]),
            },
        };

        _bot.opponentMakeMove(_oopMove);
    }
}

function makeRandomMove() {
    let possibleMoves = allValidMove();

    if (possibleMoves.length == 0) {
        alert("Game over !!! You win !!!");
        location.reload();
    }

    let randomIdx = Math.floor(Math.random() * possibleMoves.length);

    return possibleMoves[randomIdx]
}

function onDrop(source, target) {
    // see if the move is legal
    _oldFen.push(game.fen());
    _oldBoard.push(_bot.board);

    let move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return 'snapback';

    // make move
    makeMove(move.from + move.to);
}

$(".undo_btn").click(function () {
    game.load(_oldFen[_oldFen.length - 1]);
    board.position(game.fen());
    board1.position(game.fen());
    _bot.setBoard(_oldBoard[_oldBoard.length - 1]);
    _oldFen.pop();
    _oldBoard.pop();
});

$(".reset_btn").click(function () {
    game.reset();
    board.position(game.fen());
    board1.position(game.fen());
    _bot = new Bot(_depth, false, null);
});