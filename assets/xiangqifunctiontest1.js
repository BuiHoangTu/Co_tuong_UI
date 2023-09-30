(() => {
  // Khởi tạo
  const game = new Xiangqi();

  let _oldFen = [];
  _oldFen.push(game.fen());
  let _oldBoard = [];
  let _depth = 3;
  let _turnIndex = 0;

  const config = {
    boardTheme: "./docs/img/xiangqiboards/wikimedia/xiangqiboard2.svg",
    pieceTheme: "./docs/img/xiangqipieces/wikimedia/{piece}.svg",
    orientation: "white",
    position: game.fen(),
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop
  };

  let BOARD = Xiangqiboard("#myBoard1", config);
  let BOARD1 = Xiangqiboard("#myBoard2", config);

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
    yLength: 10,
    xLength: 9
  };

  // Start value for each type of piece
  const VALUE = {
    Xe: 0,
    Ma: 0,
    Vua: 0,
    Si: 0,
    Tuong: 0,
    Phao: 0,
    Tot: 0,
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

  // POSITION_VALUES.Vua = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
  //   [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
  //   [8888, 8888, 8888, 0, 0, 0, 0, 8888, 8888, 8888],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ];

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
      if (isRedPiece)
        scale = 1;
      else
        scale = -1;
    }
    else if (typeof isRedPiece === "string") {
      isRedPiece = isRedPiece.toLowerCase();
      if (isRedPiece === "red" || isRedPiece === "r")
        scale = 1;
      if (isRedPiece === "black" || isRedPiece === "b")
        scale = -1;
    }
    else if (typeof isRedPiece === "number") {
      isRedPiece = Math.sign(isRedPiece);
    }
    if (scale == 0)
      throw new Error("Invalid isRedPiece value");
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
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
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
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
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
      if (scale > 0) {
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
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
      }
      return POSITION_VALUES.Ma[x][y];
    }

    toString() {
      return this.scale > 0 ? "S" : "s";
    }
  }

  class Tuong extends Piece {
    constructor(isRedPiece, position) {
      let scale = parseSide(isRedPiece);
      super(scale, position, VALUE.Tuong);
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
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
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
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
      if (scale > 0) {
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
        y = PROPERTIES.yLength - 1 - y; // length - 1 - y
        x = PROPERTIES.xLength - 1 - x;
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

  // infinity point
  const INFINITY = 100000;

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
      if (!move.oldPosition) console.log("BRUhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      let { x, y } = move.oldPosition;
      let thisPiece = this.piecesPositionOnBoard[x][y];
      if (!thisPiece) {
        throw new ErrorNoPieceOnBoard(this, move);
      }
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

        let start_Timer = Date.now();

        let botMove;
        this.board = this.board.movePiece(move).board;

        if (_turnIndex == 0 && gambleMove(parseMove(move)) != null ) {
          console.log("  - Status : Gamble move!");
          botMove = gambleMove(parseMove(move));
          console.log("  Bot move : " + botMove[0] + botMove[1] + "->" + botMove[2] + botMove[3]);

          // move in UI (web)
          game.move(botMove);
          BOARD.position(game.fen());
          BOARD1.position(game.fen());

          // move in boardBot
          let tmp = "";

          for (let l = 0; l < 4; l++) {
            if (botMove[l] == "a") tmp += "0";
            else if (botMove[l] == "b") tmp += "1";
            else if (botMove[l] == "c") tmp += "2";
            else if (botMove[l] == "d") tmp += "3";
            else if (botMove[l] == "e") tmp += "4";
            else if (botMove[l] == "f") tmp += "5";
            else if (botMove[l] == "g") tmp += "6";
            else if (botMove[l] == "h") tmp += "7";
            else if (botMove[l] == "i") tmp += "8";
            else tmp += botMove[l];
          }

          let viTri1 = { x: Number(tmp[0]), y: Number(tmp[1]) };
          let viTri2 = { x: Number(tmp[2]), y: Number(tmp[3]) };

          this.board = this.board.movePiece({ oldPosition: viTri1, newPosition: viTri2 }).board;

          _turnIndex++;
        } else {

          // console.log("main", (yield this._minMaxAlphaBeta()));
          // console.log(this.board);

          console.log("  - Status : AI bot move!");

          botMove = (yield this._minMaxAlphaBeta()).move;
          console.log("  Bot move : ");
          console.log(botMove);

          // move in UI (web)
          game.move(parseMove(botMove));
          BOARD.position(game.fen());
          BOARD1.position(game.fen());

          // move in boardBot
          
          // if black haven't any moves to move. Black lose
          if (allValidMove().length == 0) {
            alert("Game over !!! You win !!!");
            location.reload();
          }

          this.board = this.board.movePiece(botMove).board;
          _turnIndex++;

          // if Red haven't any moves to move. Red lose
          if (allValidMove().length == 0) {
            alert("Game over !!! You lose !!!");
            location.reload();
          }

          // return (yield this._minMaxAlphaBeta()).move;
        }

        let end_Timer = ( Date.now() - start_Timer ) / 1000;
        console.log("Move time : " + end_Timer + "s");
        console.log("-------------------------------")
      });
    }
    _minMaxAlphaBeta() {
      return __awaiter(this, void 0, void 0, function* () {
        let alphaBeta = { alpha: -INFINITY, beta: INFINITY };
        let minMaxOutput;
        if (this.botIsRed)
          minMaxOutput = this._maxAlphaBeta(this.board, alphaBeta);
        else
          minMaxOutput = this._minAlphaBeta(this.board, alphaBeta);
        return minMaxOutput;
      });
    }
    _minAlphaBeta(board, alphaBeta) {
      return __awaiter(this, void 0, void 0, function* () {
        if (board.prevMove.length == 0) throw new ErrorNoPrevMove(board);
        if (boardDepth(board) - boardDepth(this.board) >= this.searchDepth) {
          return { point: board.getPoint(), move: board.prevMove };
        }
        else {
          let oldFen = game.fen();

          let waiter;
          if (board.nextBoards.length == 0) {
            if (board.prevMove.length != 0) {
              game.move(parseMove(board.prevMove));
              BOARD.position(game.fen());
            }
            waiter = board.buildBoardLayer();
          }
          let point = INFINITY;
          let move;

          if (waiter) {
            try {
              yield waiter;
            }
            catch (errorGameOver) {
              if (errorGameOver instanceof ErrorGameOver) {
                move = board.prevMove;
                switch (errorGameOver.result) {
                  case 1: return { point: INFINITY, move: move };
                  case 0: return { point: 0, move: move };
                  case -1: return { point: -INFINITY, move: move };
                }
              }
              else
                throw errorGameOver;
            }
          }

          let nextBoards = board.nextBoards;
          // console.log(nextnextBoards);
          for (let i = 0; i < nextBoards.length; i++) {
            let maxValue = yield this._maxAlphaBeta(nextBoards[i], alphaBeta);
            if (point > maxValue.point) {
              point = maxValue.point;
              move = nextBoards[i].prevMove;
            }
            // console.log(point, move);
            if (point < alphaBeta.alpha)
              break;
            alphaBeta.beta = alphaBeta.beta < point ? alphaBeta.beta : point;
          }
          if (move) {
            // console.log({ point: point, move: move });
            game.load(oldFen);
            BOARD.position(game.fen());
            return { point: point, move: move };
          }
        }
      });
    }
    _maxAlphaBeta(board, alphaBeta) {
      return __awaiter(this, void 0, void 0, function* () {
        if (board.prevMove.length == 0) throw new ErrorNoPrevMove(board);
        if (boardDepth(board) - boardDepth(this.board) >= this.searchDepth) {
          return { point: board.getPoint(), move: board.prevMove };
        }
        else {
          let oldFen = game.fen();

          let waiter;
          if (board.nextBoards.length == 0) {
            if (board.prevMove.length != 0) {
              game.move(parseMove(board.prevMove));
              BOARD.position(game.fen());
            }
            waiter = board.buildBoardLayer();
          }
          let point = -INFINITY;
          let move;

          if (waiter) {
            try {
              yield waiter;
            }
            catch (errorGameOver) {
              if (errorGameOver instanceof ErrorGameOver) {
                move = board.prevMove;
                switch (errorGameOver.result) {
                  case 1: return { point: INFINITY, move: move };
                  case 0: return { point: 0, move: move };
                  case -1: return { point: -INFINITY, move: move };
                }
              }
              else
                throw errorGameOver;
            }
          }

          let nextBoards = board.nextBoards;
          // console.log(nextnextBoards);
          for (let i = 0; i < nextBoards.length; i++) {
            let minValue = yield this._minAlphaBeta(nextBoards[i], alphaBeta);
            if (point < minValue.point) {
              point = minValue.point;
              move = nextBoards[i].prevMove;
            }
            // console.log(point, move);
            if (point > alphaBeta.beta)
              break;
            alphaBeta.alpha = alphaBeta.beta > point ? alphaBeta.beta : point;
          }
          if (move) {
            // console.log({ point: point, move: move });
            game.load(oldFen);
            BOARD.position(game.fen());
            return { point: point, move: move };
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

  // ----------------------------------------------------------------
  // Error Board
  // ----------------------------------------------------------------

  class ErrorNoPieceOnBoard extends Error {
    constructor(board, move) {
      const template = "There is no piece on old position [{x}, {y}].";
      const message = template
        .replace("{x}", move.oldPosition.x + "")
        .replace("{y}", move.oldPosition.y + "")
        + " Board :\n" + board.toString();
      super(message);
    }
  }

  class ErrorNoPieceOnRecord extends Error {
    constructor(captured) {
      const template = "The captured Piece {pieceStr} was at [{x}, {y}] but wasn't exist in onBoardPieces.";
      const message = template
        .replace("{pieceStr}", captured.toString())
        .replace("{x}", captured.position.x + "")
        .replace("{y}", captured.position.y + "");
      super(message);
    }
  }

  class ErrorGameOver extends Error {
    constructor(result) {
      super();
      let message = "The game is ended: ";
      if (typeof result === "string") {
        result = result.toLowerCase();
        switch (result) {
          case "r" || "red":
            result = 1;
            break;
          case "b" || "black":
            result = -1;
            break;
          default:
            result = 0;
            break;
        }
      }
      switch (Math.sign(result)) {
        case 1:
          message += "Red wins.";
          this.result = 1;
          winResult();
          break;
        case -1:
          message += "Black wins.";
          this.result = -1;
          loseResult();
          break;
        default:
          message += "Draw.";
          this.result = 0;
          break;
      }
      this.message = message;
    }
  }

  class ErrorNoPrevMove extends Error {
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

  class ErrorTreeNotBuilt extends Error {
    constructor() {
      super("Tree is not built here");
    }
  }

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

    if (validMoves.length == 0) {
      if (game.turn() == 'r') throw new ErrorGameOver(-1);
      if (game.turn() == 'b') throw new ErrorGameOver(1);
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

      console.log("  My move : " + move[0] + move[1] + "->" + move[2] + move[3]);

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
    console.log(possibleMoves);

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
    BOARD.position(game.fen());
    BOARD1.position(game.fen());

    // illegal move
    if (move === null) return 'snapback';

    // make move
    console.log("running...");
    makeMove(move.from + move.to);
  }

  function gambleMove(move) {
    let oppMove = null;

    // Pháo
    if (move == 'b2e2' || move == 'h2e2') {
      let gambit = ['h7e7', 'b7e7', 'b9c7', 'h9g7'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    // Mã
    if (move == 'h0g2') {
      let gambit = ['b9c7', 'h9g7', 'h7e7', 'b7e7', 'g6g5'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    if (move == 'b0c2') {
      let gambit = ['b9c7', 'h9g7', 'h7e7', 'b7e7', 'c6c5'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    // Tốt
    if (move == 'c3c4') {
      let gambit = ['g6g5', 'h9g7', 'c9e7', 'b9c7'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    if (move == 'g3g4') {
      let gambit = ['c6c5', 'h9g7', 'g9e7', 'b9c7'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    // Tượng
    if (move == 'g0e2' || move == 'c0e2') {
      let gambit = ['h7e7', 'b7e7'];
      oppMove = gambit[Math.floor(Math.random() * gambit.length)];
    }

    return oppMove;
  }

  function winResult() {
    alert("Game over !!! You win !!!");
    location.reload();
  }

  function loseResult() {
    alert("Game over !!! You lose !!!");
    location.reload();
  }

  $(".undo_btn").click(function () {
    game.load(_oldFen[_oldFen.length - 1]);
    BOARD.position(game.fen());
    BOARD1.position(game.fen());
    _bot.setBoard(_oldBoard[_oldBoard.length - 1]);
    _oldFen.pop();
    _oldBoard.pop();
    if (_turnIndex == 1) _turnIndex = 0;
  });

  $(".reset_btn").click(function () {
    game.reset();
    BOARD.position(game.fen());
    BOARD1.position(game.fen());
    _bot = new Bot(_depth, false, null);
    _turnIndex = 0;
  });
})();
