var grid = document.getElementById("grid");
generateGrid();

function generateGrid() {
  grid.innerHTML="";
  for (var i = 0; i < 9; i++) {
    row = grid.insertRow(i);
    for (var j = 0; j < 9; j++) {
      cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var bomb = document.createAttribute("is-bomb");
      bomb.value = "false";
      cell.setAttributeNode(bomb);
    }
  }
  addBombs();
}

function addBombs() {
  for (var i = 0; i < 10; i++) {
    var row = Math.floor(Math.random() * 9);
    var col = Math.floor(Math.random() * 9);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("is-bomb","true");
  }
}

function showBombs() {
    for (var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("is-bomb") == "true") cell.className = "bomb";
      }
    }
}

function clickCell(cell) {
  if (cell.getAttribute("is-bomb") == "true") {
    showBombs();
    document.getElementById("message").innerHTML = "You Lost !";
  } else {
    cell.className="clicked";
    cell.innerHTML = countBombs(cell);
    checkWin();
  }
}

function countBombs(cell){
  var bombsCount = 0;
  var row = cell.parentNode.rowIndex;
  var col = cell.cellIndex;
  for (var i = row-1; i <= row+1; i++) {
    for(var j = col-1; j <= col+1; j++) {
      if (grid.rows[i].cells[j].getAttribute("is-bomb") =="true") bombsCount++;
    }
  }
  return bombsCount;
}

function checkWin() {
  var won = true;
    for (var i = 0; i < 9; i++) {
      for(var j = 0; j < 9; j++) {
        if ((grid.rows[i].cells[j].getAttribute("is-bomb") == "false") && (grid.rows[i].cells[j].innerHTML == "")) won = false;
      }
  }
  if (won) {
    document.getElementById("message").innerHTML = "You Won!";
    showBombs();
  }
}
