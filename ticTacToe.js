var player = 0;
var pColor = ["blue", "orange"];
var gameEnded = false;

function markCellControl(cellObject) {
  //check type of argument (should be cell object)
  if (Object.prototype.toString.call(cellObject) !== '[object HTMLTableCellElement]') {
    alert("Oops. An argument of markCell is of the wrong type!");
    return;
  }

  //if the game has ended already prevent fields from getting marked
  if (gameEnded) return;

  //set cellcolor if cell is not yet colored
  if (field.isMarkedCell(cellObject.name)) {
    return;
  } else {
    field.markCell(cellObject.name, player);
  }

  gameEnded = isPlayerWinner(cellObject, player + 1);
  if (gameEnded)
    getPlayerElem().innerHTML = "Player " +
    (player + 1) + " won! :D";
  else
    changeCurrentPlayer();

}

function changeCurrentPlayer() {
  //change Player
  player = ++player % 2;

  //change Text and highlight it
  var infoText = "Current player : ";
  getPlayerElem().innerHTML = infoText;
  getPlayerElem().innerHTML += player + 1;
  getPlayerElem().style.color = pColor[player];

}

function isPlayerWinner(cellObject, playerCellInformation) {
  
  //check if row/column is complete
  for (rcCounter = 0; rcCounter < 3; rcCounter++) {
    if (field.isRowComplete(rcCounter)) {
      return true;
    } else if (field.isColComplete(rcCounter)) {
      return true;
    } else if (field.isDiaComplete(rcCounter)) {
      return true;
    }
  }
  return false;
}

function getPlayerElem() {
  return document.getElementById("cPlayer");
}

function resetGame() {
  gameEnded = false; //reset game status
  player = 1; // reset current player
  changeCurrentPlayer(); // reset current player information
  var parent = field.parentObject;
  parent.innerHTML = "";
  field = new ticTacToeField(parent);
}
