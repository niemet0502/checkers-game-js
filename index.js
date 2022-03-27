class Piece {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

let game = document.getElementById("game");
let readyToMove = null;
let posNewPostion = [];
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
      matrix[row + 1][column - 1] === 0 ||
      matrix[row + 1][column - 1] === 0
    ) {
      console.log("can move");
      // save the piece that want to move
      // save where it can move
      // make their background green
    }
  } else {
    if (
      matrix[row - 1][column - 1] === 0 ||
      matrix[row - 1][column - 1] === 0
    ) {
      // save the piece that want to move
      readyToMove = new Piece(row, column);
      console.log(readyToMove);

      // save where it can move

      let possibility = null;
      let attribute = null;
      if (matrix[row - 1][column - 1] === 0) {
        attribute =
          parseInt(parseInt(row) - 1) + "-" + parseInt(parseInt(column) - 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";
      }

      if (matrix[row - 1][parseInt(column) + 1] === 0) {
        attribute =
          parseInt(parseInt(row) - 1) + "-" + parseInt(parseInt(column) + 1);
        possibility = document.querySelector(
          "[data-position='" + attribute + "']"
        );
        possibility.style.background = "green";
      }

      // make their background green
    }
  }
}

function movePiece(e) {
  let piece = e.target;
  const row = piece.getAttribute("row");
  const column = piece.getAttribute("column");

  //check if you're allowed to play
  if (whoCanMove === matrix[row][column]) {
    checkIfPieceCanMove(row, column);
  }
}

builBoard();
