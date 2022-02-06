const x_class = 'x';
const o_class = 'o';

const cell = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winning_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessage = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('message');
const restart_btn = document.getElementById('restart-btn');

let circleTurn;
cell.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
})

startGame();

restart_btn.addEventListener('click', startGame)

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? o_class : x_class
    placeMark(cell, currentClass)
    // place mark
    // check for the win
    // check for the draw
    // switch turns

    if (checkWin(currentClass)) {
        // console.log('winner')
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {

        changeTurns()
        setHoverOverBoard()

    }


}

function startGame() {
    circleTurn = false;
    cell.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    })

    setHoverOverBoard();
    winningMessageElement.classList.remove('show');
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function changeTurns() {
    circleTurn = !circleTurn;
}

function setHoverOverBoard() {

    board.classList.remove(x_class);
    board.classList.remove(o_class);

    if (circleTurn) {
        board.classList.add(o_class);
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winning_combo.some(combination => {
        return combination.every(index => {
            return cell[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerHTML = `Draw!`;

    } else {
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }

    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cell].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}