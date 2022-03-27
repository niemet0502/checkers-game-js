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

let game = document.getElementById("game");
let readyToMove = null;
let posNewPosition = [];
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
    }

    game.appendChild(row);
  }
}

function checkIfPieceCanMove(row, column) {
  if (whoCanMove === -1) {
    // check your type of piece white or black
    if (
      matrix[parseInt(row) + 1][parseInt(column) + 1] === 0 ||
      matrix[parseInt(row) + 1][parseInt(column) - 1] === 0
    ) {
      console.log("can move");
      // save the piece that want to move
      // save where it can move
      // make their background green

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
    if (
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
  }
}

function movePiece(e) {
  let piece = e.target;
  const row = piece.getAttribute("row");
  const column = piece.getAttribute("column");

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
      builBoard();
    } else {
      builBoard();
    }
  }

  //check if you're allowed to play
  if (whoCanMove === matrix[row][column]) {
    checkIfPieceCanMove(row, column);
  }
}

builBoard();
