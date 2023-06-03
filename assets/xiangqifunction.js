    (() => {

      const game = new Xiangqi();

      const config = {
          boardTheme: './docs/img/xiangqiboards/wikimedia/xiangqiboard.svg',
          pieceTheme: './docs/img/xiangqipieces/wikimedia/{piece}.svg',
          orientation: 'white',
          position: game.fen(),
          showNotation: true
      }

      let board = Xiangqiboard("#myBoard1", config);

      let _selecting;
      let _moves;
      let _el_selecting;
      let _turn = 1;
      let _history_fen = [game.fen()];

      function hasMove(moves, move) {
        for (let i in moves) {
            if(moves[i] === move) {
                return true;
            }
        }
      }

      function allValidMove(_side) {
          let validMoves = [];

          if (_side == "black") {
            for (let i = 0; i <= 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let c = ".square-"

                    switch (j) {
                      case 0: c += "a"; break;
                      case 1: c += "b"; break;
                      case 2: c += "c"; break;
                      case 3: c += "d"; break;
                      case 4: c += "e"; break;
                      case 5: c += "f"; break;
                      case 6: c += "g"; break;
                      case 7: c += "h"; break;
                      case 8: c += "i"; break;
                    }
                    c += i;
                    
                    var piece = document.querySelector(c);

                    if( piece.getElementsByTagName('img').length > 0 ) {
                        let p = piece.getElementsByTagName('img')[0].getAttribute('data-piece');
                        if( p[0] == "b") {
                            var square = $(piece).data('square');
                            var moves = game.moves({square});

                            for (let k = 0; k < moves.length; k++) {
                                viTri1 = moves[k][0] + moves[k][1];
                                viTri2 = moves[k][2] + moves[k][3];
                                validMoves.push({vt1 : viTri1, vt2 : viTri2});
                            }
                        }
                    }
                }
            }

            console.dir(validMoves);
            validMoves = [];
          }
          if (_side == "red") {
            for (let i = 0; i <= 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let c = ".square-"
                    switch (j) {
                      case 0: c += "a"; break;
                      case 1: c += "b"; break;
                      case 2: c += "c"; break;
                      case 3: c += "d"; break;
                      case 4: c += "e"; break;
                      case 5: c += "f"; break;
                      case 6: c += "g"; break;
                      case 7: c += "h"; break;
                      case 8: c += "i"; break;
                    }
                    c += i;
                    
                    var piece = document.querySelector(c);

                    if( piece.getElementsByTagName('img').length > 0 ) {
                        let p = piece.getElementsByTagName('img')[0].getAttribute('data-piece');
                        if( p[0] == "r") {
                            var square = $(piece).data('square');
                            var moves = game.moves({square});

                            for (let k = 0; k < moves.length; k++) {
                                viTri1 = moves[k][0] + moves[k][1];
                                viTri2 = moves[k][2] + moves[k][3];
                                validMoves.push({vt1 : viTri1, vt2 : viTri2});
                            }
                        }
                    }
                }
            }

            console.dir(validMoves);
            validMoves = [];
          }
      }

      $('.square-2b8ce').click(function() {
          _turn = game.turn();
          console.log(_turn);
          // console.log("game.fen = " + game.fen());

          let square = $(this).data('square');
          let moves = game.moves({square});
          let move =  _selecting + square;

          // Các vị trí có thể đi
          // console.dir(moves); 

          // Hiển thị vị trí đã chọn
          // console.log(square, _moves, move, _selecting);

          if(_selecting && hasMove(_moves, move)) {
            _selecting = null;
            _moves = null;

            // hiển thị chuỗi nước đi đã chọn
            // console.log(move);

            game.move(move);
            board.position(game.fen());

            // if (_turn == "b") {
            //   allValidMove("black");
            // }
            // if (_turn == "r") {
            //   allValidMove("red");
            // }
          }

          if(moves.length) {
              _el_selecting ? _el_selecting.classList.remove('selecting'): '';
              this.classList.add('selecting');
              _el_selecting = this;
              _selecting = square;
              _moves = moves;
          }
      })

      $('.undo_btn').click(function() {
          _turn--;
          game.undo();
          board.position(game.fen());
          _el_selecting ? _el_selecting.classList.remove('selecting'): '';
      })

      $('.redo_btn').click(function() {
          _turn++;
          game.redo();
          board.position(game.fen());
          _el_selecting ? _el_selecting.classList.remove('selecting'): '';
      })

      $('.reset_btn').click(function() {
          _turn++;
          game.reset();
          board.position(game.fen());
          _el_selecting ? _el_selecting.classList.remove('selecting'): '';
      })

    })();