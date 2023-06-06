(() => {
  // ----------------------------------------------------------------
  // class_Piece
  // ----------------------------------------------------------------

  // Properties
  const PROPERTIES = {
    red: {
      Xe: { text: "俥", imgStr: "r_c" },
      Ma: { text: "傌", imgStr: "r_m" },
      Vua: { text: "帥", imgStr: "r_x" },
      Si: { text: "仕", imgStr: "r_s" },
      Tuong: { text: "相", imgStr: "r_j" },
      Phao: { text: "炮", imgStr: "r_p" },
      Tot: { text: "兵", imgStr: "r_z" },
    },
    black: {
      Xe: { text: "車", imgStr: "r_c" },
      Ma: { text: "馬", imgStr: "r_m" },
      Vua: { text: "將", imgStr: "r_x" },
      Si: { text: "士", imgStr: "r_s" },
      Tuong: { text: "象", imgStr: "r_j" },
      Phao: { text: "砲", imgStr: "r_p" },
      Tot: { text: "卒", imgStr: "r_z" },
    },
  };

  // Start value for each type of piece
  const VALUE = {
    Xe: 100,
    Ma: 45,
    Vua: 9999,
    Si: 20,
    Tuong: 25,
    Phao: 50,
    Tot: 10,
  };
  let POSITION_VALUES = {};

  // Value of positions when piece move into for each type of piece
  POSITION_VALUES.Xe = [
    [206, 206, 206, 206, 208, 208, 204, 198, 200, 194],
    [208, 212, 208, 213, 211, 212, 209, 208, 208, 206],
    [207, 209, 207, 213, 211, 212, 204, 204, 206, 204],
    [213, 216, 214, 216, 214, 214, 212, 212, 212, 212],
    [214, 233, 216, 216, 215, 215, 214, 212, 200, 200],
    [213, 216, 214, 216, 214, 214, 212, 212, 212, 212],
    [207, 209, 207, 213, 211, 212, 204, 204, 206, 204],
    [208, 212, 208, 213, 211, 212, 209, 208, 208, 206],
    [206, 206, 206, 206, 208, 208, 204, 198, 200, 194],
  ];

  POSITION_VALUES.Ma = [
    [90, 90, 92, 93, 90, 90, 92, 93, 85, 88],
    [90, 96, 98, 108, 100, 98, 94, 92, 90, 85],
    [90, 103, 99, 100, 99, 101, 98, 94, 92, 90],
    [96, 97, 103, 107, 103, 102, 95, 95, 93, 88],
    [90, 94, 99, 100, 104, 103, 98, 92, 78, 90],
    [96, 97, 103, 107, 103, 102, 95, 95, 93, 88],
    [90, 103, 99, 100, 99, 101, 98, 94, 92, 90],
    [90, 96, 98, 108, 100, 98, 94, 92, 90, 85],
    [90, 90, 92, 93, 90, 90, 92, 93, 85, 88],
  ];

  POSITION_VALUES.Tuong = [
    [0, 0, 0, 0, 0, 0, 0, 18, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 20, 20, 0, 0, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 23, 0, 0, 0, 20, 23, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 20, 20, 0, 0, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 18, 0, 0],
    [0, 0, 20, 0, 0, 0, 20, 0, 0, 0],
  ];

  POSITION_VALUES.Si = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 20, 0, 0, 0, 20, 0, 20],
    [0, 23, 0, 0, 0, 0, 0, 23, 0],
    [20, 0, 20, 0, 0, 0, 20, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 20, 0, 0, 0, 20, 0, 20],
  ];

  POSITION_VALUES.Vua = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
    [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
    [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  POSITION_VALUES.Phao = [
    [100, 98, 97, 96, 96, 95, 96, 97, 96, 96],
    [100, 98, 97, 99, 96, 96, 96, 96, 97, 96],
    [96, 96, 96, 99, 96, 99, 96, 100, 98, 97],
    [91, 92, 91, 98, 96, 96, 96, 99, 98, 99],
    [90, 89, 92, 100, 100, 100, 96, 101, 98, 99],
    [91, 92, 91, 98, 96, 96, 96, 99, 98, 99],
    [96, 96, 96, 99, 96, 99, 96, 100, 98, 97],
    [100, 98, 97, 99, 96, 96, 96, 96, 97, 96],
    [100, 98, 97, 96, 96, 95, 96, 97, 96, 96],
  ];

  POSITION_VALUES.Tot = [
    [9, 19, 19, 19, 14, 7, 7, 0, 0, 0],
    [9, 24, 24, 23, 18, 0, 0, 0, 0, 0],
    [9, 34, 32, 27, 20, 13, 7, 0, 0, 0],
    [11, 42, 37, 29, 27, 0, 0, 0, 0, 0],
    [13, 44, 37, 30, 29, 16, 15, 0, 0, 0],
    [11, 42, 37, 29, 27, 0, 0, 0, 0, 0],
    [9, 34, 32, 27, 20, 13, 7, 0, 0, 0],
    [9, 24, 24, 23, 18, 0, 0, 0, 0, 0],
    [9, 19, 19, 19, 14, 7, 7, 0, 0, 0],
  ];

  // function to parse the side are playing now
  function parseSide(isRedPiece) {
    let scale = 0;
    if (typeof isRedPiece === "boolean") {
      if (isRedPiece) scale = 1;
      else scale = -1;
    } else if (typeof isRedPiece === "string") {
      isRedPiece = isRedPiece.toLowerCase();
      if (isRedPiece === "red" || isRedPiece === "r") scale = 1;
      if (isRedPiece === "black" || isRedPiece === "b") scale = -1;
    } else if (typeof isRedPiece === "number") {
      isRedPiece = Math.sign(isRedPiece);
    }
    if (scale == 0) throw new Error("Invalid isRedPiece value");
    return scale;
  }

  // Public class to identify a new Piece
  class Piece {
    constructor(scale, position, baseValue) {
      this.scale = scale;
      this.position = position;
      this.baseValue = baseValue;
      this.selected = false;
    }
    getCurrentValue() {
      return this.scale * (this.baseValue + this._getPositionValue());
    }
    show(canvas2dcontext) {
      canvas2dcontext.save();
      canvas2dcontext.globalAlpha = 1;
      canvas2dcontext.drawImage(
        this.getImg(),
        35 * this.position.x + 5,
        36 * this.position.y + 19
      );
      canvas2dcontext.restore();
    }
    getImg() {
      let out = new Image();
      out.src = "/img/stype_1/" + this.imgStr + ".png";
      return out;
    }
    click(board) {
      this.selected = !this.selected;
      if (this.selected) {
        let moves = this.getPosibleMoves(board);
      }
    }
    getPosibleMoves(_board) {
      return [];
    }
    _getPositionValue() {
      return 0;
    }
    toString() {
      return "";
    }
  }

  // all Class for each type of piece
  class Xe extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Xe);
      if (scale == 1) {
        var properties = PROPERTIES.red.Xe;
      } else {
        var properties = PROPERTIES.black.Xe;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Xe[x][y];
    }
  }

  class Ma extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Ma);
      if (scale == 1) {
        var properties = PROPERTIES.red.Ma;
      } else {
        var properties = PROPERTIES.black.Ma;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Ma[x][y];
    }
  }

  class Vua extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Vua);
      if (scale == 1) {
        var properties = PROPERTIES.red.Vua;
      } else {
        var properties = PROPERTIES.black.Vua;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
  }

  class Si extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Si);
      if (scale == 1) {
        var properties = PROPERTIES.red.Si;
      } else {
        var properties = PROPERTIES.black.Si;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Si[x][y];
    }
  }

  class Tuong extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Tuong);
      if (scale == 1) {
        var properties = PROPERTIES.red.Tuong;
      } else {
        var properties = PROPERTIES.black.Tuong;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Tuong[x][y];
    }
  }

  class Phao extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Phao);
      if (scale == 1) {
        var properties = PROPERTIES.red.Phao;
      } else {
        var properties = PROPERTIES.black.Phao;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Phao[x][y];
    }
  }

  class Tot extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Tot);
      if (scale == 1) {
        var properties = PROPERTIES.red.Tot;
      } else {
        var properties = PROPERTIES.black.Tot;
      }
      this.text = properties.text;
      this.imgStr = properties.imgStr;
    }
    _getPositionValue() {
      let { x, y } = this.position;
      if (this.scale < 0) {
        y = y * this.scale - 1;
      }
      return POSITION_VALUES.Tot[x][y];
    }
  }

  // ----------------------------------------------------------------
  // class_Board
  // ----------------------------------------------------------------

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
    constructor(startPositions) {
      var _a;
      this.redToPlay = true;
      this.onBoardPieces = [];
      this.turn = 0;
      var refinedStartPositions;
      if (startPositions) refinedStartPositions = startPositions;
      else refinedStartPositions = defaultPosition;
      this.piecesPositionOnBoard = [];
      for (var i = 0; i < refinedStartPositions.length; i++) {
        let colPieces = [];
        this.piecesPositionOnBoard.push(colPieces);
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
      if (this.redToPlay) {
        this.redToPlay = false;
      } else {
        this.redToPlay = true;
        this.turn += 1;
      }
      this.onBoardPieces.splice(
        this.onBoardPieces.findIndex((x) => {
          x == captured;
        }),
        1
      );
      return { captured: captured, board: this };
    }
  }

  // ----------------------------------------------------------------
  // class_Bot
  // ----------------------------------------------------------------

  // Class Bot for calculate move in depth
  class Bot {
    constructor(searchDepth, botIsRed, startPositions) {
      this.board = new BoardBot(startPositions, null, null);
      this.searchDepth = searchDepth;
      this.botIsRed = botIsRed;
    }
    opponentMakeMove(move) {
      this.board = this.board.movePiece(move).board;
      this.board.makeTree(this.board.turn + this.searchDepth);
      let botMove;
      if (this.botIsRed) botMove = this._maxValue(this.board).move;
      else botMove = this._minValue(this.board).move;
      return botMove;
    }
    _maxValue(nextBoard) {
      if (nextBoard.turn - this.board.turn >= this.searchDepth) {
        if (nextBoard.prevMove)
          return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
        else throw new Error("This board `" + nextBoard + "` is broken");
      } else {
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
        if (move) return { point: point, move: move };
        else throw new Error("This board `" + nextBoard + "` is broken");
      }
    }
    _minValue(nextBoard) {
      if (nextBoard.turn - this.board.turn >= this.searchDepth) {
        if (nextBoard.prevMove)
          return { point: nextBoard.getPoint(), move: nextBoard.prevMove };
        else throw new Error("This board `" + nextBoard + "` is broken");
      } else {
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
        if (move) return { point: point, move: move };
        else throw new Error("This board `" + nextBoard + "` is broken");
      }
    }
  }

  // Class Board of Bot
  class BoardBot extends Board {
    constructor(startPositions, prevMove, prevCaptured) {
      super(startPositions);
      this.nextBoards = [];
      if (prevMove) this.prevMove = prevMove;
      if (prevCaptured) this.prevCaptured = prevCaptured;
    }
    makeTree(untilTurnX) {
      if (this.turn >= untilTurnX) return;
      let moves = allMoves(this);
      moves.forEach((move) => {
        let { captured: c, board: b } = this.movePiece(move);
        this.nextBoards.push(b);
      });
    }
    movePiece(move) {
      for (let i = 0; i < this.nextBoards.length; i++) {
        if (this.nextBoards[i].prevMove === move) {
          return {
            captured: this.nextBoards[i].prevCaptured,
            board: this.nextBoards[i],
          };
        }
      }
      let b = new BoardBot(
        this.piecesPositionOnBoard,
        this.prevMove,
        this.prevCaptured
      );
      return b._movePiece(move);
    }
  }

  // ----------------------------------------------------------------
  // Common.js
  // ----------------------------------------------------------------

  function allMoves() {
    let x = allValidMove("black");
    // let x = allValidMove("red");
    console.log(x);
    return x;
  }

  // ----------------------------------------------------------------
  // Main function for game
  // ----------------------------------------------------------------

  const game = new Xiangqi();

  const config = {
    boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard.svg",
    pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
    orientation: "white",
    position: game.fen(),
    showNotation: false,
  };

  let board = Xiangqiboard("#myBoard1", config);

  let _selecting;
  let _moves;
  let _el_selecting;
  let _turn;

  function hasMove(moves, move) {
    for (let i in moves) {
      if (moves[i] === move) {
        return true;
      }
    }
  }

  function allValidMove(_side) {
    let validMoves = [];

    if (_side == "black") {
      for (let i = 0; i <= 9; i++) {
        for (let j = 0; j < 9; j++) {
          let c = ".square-";

          switch (j) {
            case 0:
              c += "a";
              break;
            case 1:
              c += "b";
              break;
            case 2:
              c += "c";
              break;
            case 3:
              c += "d";
              break;
            case 4:
              c += "e";
              break;
            case 5:
              c += "f";
              break;
            case 6:
              c += "g";
              break;
            case 7:
              c += "h";
              break;
            case 8:
              c += "i";
              break;
          }
          c += i;

          var piece = document.querySelector(c);

          if (piece.getElementsByTagName("img").length > 0) {
            let p = piece
              .getElementsByTagName("img")[0]
              .getAttribute("data-piece");
            if (p[0] == "b") {
              var square = $(piece).data("square");
              var moves = game.moves({ square });

              for (let k = 0; k < moves.length; k++) {
                viTri1 = moves[k][0] + moves[k][1];
                viTri2 = moves[k][2] + moves[k][3];
                validMoves.push({ vt1: viTri1, vt2: viTri2 });
              }
            }
          }
        }
      }

      if (validMoves.length == 0) {
        window.alert("Game over. You wins");
        window.alert("Please, restart the game !");
      }
      validMoves = [];
    }
    if (_side == "red") {
      for (let i = 0; i <= 9; i++) {
        for (let j = 0; j < 9; j++) {
          let c = ".square-";
          switch (j) {
            case 0:
              c += "a";
              break;
            case 1:
              c += "b";
              break;
            case 2:
              c += "c";
              break;
            case 3:
              c += "d";
              break;
            case 4:
              c += "e";
              break;
            case 5:
              c += "f";
              break;
            case 6:
              c += "g";
              break;
            case 7:
              c += "h";
              break;
            case 8:
              c += "i";
              break;
          }
          c += i;

          var piece = document.querySelector(c);

          if (piece.getElementsByTagName("img").length > 0) {
            let p = piece
              .getElementsByTagName("img")[0]
              .getAttribute("data-piece");
            if (p[0] == "r") {
              var square = $(piece).data("square");
              var moves = game.moves({ square });

              for (let k = 0; k < moves.length; k++) {
                viTri1 = moves[k][0] + moves[k][1];
                viTri2 = moves[k][2] + moves[k][3];
                validMoves.push({ vt1: viTri1, vt2: viTri2 });
              }
            }
          }
        }
      }

      if (validMoves.length == 0) {
        window.alert("Game over. You loses");
        window.alert("Please, restart the game !");
      }
      validMoves = [];
    }
  }

  $(".square-2b8ce").click(function () {
    _turn = game.turn();
    console.log(_turn);
    // console.log("game.fen = " + game.fen());

    let square = $(this).data("square");
    let moves = game.moves({ square });
    let move = _selecting + square;

    // Các vị trí có thể đi
    // console.dir(moves);

    // Hiển thị vị trí đã chọn
    // console.log(square, _moves, move, _selecting);

    if (moves.length) {
      _el_selecting ? _el_selecting.classList.remove("selecting") : "";
      this.classList.add("selecting");
      _el_selecting = this;
      _selecting = square;
      _moves = moves;
    }

    if (_selecting && hasMove(_moves, move)) {
      _selecting = null;
      _moves = null;

      // hiển thị chuỗi nước đi đã chọn
      // console.log(move);

      game.move(move);
      board.position(game.fen());

      if (_turn == "r") {
        allValidMove("black");
      }
      if (_turn == "b") {
        allValidMove("red");
      }
    }
  });

  $(".undo_btn").click(function () {
    _turn--;
    game.undo();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });

  $(".redo_btn").click(function () {
    _turn++;
    game.redo();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });

  $(".reset_btn").click(function () {
    _turn++;
    game.reset();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });
})();
