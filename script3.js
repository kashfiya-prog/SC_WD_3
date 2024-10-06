const board = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsComputerButton = document.getElementById('player-vs-computer');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'PVP'; // Default game mode: Player vs Player

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

// Handle player click
function handleClick(index) {
  if (boardState[index] === '') {
    boardState[index] = currentPlayer;
    board[index].textContent = currentPlayer;
    
    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (boardState.every(cell => cell !== '')) {
      alert("It's a tie!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      
      if (gameMode === 'PVC' && currentPlayer === 'O') {
        computerMove();
      }
    }
  }
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === currentPlayer;
    });
  });
}

// Reset the game
function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  board.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}

// Player vs Computer logic
function computerMove() {
  let availableCells = boardState
    .map((cell, index) => cell === '' ? index : null)
    .filter(index => index !== null);

  let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  handleClick(randomIndex);
}

// Add event listeners to the cells
board.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

// Add reset button event listener
resetButton.addEventListener('click', resetGame);

// Set game mode: Player vs Player
playerVsPlayerButton.addEventListener('click', () => {
  gameMode = 'PVP';
  resetGame();
});

// Set game mode: Player vs Computer
playerVsComputerButton.addEventListener('click', () => {
  gameMode = 'PVC';
  resetGame();
});
