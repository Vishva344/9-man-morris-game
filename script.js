let currentPlayer = "X";
let deleteFlag = false;
let storeAvailableMoves = [];
let lastCircleId;
const player1Indicator = document.getElementById("player1");
const player2Indicator = document.getElementById("player2");
const turnElement = document.getElementById("turn");

let player1Position = [];
let player2Position = [];
let player1Moves = 9;
let player2Moves = 9;

function changeTurn() {
  player1Indicator.classList.toggle("active");
  player2Indicator.classList.toggle("active");
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurn();
}


function updateTurn() {
  turnElement.textContent = "Current Turn: Player " + currentPlayer;
}
function updateMoveCount() {
  document.getElementById("player1Moves").textContent = player1Moves;
  document.getElementById("player2Moves").textContent = player2Moves;
}

function handleAddClick(circleId, event) {
  let opponentPlayer = currentPlayer === "X" ? "O" : "X";
  let circle = event.target;

  if (
    !deleteFlag &&
    circle.textContent === "" &&
    (player1Moves != 0 || player2Moves != 0)
  ) {
    editCircle(circleId, circle);
  } else if (
    circle.getAttribute("data-value") === opponentPlayer &&
    deleteFlag
  ) {
    removeCircle(circleId, circle, opponentPlayer);
  } else if (
    (player1Moves === 0 || player2Moves === 0) &&
    circle.getAttribute("data-value") === currentPlayer && !deleteFlag
  ) {
    showHighlightedMoves(circleId, circle);
  } else if (
    storeAvailableMoves.includes(circleId) &&
    (player1Moves === 0 || player2Moves === 0) && !deleteFlag
  ) {
    moveMarker(circleId, circle);
  }
  declareWinner();

}

function editCircle(circleId, circle) {
  if (
    (currentPlayer === "X" && player1Moves === 0) ||
    (currentPlayer === "O" && player2Moves === 0)
  ) {
    return 
    
  }

  circle.textContent = currentPlayer;
  circle.setAttribute("data-value", currentPlayer);

  if (currentPlayer === "X" && player1Moves > 0) {
    
    player1Position.push(circleId);
    player1Moves--;
    
  } else {
    player2Position.push(circleId);
    player2Moves--;
  }
  updateMoveCount();
  let value;
  if (currentPlayer === "X") {
    value = player1Position;
  } else {
    value = player2Position;
  }
  if (!checkWinningCombos(circleId, value)) return changeTurn();
  alert("remove opponent element");
}

function removeCircle(circleId, circle, opponentPlayer) {
  let value;
  if (currentPlayer === "X") {
    value = player2Position;
  } else {
    value = player1Position;
  }
  
  if (circle.getAttribute("data-value") !== opponentPlayer) {
    alert("You can only remove your opponent's pawn!");
  } else if (checkWinningCombos(circleId, value)) {
    alert("you can not remove circle..");
  } else {
    circle.textContent = "";
    circle.setAttribute("data-value", " ");

    if (currentPlayer === "X") {
      const index = player2Position.indexOf(circleId);
      if (index !== -1) {
        player2Position.splice(index, 1);
      }
    } else {
      const index = player1Position.indexOf(circleId);
      if (index !== -1) {
        player1Position.splice(index, 1);
      }
    }
    changeTurn();
    deleteFlag = false;
  }
}

// wining condition part
const winingcombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
  [19, 20, 21],
  [22, 23, 24],
  [2, 5, 8],
  [17, 20, 23],
  [1, 10, 22],
  [3, 15, 24],
  [4, 11, 19],
  [7, 12, 16],
  [6, 14, 21],
  [9, 13, 18],
];

const rowWin = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
  [16, 17, 18],
  [19, 20, 21],
  [22, 23, 24],
];
const colWin = [
  [2, 5, 8],
  [17, 20, 23],
  [1, 10, 22],
  [3, 15, 24],
  [4, 11, 19],
  [7, 12, 16],
  [6, 14, 21],
  [9, 13, 18],
];

function checkWinningCombos(circleId, value) {
  
  
  let rowMatch = rowWin.filter((row) => row.includes(circleId));
  let colMatch = colWin.filter((col) => col.includes(circleId));

  if (
    checkPositionRowAndColumn(...rowMatch, value) ||
    checkPositionRowAndColumn(...colMatch, value)
  ) {
    deleteFlag = true;
    return true;
  }
  deleteFlag = false;
  return false;
}

function checkPositionRowAndColumn(checkPositions, playerPosition) {
  

  for (let i = 0; i < checkPositions.length; i++) {
    let value = checkPositions[i];
    playerPosition.includes(value);
    if (!playerPosition.includes(value)) {
      return false;
    }
  }
  return true;
}

//******//
const availableMoves = {
  1: [2, 10],
  2: [5, 3],
  3: [2, 15],
  4: [5, 11],
  5: [2, 8, 4, 6],
  6: [5, 14],
  7: [8, 12],
  8: [5, 7, 9],
  9: [8, 13],
  10: [1, 22, 11],
  11: [4, 19, 10, 12],
  12: [7, 16, 11],
  13: [9, 18, 14],
  14: [6, 21, 13, 15],
  15: [3, 24, 14],
  16: [12, 17],
  17: [16, 20, 18],
  18: [17, 13],
  19: [11, 20],
  20: [17, 23, 19, 21],
  21: [20, 14],
  22: [10, 23],
  23: [20, 22, 24],
  24: [15, 23],
};


function moveMarker(circleId, circle) {
  
  let lastElementId = document.getElementById(`circle` + lastCircleId);
  lastElementId.textContent = "";
  lastElementId.setAttribute("data-value", "");
  circle.textContent = currentPlayer;
  circle.setAttribute("data-value", currentPlayer);
  for (i = 0; i < storeAvailableMoves.length; i++) {
    let circles = document.getElementById(`circle` + storeAvailableMoves[i]);
    circles.removeAttribute("style");
  }

  if (currentPlayer === "X") {
    const index = player1Position.indexOf(lastCircleId);
    if (index !== -1) {
      player1Position.splice(index, 1);
    }
    player1Position.push(circleId);
    storeAvailableMoves = [];
  } else {
    const index = player2Position.indexOf(lastCircleId);
    if (index !== -1) {
      player2Position.splice(index, 1);
    }
    player2Position.push(circleId);
    storeAvailableMoves = [];
  }
  
  // storeAvailableMoves = [];
  let value;
  if (currentPlayer === "X") {
    value = player1Position;
  } else {
    value = player2Position;
  }
  if (!checkWinningCombos(circleId, value)) return changeTurn();
  alert("remove opponent element");
  
}

function showHighlightedMoves(circleId) {
  
  lastCircleId = circleId;
  let moveValue = availableMoves[circleId];
  if (storeAvailableMoves.length !== 0) {
    for (let i = 0; i < storeAvailableMoves.length; i++) {
      let circles = document.getElementById(`circle` + storeAvailableMoves[i]);
      circles.removeAttribute("style");
      
    }
    storeAvailableMoves = [];
  }

  for (let i = 0; i < moveValue.length; i++) {
    let value = moveValue[i];
    if (!player1Position.includes(value) && !player2Position.includes(value)) {
      storeAvailableMoves.push(value);
    }
  }
  for (let i = 0; i < storeAvailableMoves.length; i++) {
    let circles = document.getElementById(`circle` + storeAvailableMoves[i]);
    circles.setAttribute("style", "background-color:blue");
  }
}

function declareWinner() {
  if (
    (player1Position.length <= 2 || player2Position.length <= 2) &&
    (player1Moves === 0 || player2Moves === 0)
  ) {
    opponentPlayer = currentPlayer === "X" ? "O" : "X";
    alert(`${opponentPlayer} is winner `);
  }
}
