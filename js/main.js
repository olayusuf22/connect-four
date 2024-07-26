document.addEventListener('DOMContentLoaded', function() {
    /*----- constants -----*/
    const COLORS = {
        '1': 'purple',
        '-1': 'orange',
        'null': 'white'
    };

    /*----- state variables -----*/
    let board;
    let turn;
    let winner;

    /*----- cached elements  -----*/
    const msgEl = document.querySelector('h1');
    const playAgainBtn = document.getElementById('play-again-btn');
    const markerEls = [...document.querySelectorAll('#markers > div')];

    /*----- event listeners -----*/
    document.getElementById('markers').addEventListener('click', handleDrop);
    document.getElementById('play-again-btn').addEventListener('click', init);

    /*----- functions -----*/
    init();

    // Initialize all state, then call render()
    function init() {
        // You can visualize the board array's "mapping"
        // to the DOM by rotating the board array 90 deg counter-clockwise
        board = [
            [null, null, null, null, null, null],  // column 0
            [null, null, null, null, null, null],  // column 1
            [null, null, null, null, null, null],  // column 2
            [null, null, null, null, null, null],  // column 3
            [null, null, null, null, null, null],  // column 4
            [null, null, null, null, null, null],  // column 5
            [null, null, null, null, null, null],  // column 6
        ];
        turn = 1;
        winner = null;
        render();
    }

    // In response to user interaction, update all impacted
    // state, then call render()
    function handleDrop(evt) {
        // Get the index of the marker
        const colIdx = markerEls.indexOf(evt.target);
        // Create a "shortcut" variable to the column that needs to be update
        const colArr = board[colIdx];
        // Get index of first available cell (null)
        const rowIdx = colArr.indexOf(null);
        // Update the board's state
        colArr[rowIdx] = turn;
        winner = getWinner(colIdx, rowIdx);
        turn *= -1;
        render();
    }

    // Return null (no winner), 1/-1 if player wins, 'Tie' if a tie
    function getWinner(colIdx, rowIdx) {
        return checkVertical(colIdx, rowIdx) // || checkHorizontal()
    }

    function checkVertical(colIdx, rowIdx) {
        const numBelow = countAdj(colIdx, rowIdx, 0, -1);
    }

    function countAdj(colIdx, rowIdx, colOffset, rowOffset) {
        let count = 0;
        colIdx += colOffset;
        rowIdx += rowOffset;
        // Always use a while loop if you can't tell how many 
        // times we need to loop (iterate)
        while (board[colIdx] && board[colIdx][rowIdx] === turn) {
            count++;
            colIdx += colOffset;
            rowIdx += rowOffset;
        }
        return count;
    }

    // Visualize all state and other info (like messaging)
    // in the DOM
    function render() {
        renderBoard();
        renderMessage();
        renderControls();
    }

    function renderControls() {
        // ternary expression (use to return one of two values/expressions)
        // <conditional expression> ? <truthy exp> : <falsy exp>;
        playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    }

    function renderMessage() {
        if (winner === null) {
            // Game is in progress
            msgEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
        } else if (winner === 'Tie') {
            msgEl.textContent = "It's a Tie!!!";
        } else {
            // We have a winner!
            msgEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
        }
    }

    function renderBoard() {
        board.forEach(function(colArr, colIdx) {
            colArr.forEach(function(cellVal, rowIdx) {
                const cellEl = document.getElementById(`c${colIdx}r${rowIdx}`);
                cellEl.style.backgroundColor = COLORS[cellVal];
            });
        });
    }
});
