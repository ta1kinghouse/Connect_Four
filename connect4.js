const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; 
const board = []; 

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++ ) {
    board.push(Array.from({length: WIDTH}))
  }
}

function makeHtmlBoard () {
  const htmlBoard = document.getElementById('board');
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  for(let y = HEIGHT - 1; y>=0; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
};

const placeInTable = (y, x) => {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`player${currPlayer}`);
  piece.style.top = -50 * (y + 2);
  const place = document.getElementById(`${y}-${x}`);
  place.append(piece);
}

function endGame(msg) {
  alert(msg)
}

function handleClick(evt) {
  const x = +evt.target.id;

  const y = findSpotForCol(x) 
    if (y === null) {
      return;
    }
   
    board[y][x] = currPlayer;
    placeInTable(y, x);
  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

if(board.every(row => row.every(cell => cell))){
  return endGame(`It's a tie!`);
}

  currPlayer = currPlayer === 1 ? 2 : 1;
}

function checkForWin() {
  function _win(cells){
     return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard(); 


