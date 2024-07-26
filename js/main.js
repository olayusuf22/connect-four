/*----- constants -----*/
const COLORS = {
    '1': 'purple',
    '-1': 'orange',
    'null': 'white',
};


/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init();

// Initialize all state, then call render()
function init() {
    // you can visualixe the board array's mapping
    // to the DOM by rotating the board array 90 deg counter-clockwise
    board = [
      [null, null, null, null, null, null,], // column 0  
      [null, null, null, null, null, null,], // column 1 
      [null, null, null, null, null, null,], // column 2 
      [null, null, null, null, null, null,], // column 3 
      [null, null, null, null, null, null,], // column 4 
      [null, null, null, null, null, null,], // column 5
      [null, null, null, null, null, null,], // column 6
   ];
   turn = 1;
   winner = null;
   render();
}

// visualize all state and other info (like messaging)
// in the DOM
function render() {
    renderBoard();
}

function renderBoard () {
  board.forEach(fucntion(colArr, colIdx) {
    colArr.forEach(function(cellVal, rowIdx) {
        const cellEL = document.getElementById(`c${colIdx}r${rowIdx}`);
        cellEL.style.backgroundColor = COLORS[];
    });
  });
}
