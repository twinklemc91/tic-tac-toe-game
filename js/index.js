// JavaScript Document
window.onload = function() {
	var x 	  = "x",
	    o 	  = "o",
	    size  = parseInt($('#boardSize').val()),
		count = 0,
		o_win = 0,
		x_win = 0,
		numSquares = size * size,
		winningPlayer = null;

	// Initialize
	resetGame();

	// Set new board size and regenerate board again
	document.getElementById('btnBoardSize').onmouseup = function() {
		size  	   = parseInt(document.getElementById('boardSize').value),
		numSquares = size * size;
		generateBoard(numSquares);
	};

    document.getElementById('reset').onmouseup = function() {resetGame()}; // end of #reset event

    // Determine any winning combination
	function determineWinner() {
		var hasWinner  = false;

		// Check for win by row
		$('#game li').each(function(i, elem) {
			
			if ((i % size) == 0) {
				var rowCheck = [];

				for (var squareNum = i; squareNum < (i + size); squareNum++) {
					var squareObj = document.getElementById('game').getElementsByTagName('li')[squareNum];

					if ($(squareObj).hasClass(x))
						rowCheck.push('x')
					else if ($(squareObj).hasClass(o))
						rowCheck.push(o)
					else
						rowCheck.push('')
				}

				if (allSame(rowCheck)) {
					winningPlayer = rowCheck; // Push winning player data
					hasWinner = true;
					return false; // equivalent to break statement
				};
			}

		});

		// Check for win by column
		if (!hasWinner) {
			$('#game li').each(function(i, elem) {
				if (i < size) {
					var colCheck = [];

					for (var squareNum = i; squareNum < numSquares; squareNum += size) {
						var squareObj = document.getElementById('game').getElementsByTagName('li')[squareNum];
						
						if ($(squareObj).hasClass(x))
							colCheck.push('x')
						else if ($(squareObj).hasClass(o))
							colCheck.push(o)
						else
							colCheck.push('')
					}

					if (allSame(colCheck)) {
						winningPlayer = colCheck; // Push winning player data
						hasWinner = true;
						return false; // equivalent to break statement
					};
				}

			});
		}

		// Check for win by left diagonal
		if (!hasWinner) {
			var diag1Check = []; // Needs to be outside of for loop to prevent overwriting array
			for (i = 0; i < numSquares; i++) { // first iteration over board
				if ((i % (size + 1)) == 0) { // use condition if iterator % SIZE + 1 === 0 to get left diagonals
					var squareObj = document.getElementById('game').getElementsByTagName('li')[i];
						
					if ($(squareObj).hasClass(x))
						diag1Check.push('x')
					else if ($(squareObj).hasClass(o))
						diag1Check.push(o)
					else
						diag1Check.push('')
				};
			};
			// These also need to be outside of for loop to prevent checks on incomplete arrays
			if (allSame(diag1Check)) { // As does the return statement
				winningPlayer = diag1Check; // Push winning player data
				hasWinner = true;
			};
		}

		// Check for win by right diagonal
		if (!hasWinner) {
			var diag2Check = []; // Needs to be outside of for loop to prevent overwriting array
			for (i = (size - 1); i < (numSquares - 1); i++) { // first iteration over board
				if ((i % (size - 1)) == 0) { // use condition if iterator % SIZE - 1 === 0 to get right diagonals
					var squareObj = document.getElementById('game').getElementsByTagName('li')[i];
						
					if ($(squareObj).hasClass(x))
						diag2Check.push('x')
					else if ($(squareObj).hasClass(o))
						diag2Check.push(o)
					else
						diag2Check.push('')
				};
			};
			// These also need to be outside of for loop to prevent checks on incomplete arrays
			if (allSame(diag2Check)) { // As does the return statement
				winningPlayer = diag2Check; // Push winning player data
				hasWinner = true;
			};
		}

		return hasWinner;

	}; // End determineWinner function

	// Reset game
	function resetGame() {
		count = 0
		setTurnIndicator(count);
		generateBoard(numSquares);
	}

	function generateBoard(boardSize) {
		var game = document.getElementById('game');
			game.innerHTML = '';

		for (var i = 0; i < boardSize; i++) {
			$(game).append('<li ' + 'id="' + i.toString() + '" class="btn span1">+</li>');
		}

		$('#game').css({
			height	   : (100 * size - 50 )+ 'px',
			width 	   : (100 * size - 30) + 'px',
			marginLeft: (size == 3) ? '0%' : (-size * (size + 1)) + '%'
		})
		addSquareClick();
	}

	// Set text for turn indicator
	function setTurnIndicator(count) {
		var turnIndicator = document.getElementById('turnIndicator');
		if (count != null)
			turnIndicator.innerText = isEven(count) ? 'O\'s Turn' : 'X\'s Turn';
		else
			turnIndicator.innerText = ' ';
	}

	// Check if row/column forms winning combo
	function allSame(array) { 
		var first = array[0];

	    if (array[0] == '') {
	    	return false;
	    } else {
	    	return array.every(function(element) {
	        	return element == first;
	    	});
	    };
	}

	function isEven(count) {
	  	return (count % 2 == 0) ? true : false;
	}

	// Add event listener
	function addSquareClick() {
		$('#game li').click(function() {
			if (count == (size * size) - 1) {
				alert('Its a tie. It will restart.')
				resetGame();

			} else if ($(this).hasClass('disable')) {
				alert('Already selected');

			} else if (isEven(count)) {
				count++;
				$(this).text(o)
			    $(this).addClass('disable o btn-primary')
			    setTurnIndicator(count);

			} else {
				count++;
	    		$(this).text(x)
	    		$(this).addClass('disable x btn-info')
	    		setTurnIndicator(count);
			}

			// Check for winning combination
			if (determineWinner()) {
				alert(winningPlayer[0].toUpperCase() + ' has won the game. Start a new game.');

				switch(winningPlayer[0]) {
					case x:
						x_win++;
						document.getElementById('x_win').innerText = x_win;
						break;

					case o:
						o_win++;
						document.getElementById('o_win').innerText = o_win;
				}

				// Remove click events from the blocks
				$('#game li').off();
			}
		});
	}

}; // end of document init


