/**@type {DOMTokenList} */

// These classes are from css style
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
// An array of objects of possible winning combination array, if we consider all the
// 9 square boxes as part of an array starts from zero.
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
// A boolean value to decide whose turn is next (x or circle)
let circleTurn;

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');

// This function will initialize the circleTurn to false and
// set the board hover class at the beginning of the game
// then add event listener to each cells

startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
	circleTurn = false;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(CIRCLE_CLASS);
		cell.addEventListener('click', handleClick, { once: true });
	});
	winningMessageElement.classList.remove('show');
	setBoardHoverClass();
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
	placeMark(cell, currentClass);

	// This will check if a winning match is achieved by any player
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		// swapTurn swaps the opponent based on circleTurn boolean value
		swapTurn();
		// to set hower preview of next oponent use this function after swatTurn
		// so that this function can decide next opponent based on circleTurn boolean
		setBoardHoverClass();
	}
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

// swaps the player after each click
function swapTurn() {
	circleTurn = !circleTurn;
}

// sets hover class to each cell
function setBoardHoverClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	if (circleTurn) {
		board.classList.add(CIRCLE_CLASS);
	} else {
		board.classList.add(X_CLASS);
	}
}

function checkWin(currentClass) {
	// Return true if any of the combination is true
	return WINNING_COMBINATIONS.some((combination) => {
		// Return true if all of the element in the combination is true
		// array has access to 'every' method. but in below isDraw() method
		//it does not have access to all the methods, so we used spread operator
		return combination.every((index) => {
			// Return true if the index element contains 'currentClass'
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = `It's a Draw!`;
	} else {
		winningMessageTextElement.innerText = `${circleTurn ? "0's" : "x's"} Wins!`;
	}
	winningMessageElement.classList.add('show');
}

function isDraw() {
	// array does not have access to all methods so
	// we spread it to get access to 'every' method
	return [...cellElements].every((cell) => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
	});
}
