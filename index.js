class Piece {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  compare(piece) {
    if (
      parseInt(piece.row) === parseInt(this.row) &&
      parseInt(piece.col) === parseInt(this.col)
    )
      return true;
    return false;
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

function displayCounter(black, white) {
  var blackContainer = document.getElementById("black-player-count-pieces");
  var whiteContainer = document.getElementById("white-player-count-pieces");
  blackContainer.innerHTML = black;
  whiteContainer.innerHTML = white;
}

let game = document.getElementById("game");
let readyToMove = null;
let posNewPosition = [];
let capturedPosition = [];
let matrix = [
  [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
];

let whoCanMove = 1;
let WhereCanYouMove = [];

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
      displayCounter(black, white);
    }

    game.appendChild(row);
  }
}

function checkIfPieceCanMove(row, column) {
  // check your type of piece white or black
  if (whoCanMove === -1) {
    if (
      matrix[parseInt(row) + 1][parseInt(column) + 1] === 0 ||
      matrix[parseInt(row) + 1][parseInt(column) - 1] === 0
    ) {
      // save the piece that want to move
      readyToMove = new Piece(row, column);

      // make their background green
      let possibility = null;
      let attribute = null;
      if (matrix[parseInt(row) + 1][column - 1] === 0) {
        attribute =
          parseInt(parseInt(row) + 1) + "-" + parseInt(parseInt(column) - 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";

        // save where it can move
        posNewPosition.push(
          new Piece(parseInt(parseInt(row) + 1), parseInt(parseInt(column) - 1))
        );
      }

      if (matrix[parseInt(row) + 1][parseInt(column) + 1] === 0) {
        attribute =
          parseInt(parseInt(row) + 1) + "-" + parseInt(parseInt(column) + 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";

        // save where it can move
        posNewPosition.push(
          new Piece(parseInt(parseInt(row) + 1), parseInt(parseInt(column) + 1))
        );
      }
    }
  } else {
    // if you are player WHITE
    if (
      // check if you can move the current piece
      matrix[row - 1][column - 1] === 0 ||
      matrix[row - 1][parseInt(column) + 1] === 0
    ) {
      // save the piece that want to move
      readyToMove = new Piece(row, column);

      // make their background green
      let possibility = null;
      let attribute = null;
      if (matrix[row - 1][column - 1] === 0) {
        attribute =
          parseInt(parseInt(row) - 1) + "-" + parseInt(parseInt(column) - 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";

        // save where it can move
        posNewPosition.push(
          new Piece(parseInt(parseInt(row) - 1), parseInt(parseInt(column) - 1))
        );
      }

      if (matrix[row - 1][parseInt(column) + 1] === 0) {
        attribute =
          parseInt(parseInt(row) - 1) + "-" + parseInt(parseInt(column) + 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";

        // save where it can move
        posNewPosition.push(
          new Piece(parseInt(parseInt(row) - 1), parseInt(parseInt(column) + 1))
        );
      }
    }

    // check if you can capture an adversaire's piece

    if (
      matrix[row - 1][column + 1] === -1 &&
      matrix[row - 2][column + 2] === 0
    ) {
      console.log("here to");
      attribute =
        parseInt(parseInt(row) - 2) + "-" + parseInt(parseInt(column) + 2);
      possibility = document.querySelector(
        "[data-position='" + attribute + "']"
      );
      possibility.style.background = "green";

      // save where it can move
      capturedPosition.push({
        newPosition: new Piece(
          parseInt(parseInt(row) - 2),
          parseInt(parseInt(column) + 2)
        ),
        pieceCaptured: new Piece(row - 1, column + 1),
      });

      console.log(capturedPosition);
    }
  }
}

function movePiece(e) {
  let piece = e.target;
  const row = piece.getAttribute("row");
  const column = piece.getAttribute("column");

  //check if you can capture an opponent's piece

  if (capturedPosition.length > 0) {
    const newPiece = new Piece(row, column);
    let find = false;
    let pos = null;
    capturedPosition.forEach((element) => {
      if (element.newPosition.compare(newPiece)) {
        find = true;
        pos = element.newPosition;
        old = element.pieceCaptured;
        return;
      }
    });

    if (find) {
      // if the current piece can move on, edit the board and rebuild
      matrix[parseInt(pos.row)][parseInt(pos.col)] = whoCanMove; // move the piece
      matrix[parseInt(readyToMove.row)][parseInt(readyToMove.col)] = 0; // delete the old position
      // delete the piece that had been captured
      matrix[parseInt(old.row)][parseInt(old.col)] = 0;

      // reinit ready to move value

      readyToMove = null;
      capturedPosition = [];
      if (whoCanMove === -1) {
        whoCanMove = 1;
      } else {
        whoCanMove = -1;
      }
      displayCurrentPlayer();
      builBoard();
    } else {
      builBoard();
    }
  } else {
    // check if the potential new position is empty
    if (posNewPosition.length > 0) {
      const newPiece = new Piece(row, column);
      let find = false;
      let pos = null;

      // check if the case where the player play the selected piece can move on
      posNewPosition.forEach((element) => {
        if (element.compare(newPiece)) {
          find = true;
          pos = element;
          return;
        }
      });

      if (find) {
        // if the current piece can move on, edit the board and rebuild
        matrix[parseInt(pos.row)][parseInt(pos.col)] = whoCanMove;
        matrix[parseInt(readyToMove.row)][parseInt(readyToMove.col)] = 0;

        // reinit ready to move value

        readyToMove = null;
        posNewPosition = [];
        if (whoCanMove === -1) {
          whoCanMove = 1;
        } else {
          whoCanMove = -1;
        }
        displayCurrentPlayer();
        builBoard();
      } else {
        builBoard();
      }
    }
  }

  //check if you're allowed to play
  if (whoCanMove === matrix[row][column]) {
    checkIfPieceCanMove(parseInt(row), parseInt(column));
  }
}

builBoard();
