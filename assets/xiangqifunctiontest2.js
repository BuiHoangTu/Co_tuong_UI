let board = null;
let game = new Xiangqi();

function makeRandomMove () {
  let possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over()) return;

  let randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());

  window.setTimeout(makeRandomMove, 500);
}

let config = {
    boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard2.svg",
    pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
    position: 'start',
  };

board = Xiangqiboard('#myBoard1', config);

window.setTimeout(makeRandomMove, 500);