const X_CLASS = 'x'
const O_CLASS = 'circle'
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const newGameButton = document.getElementById('restart')
const board = document.getElementById('board')
let circleTurn 

startGame()

newGameButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    //place mark
    const cell = e.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    // Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    else{
    //Swap Turns
    swapTurns()
    setBoardHoverClass()
    }
}





function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
   return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerText = "Tie Game"
    }
    else {
        winningMessage.innerText = `Player ${circleTurn? "O" : "X"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)})
}