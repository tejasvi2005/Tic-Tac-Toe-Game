let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#startGameBtn");
let gameStatus = document.querySelector("#gameStatus");

let currentPlayer = "X";
let playerX = "Player X";
let playerO = "Player O";
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let gameStarted = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Start game after getting player names
startGameBtn.addEventListener("click", () => {
  const nameX = document.getElementById("playerXName").value || "Player X";
  const nameO = document.getElementById("playerOName").value || "Player O";
  playerX = nameX;
  playerO = nameO;
  gameStarted = true;
  gameStatus.innerText = `${playerX}'s (X) turn`;
  resetBoard();
});

// Handle each box click
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!gameStarted || box.innerText !== "") return;

    box.innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    box.style.pointerEvents = "none";

    checkWinner();

    if (gameStarted) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const currentName = currentPlayer === "X" ? playerX : playerO;
      gameStatus.innerText = `It's ${currentName}'s (${currentPlayer}) turn`;
    }
  });
});

// Winner logic
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      gameGrid[a] !== "" &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[b] === gameGrid[c]
    ) {
      gameStarted = false;
      const winnerName = gameGrid[a] === "X" ? playerX : playerO;
      showWinner(`🎉 Winner is ${winnerName}!`);
      return;
    }
  }

  // Draw check
  if (!gameGrid.includes("")) {
    showWinner("It's a Draw!");
  }
};

// Show winner or draw
const showWinner = (winnerText) => {
  msg.innerText = winnerText;
  gameStatus.innerText = winnerText;
  msgContainer.classList.remove("hide");
  boxes.forEach((box) => (box.style.pointerEvents = "none"));
};

// Reset board only (used for New Game and Start)
const resetBoard = () => {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
  });
  msgContainer.classList.add("hide");
};

// Full reset (used for Reset Game)
resetBtn.addEventListener("click", () => {
  gameStarted = false;
  resetBoard();
  gameStatus.innerText = "Game reset. Enter player names to start.";
});

// New Game (after someone wins or draw)
newGameBtn.addEventListener("click", () => {
  resetBoard();
  const currentName = currentPlayer === "X" ? playerX : playerO;
  gameStatus.innerText = `It's ${currentName}'s (${currentPlayer}) turn`;
  gameStarted = true;
});