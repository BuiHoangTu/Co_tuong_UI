// ----------------------------------------------------------------
// class_Board
// ----------------------------------------------------------------

// parse side to play
function parseSideToPlay(isRedPlay) {
  let isRedPlayBool = true;
  switch (typeof isRedPlay) {
    case "string":
      isRedPlay = isRedPlay.toLowerCase();
      if (isRedPlay === "red" || isRedPlay === "r")
        isRedPlayBool = true;
      if (isRedPlay === "black" || isRedPlay === "b")
        isRedPlayBool = false;
      break;
    case "number":
      isRedPlay = Math.sign(isRedPlay);
      if (isRedPlay == 0)
        throw new Error("Invalid isRedPlay value = 0");
      isRedPlayBool = isRedPlay > 0 ? true : false;
      break;
    case "boolean":
      isRedPlayBool = isRedPlay;
      break;
    default:
      isRedPlayBool = true;
  }
  return isRedPlayBool;
}

// Default position for player Board
const defaultPosition = [
  ["C1", null, null, "Z4", null, null, "z4", null, null, "c1"],
  ["M1", null, "P1", null, null, null, null, "p1", null, "m1"],
  ["X1", null, null, "Z3", null, null, "z3", null, null, "x1"],
  ["S1", null, null, null, null, null, null, null, null, "s1"],
  ["J0", null, null, "Z2", null, null, "z2", null, null, "j0"],
  ["S0", null, null, null, null, null, null, null, null, "s0"],
  ["X0", null, null, "Z1", null, null, "z1", null, null, "x0"],
  ["M0", null, "P0", null, null, null, null, "p0", null, "m0"],
  ["C0", null, null, "Z0", null, null, "z0", null, null, "c0"],
];

// Class Board for AI plays
class Board {
  constructor(startPositions, redToPlay) {
    var _a;
    this.redToPlay = parseSideToPlay(redToPlay);
    this.onBoardPieces = [];
    this.turn = 0;

    var refinedStartPositions;
    if (startPositions) refinedStartPositions = startPositions;
    else refinedStartPositions = defaultPosition;
    this.piecesPositionOnBoard = [];
    for (var i = 0; i < refinedStartPositions.length; i++) {
      let colPieces = [];
      this.piecesPositionOnBoard.push(colPieces);

      let count = 0;

      for (var j = 0; j < refinedStartPositions[i].length; j++) {
        const pieceChar =
          (_a = refinedStartPositions[i][j]) === null || _a === void 0
            ? void 0
            : _a.toString().charAt(0);
        var thisPiece;
        switch (pieceChar) {
          case undefined:
            thisPiece = null;
            break;
          case "C":
            thisPiece = new Xe(true, { x: i, y: j });
            break;
          case "M":
            thisPiece = new Ma(true, { x: i, y: j });
            break;
          case "X":
            thisPiece = new Vua(true, { x: i, y: j });
            break;
          case "S":
            thisPiece = new Si(true, { x: i, y: j });
            break;
          case "J":
            thisPiece = new Tuong(true, { x: i, y: j });
            break;
          case "P":
            thisPiece = new Phao(true, { x: i, y: j });
            break;
          case "Z":
            thisPiece = new Tot(true, { x: i, y: j });
            break;
          case "c":
            thisPiece = new Xe(false, { x: i, y: j });
            break;
          case "m":
            thisPiece = new Ma(false, { x: i, y: j });
            break;
          case "x":
            thisPiece = new Vua(false, { x: i, y: j });
            break;
          case "s":
            thisPiece = new Si(false, { x: i, y: j });
            break;
          case "j":
            thisPiece = new Tuong(false, { x: i, y: j });
            break;
          case "p":
            thisPiece = new Phao(false, { x: i, y: j });
            break;
          case "z":
            thisPiece = new Tot(false, { x: i, y: j });
            break;
          default:
            throw new Error(
              "This piece `" +
              pieceChar +
              "` at `" +
              i +
              j +
              "` is not available"
            );
        }
        colPieces.push(thisPiece);
        if (thisPiece) this.onBoardPieces.push(thisPiece);
      }
    }
  }
  getPoint() {
    let point = 0;
    this.onBoardPieces.forEach((piece) => {
      point += piece.getCurrentValue();
    });
    return point;
  }
  movePiece(move) {
    return this._movePiece(move);
  }
  _movePiece(move) {
    // js
    let { x, y } = move.oldPosition;
    let thisPiece = this.piecesPositionOnBoard[x][y];
    if (!thisPiece)
      throw new Error(
        "There is no piece on old position:" + move.oldPosition
      );
    let { x: newX, y: newY } = move.newPosition;
    this.piecesPositionOnBoard[x][y] = null;
    let captured = this.piecesPositionOnBoard[newX][newY];
    this.piecesPositionOnBoard[newX][newY] = thisPiece;
    thisPiece.position.x = newX;
    thisPiece.position.y = newY;
    if (this.redToPlay === true) {
      this.redToPlay = false;
    } else {
      this.redToPlay = true;
      this.turn += 1;
    }
    this.onBoardPieces.splice(
      this.onBoardPieces.findIndex((x) => {
        x == captured;
      }),
      0
    );
    return { captured: captured, board: this };
  }
}