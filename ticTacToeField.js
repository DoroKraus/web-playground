class ticTacToeField {
  // var width, height;
  // var cellObjects = [];
  // var table; //includes the 'board' in HTML

  constructor(htmlElement) {
    this.table = document.createElement("table");
    this.playerColors = ["blue", "orange"];
    this.cells = []; //holds cells in format [cellObject, markedByPlayer1, markedByPlayer2]
    this.neutralCellBackgroundColor = "#ffffff";
    this.parentObject = htmlElement;
    this.width = 290;

    //create local variables
    var row = [];
    var thisCellInformation = [];
    var thisCellObject;

    //create table with 9 cells, add onClickListeners
    for (var i = 0; i < 3; i++) {
      row.push(this.table.insertRow());
      for (var j = 0; j < 3; j++) {
        thisCellObject = row[i].insertCell();
        thisCellInformation = [thisCellObject, false, false];
        this.cells.push(thisCellInformation);
        this.cells[3 * i + j][0].id = "cell" + (3 * i + j);
        this.cells[3 * i + j][0].name = 3 * i + j;
        this.cells[3 * i + j][0].addEventListener("click", function() {
          markCellControl(this);
        });
      }
    }

    htmlElement.appendChild(this.table);
    this.setFieldWidthInPx(this.width);
  }

  /**
   * Set the width of the ticTacToeField. Since it's square, the height
   * will be set to the same value.
   * @param {number} width width in pixels
   */
  setFieldWidthInPx(width) {
    this.table.style.width = width + "px";
    this.table.style.height = width + "px"; //make sure field stays square
  }

  markCell(cellNumber, playerNumber) {
    this.cells[cellNumber][0].style.backgroundColor = this.playerColors[playerNumber];
    this.cells[cellNumber][playerNumber + 1] = true;
  }

  isMarkedCell(cellNumber) {
    return this.cells[cellNumber][1] || this.cells[cellNumber][2];
  }

  isRowComplete(rowNumber) {
    var rowSumP1 = 0,
      rowSumP2 = 0;

    //count the cells in the row for each player
    for (var colNumber = 0; colNumber < 3; colNumber++) {
      rowSumP1 += this.cells[rowNumber * 3 + colNumber][1];
      rowSumP2 += this.cells[rowNumber * 3 + colNumber][2];
    }

    return (rowSumP1 == 3 || rowSumP2 == 3);
  }

  isColComplete(colNumber){
    var colSumP1 = 0,
      colSumP2 = 0;

    //count the cells in the col for each player
    for (var rowNumber = 0; rowNumber < 3; rowNumber++) {
      colSumP1 += this.cells[colNumber + 3 * rowNumber][1];
      colSumP2 += this.cells[colNumber + 3 * rowNumber][2];
    }

    return (colSumP1 == 3 || colSumP2 == 3);
  }

  isDiaComplete(diaNumber){
    var diaSumP1 = 0,
      diaSumP2 = 0;
      
    //count the cells in the col for each player
    for (var cellNumber = 0; cellNumber < 3; cellNumber++) {
      if(!diaNumber){ //diaNumber == 0
        diaSumP1 += this.cells[cellNumber * 4][1];
        diaSumP2 += this.cells[cellNumber * 4][2];
      } else if (diaNumber == 1){
        diaSumP1 += this.cells[cellNumber * 2 + 2][1];
        diaSumP2 += this.cells[cellNumber * 2 + 2][2];
      } else {
        return false;
      }
    }

    return (diaSumP1 == 3 || diaSumP2 == 3);
  }
}
