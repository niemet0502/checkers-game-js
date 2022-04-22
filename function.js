function movePiece(e) {
  let piece = e.target;
  const row = parseInt(piece.getAttribute("row"));
  const column = parseInt(piece.getAttribute("column"));
  let p = new Piece(row, column);

  if (
    posNewPosition.length > 0 &&
    whoCanMove === matrix[readyToMove.row][readyToMove.column]
  ) {
    enableToMove(p);
  }

  if (whoCanMove === matrix[row][column]) {
    checkIfPieceCanMove(p);
  }
}

function enableToMove(p) {
  let find = false;
  let newPosition = null;
  // check if the case where the player play the selected piece can move on
  posNewPosition.forEach((element) => {
    if (element.compare(p)) {
      find = true;
      newPosition = element;
      return;
    }
  });

  if (find) moveThePiece(newPosition);
  else builBoard();
}

function moveThePiece(newPosition) {
  // if the current piece can move on, edit the board and rebuild
  matrix[newPosition.row][newPosition.column] = whoCanMove;
  matrix[readyToMove.row][readyToMove.column] = 0;

  // init value
  readyToMove = null;
  posNewPosition = [];

  if (whoCanMove === -1) {
    whoCanMove = 1;
  } else {
    whoCanMove = -1;
  }
  displayCurrentPlayer();
  builBoard();
}

function checkIfPieceCanMove(p) {
  if (whoCanMove === -1) {
    // black player
    findPossibleNewPosition(p, 1);
  } else {
    //white player
    findPossibleNewPosition(p, -1);
  }
}

function findPossibleNewPosition(piece, player) {
  if (matrix[piece.row + player][piece.column + 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, 1);
  }

  if (matrix[piece.row + player][piece.column - 1] === 0) {
    readyToMove = piece;
    markPossiblePosition(piece, player, -1);
  }
}

function markPossiblePosition(p, player, direction) {
  attribute = parseInt(p.row + player) + "-" + parseInt(p.column + direction);

  position = document.querySelector("[data-position='" + attribute + "']");
  if (position) {
    position.style.background = "green";
    // // save where it can move
    posNewPosition.push(new Piece(p.row + player, p.column + direction));
  }
}

function builBoard() {
  game.innerHTML = "";
  let black = 0;
  let white = 0;
  for (let i = 0; i < matrix.length; i++) {
    const element = matrix[i];
    let row = document.createElement("div"); // create div for each row
    row.setAttribute("class", "row");

    for (let j = 0; j < element.length; j++) {
      const elmt = element[j];
      let col = document.createElement("div"); // create div for each case
      let piece = document.createElement("div");
      let caseType = "";
      let occupied = "";

      if (i % 2 === 0) {
        if (j % 2 === 0) {
          caseType = "Whitecase";
        } else {
          caseType = "blackCase";
        }
      } else {
        if (j % 2 !== 0) {
          caseType = "Whitecase";
        } else {
          caseType = "blackCase";
        }
      }

      // add the piece if the case isn't empty
      if (matrix[i][j] === 1) {
        occupied = "whitePiece";
      } else if (matrix[i][j] === -1) {
        occupied = "blackPiece";
      } else {
        occupied = "empty";
      }

      piece.setAttribute("class", "occupied " + occupied);

      // set row and colum in the case
      piece.setAttribute("row", i);
      piece.setAttribute("column", j);
      piece.setAttribute("data-position", i + "-" + j);

      //add event listener to each piece
      piece.addEventListener("click", movePiece);

      col.appendChild(piece);

      col.setAttribute("class", "column " + caseType);
      row.appendChild(col);

      // counter number of each piece
      if (matrix[i][j] === -1) {
        black++;
      } else if (matrix[i][j] === 1) {
        white++;
      }

      //display the number of piece for each player
      // displayCounter(black, white);
    }

    game.appendChild(row);
  }
}

function displayCurrentPlayer() {
  var container = document.getElementById("next-player");
  if (container.classList.contains("whitePiece")) {
    container.setAttribute("class", "occupied blackPiece");
  } else {
    container.setAttribute("class", "occupied whitePiece");
  }
}
