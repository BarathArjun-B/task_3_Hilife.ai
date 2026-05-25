const boardElement = document.querySelector('#board');
const statusText = document.querySelector('#statusText');
const restartButton = document.querySelector('#restartButton');
const newGameButton = document.querySelector('#newGameButton');

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function updateStatus(text) {
  statusText.innerText = text;
}

function changeTurn() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Player ${currentPlayer}'s turn`);
}

function checkWinner() {
  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return { winner: boardState[a], pattern };
    }
  }

  if (!boardState.includes('')) {
    return { winner: null, pattern: [] };
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  if (!gameActive || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.innerText = currentPlayer;

  const result = checkWinner();

  if (result) {
    gameActive = false;

    if (result.winner) {
      updateStatus(`Player ${result.winner} Wins`);
      highlightWinningCells(result.pattern);
    } else {
      updateStatus('Match Draw');
    }

    return;
  }

  changeTurn();
}

function highlightWinningCells(pattern) {
  pattern.forEach((index) => {
    const cell = boardElement.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.classList.add('winner');
    }
  });
}

function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
  clearBoard();
}

function newGame() {
  restartGame();
}

function clearBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.innerText = '';
    cell.classList.remove('winner');
  });
}

function setupBoard() {
  const cells = boardElement.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
}

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', newGame);

setupBoard();
updateStatus(`Player ${currentPlayer}'s turn`);
