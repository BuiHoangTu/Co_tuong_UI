(() => {
  // Khởi tạo
  const game = new Xiangqi();

  const config = {
    boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard2.svg",
    pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
    orientation: "white",
    position: game.fen(),
    // showNotation: false,
  };

  let board = Xiangqiboard("#myBoard1", config);
  let board1 = Xiangqiboard("#myBoard2", config);

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
    [0, 0, 18, 0, 0, 0, 0, 18, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 20, 20, 0, 0, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 23, 0, 0, 0, 0, 23, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 0, 0, 20, 20, 0, 0, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 18, 0, 0, 0, 0, 18, 0, 0]
  ];

  POSITION_VALUES.Si = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [20, 0, 20, 0, 0, 0, 0, 20, 0, 20],
    [0, 23, 0, 0, 0, 0, 0, 0, 23, 0],
    [20, 0, 20, 0, 0, 0, 0, 20, 0, 20],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

    toString() {
      return this.scale > 0 ? "C" : "c";
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

    toString() {
      return this.scale > 0 ? "M" : "m";
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

    toString() {
      return this.scale > 0 ? "J" : "j";
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

    toString() {
      return this.scale > 0 ? "S" : "s";
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

    toString() {
      return this.scale > 0 ? "X" : "x";
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

    toString() {
      return this.scale > 0 ? "P" : "p";
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

    toString() {
      return this.scale > 0 ? "Z" : "z";
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

  // Class Bot for calculate move in depth
  class Bot {
    constructor(searchDepth, botIsRed, startPositions) {
      this.board = new BoardBot(startPositions, null, null);
      this.searchDepth = searchDepth;
      this.botIsRed = botIsRed;
    }

    // --------------------------------------------

    botFirstMove() {
      let firstMove = {
        oldPosition: { x: 4, y: 3 },
        newPosition: { x: 4, y: 4 }
      };
      this.board._movePiece(firstMove);
      return firstMove;
    }

    // TODO: Chưa thấy dùng -----------------------

    async opponentMakeMove(move) {
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
    buildBoardTree(untilTurnX) {
      return __awaiter(this, void 0, void 0, function* () {
        let _moves = [];

        if (this.turn >= untilTurnX) return;

        if (this.nextBoards.length == 0) {
          let moves = allValidMove();
          moves.forEach((move) => {
            _moves.push(parseMove(move));
            let b = this.movePiece(move).board;
            this.nextBoards.push(b);
          });
        }

        console.log(_moves);

        let i = 0;

        this.nextBoards.forEach((nBoard) => {

          game.move(_moves[i]);
          turnBlackturn();

          // js
          nBoard.buildBoardTree(untilTurnX);

          game.undo();
          i++;
        });
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
      b.turn++;
      return b._movePiece(move);
    }
  }

  // ----------------------------------------------------------------
  // Main function for game
  // ----------------------------------------------------------------

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

  function turnBlackturn() {
    let fen = game.fen();
    let x;

    for (let i = 0; i < fen.length; i++) {
      if (fen[i] == 'r' && fen[i - 1] == ' ') x = i;
    }

    fen = fen.slice(0, x) + 'b' + fen.slice(x + 1, fen.length);

    game.load(fen);
    board.position(game.fen());
  }

  function allValidMove(_side) {
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

  $(".square-2b8ce").click(function () {

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
      board1.position(game.fen());

      if (_turn == "r") {
        let oldFen = game.fen();

        let bot = new Bot(1, false, null);

        let oppMove = "";

        // console.log(move);

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

        // console.log(oppMove);

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

        console.log(bot.opponentMakeMove(_oopMove));
      }
    }
  });

  $(".undo_btn").click(function () {
    game.undo();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });

  $(".redo_btn").click(function () {
    game.redo();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });

  $(".reset_btn").click(function () {
    game.reset();
    board.position(game.fen());
    _el_selecting ? _el_selecting.classList.remove("selecting") : "";
  });
})();
