// Classes 
class Man {
    constructor() {
        this.color = ''
        this.location = ''
        this.king = false
        // If the man is clicked
        this.moving = false
        this.id = ''
        this.docEl = ''
    }

    createPiece(color) {
        const piece = document.createElement('div')
        piece.style.backgroundColor = color
        piece.style.width = '40px'
        piece.style.height = '40px'
        piece.style.borderRadius = '30px'
        this.docEl = piece
    }

}
// Constants 

const startPositionsRed = ["00", "02", "04", "06", "11", "13", "15", "17", "20", "22", "24", "26"]
const startPositionsBlk = ["51", "53", "55", "57", "60", "62", "64", '66', "71", "73", "75", "77"]
const allSpaces = ["00", "02", "04", "06", "11", "13", "15", "17", "20", "22", "24", "26", 
    "31", "33", "35", "37", "40", "42", "44", "46", 
    "51", "53", "55", "57", "60", "62", "64", "66", "71", "73", "75", "77"]

const places = [
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null]]

// Variables
let redPieces = []
let blkPieces = []
let redLostPieces = []
let blkLostPieces = []
let winner = ''
let allPieces = []
let chosen = ''
let whoTurn = 'black'
let gameOn = true
// Cache all required Document Elements

// Make Multiple Pieces on for Usage on the Board

render()

// Message Board
let msgBoard = document.querySelector(".message-board")
//Reset Button 
let resetBtn = document.querySelector(".resetSpace")
resetBtn.addEventListener("click",fullReset)

const mainEl = document.querySelector('.board')
mainEl.addEventListener('click', mainFunc)

function mainFunc(evt) {
    if (gameOn = false) {
        return
    }
    if (evt.target.classList.contains('row')) return
        if (!evt.target.hasAttribute('id')) return
        // if a man is clicked again, remove
        if (evt.target.id === chosen.id) {
            clear()
        }
        // what do after a piece is activated
        else if (allPieces.some(piece => piece.moving === true)) {
            let [x, y] = [null, null]
            if (evt.target.id.length > 2) {
                [x, y] = evt.target.parentElement.id.split("")
            }
            else{
                [x, y] = evt.target.id.split("")
            }
            // if the space is not empty or it is a piece
            if (places[x][y] !== null) {
                // if piece is of oppossing color
                if (places[x][y].color !== chosen.color) {
                    let pieceX = chosen.location[0]
                    let pieceY = chosen.location[1]
                    x = parseInt(x)
                    y = parseInt(y)
                    if (chosen.color === "red" && chosen.king) {
                        eatingUpwards(x, y, pieceX, pieceY, chosen)
                    }
                    else if (chosen.color === "black" && chosen.king) {
                        eatingDownwards(x, y, pieceX, pieceY, chosen)
                    }
                    else if (chosen.color === "black"){
                        eatingUpwards(x, y, pieceX, pieceY, chosen)
                    }
                    else if (chosen.color === "red") {
                        eatingDownwards(x, y, pieceX, pieceY, chosen)
                    }
                } 
            }
            // Regular Movement of 
            else if (chosen.color === "red") {
                if (chosen.king){
                    movingUpwards(x, y, chosen)
                }
                else{
                    movingDownwards(x, y, chosen)
                }   
            }
            else if (chosen.color === "black") {
                if (chosen.king) {
                    movingDownwards(x, y, chosen)
                }
                else {
                    movingUpwards(x, y, chosen)
                }
            }
        } 
    
        if (evt.target.classList.contains('black') && whoTurn === "black") {
            let dontUse = blkLostPieces.some(function(piece) {
                return piece.id === evt.target.id
            })
            if (!dontUse) {
                clear()
                chosen = get('black', evt.target)
            }
        }
        else if (evt.target.classList.contains('red') && whoTurn === "red") {
            let dontUse = redLostPieces.some(function(piece) {
                return piece.id === evt.target.id
            })
            if (!dontUse) {
                clear()
                chosen = get('red', evt.target) 
            }
        }

    let possibleRedMoves = 0
    let possibleBlkMoves = 0

    if (redLostPieces.length !== redPieces.length) {
        redPieces.forEach(function(piece) {
            possibleRedMoves += checkDownwards(piece, "red")
        })        
    }

    if (blkLostPieces.length !== blkPieces.length) {
        blkPieces.forEach(function(piece) {
            possibleBlkMoves += checkUpwards(piece, "black")
        })        
    }
    // || blkLostPieces.length === blkPieces.length
    // || redLostPieces.length === redPieces.length
    if (possibleRedMoves === 0) {
        msgBoard.innerHTML = "<p>PLAYER 1 WINS!</p>"
        msgBoard.style.display = "block"
        gameOn = false

    }
    else if (possibleBlkMoves === 0) {
        msgBoard.innerHTML = "<p>PLAYER 2 WINS!</p>"
        msgBoard.style.display = "block"
        gameOn = false
    }         
}


function checkDownwards(piece, color) {
    let possibleRedMoves = 0
    let pieceX = piece.location[0]
    let pieceY = piece.location[1]
    let possibleX = pieceX + 1
    let possibleY = [(pieceY - 1), (pieceY + 1)]
    if (pieceX === 7 && piece.color === "red") {
        piece.king = true
        possibleRedMoves += checkUpwards(piece, "red")
        return possibleRedMoves
    }
    // if the front left space is not undefined
    if (places[possibleX][possibleY[0]] !== undefined) {
        // if the space is empty
        if (places[possibleX][possibleY[0]] === null){
            possibleRedMoves += 1
        }
        // if the space is not empty
        else if (places[possibleX][possibleY[0]] !== null){
            // if the space is red well it cant eat it so it cant move
            // if piece on space is black
            if (places[possibleX][possibleY[0]].color === color){
                //get the space diagonal to this one
                let newX = possibleX + 1
                let newY = possibleY - 1
                // check if that space exists and if it is empty or not
                if (newY >= 0 && places[newX][newY] === null) {
                    // if empty increase possibleRedMoves
                    possibleRedMoves += 1
                }
            }

        }
        
    } 
    // if the front right space is not undefined and is empty
    if (places[possibleX][possibleY[1]] !== undefined) {
        if (places[possibleX][possibleY[1]] === null){
            possibleRedMoves += 1
        }
        else if (places[possibleX][possibleY[1]] !== null){
            if (places[possibleX][possibleY[1]].color === color){
                let newX = possibleX + 1
                let newY = possibleY + 1
                if (newY >= 0 && places[newX][newY] === null) {
                    possibleRedMoves += 1
                }
            }

        }
    }
    return possibleRedMoves
}

function checkUpwards(piece, color) {
    let possibleBlkMoves = 0
    let pieceX = parseInt(piece.location[0])
    let pieceY = parseInt(piece.location[1])
    let possibleX = pieceX - 1
    let possibleY = [(pieceY - 1), (pieceY + 1)]
    // if the front left space is not undefined
    if (pieceX === 0 && piece.color === "black") {
        piece.king = true
        possibleBlkMoves += checkDownwards(piece, "black")
        return possibleBlkMoves
    }
    if (places[possibleX][possibleY[0]] !== undefined && possibleY[0] !== undefined){
        // if the space is empty
        if (places[possibleX][possibleY[0]] === null){
            possibleBlkMoves += 1
        }
        else if (places[possibleX][possibleY[0]] !== null){
            if (places[possibleX][possibleY[0]].color === color){
                let newX = possibleX - 1
                let newY = possibleY - 1
                if (newY >= 0 && places[newX][newY] === null) {
                    possibleBlkMoves += 1
                }
            }
        }
    } 
    if (places[possibleX][possibleY[1]] !== undefined && possibleY[1] !== undefined) {
        if (places[possibleX][possibleY[1]] === null){
            possibleBlkMoves += 1
        }
        else if (places[possibleX][possibleY[1]] !== null){
            if (places[possibleX][possibleY[1]].color === color){
                let newX = possibleX - 1
                let newY = possibleY + 1
                if (newY >= 0 && places[newX][newY] === null) {
                    possibleBlkMoves += 1
                }
            }

        }
    }
    return possibleBlkMoves
}

function clear() {
    allPieces.forEach(function(piece){
        piece.moving = false
    })
}

function get(color, target) {
    // Get Man in question
    let clicked = ''
    if (color === 'red') {
        clicked = redPieces.find(function(piece) { 
            return piece.id === `${target.id}`
        })
    }
    else if (color === 'black') {
        clicked = blkPieces.find(function(piece) { 
            return piece.id === `${target.id}`
        })
    }
    // Get location of Man on board
    for (let i = 0; i<places.length;i++) {
        for (let j = 0; j<places[i].length;j++){
            if (places[i][j] === clicked) {
                clicked.location = [i, j]
            }
        }
    }
    clicked.moving = true
    return clicked
}

function movement(srcX, srcY, destX, destY, color, chosenPiece) {
    // Remove Piece off JS Board and Real Board
    places[srcX][srcY] = null
    let oldSpace = document.getElementById(`${srcX}${srcY}`)
    oldSpace.innerHTML = "";
    places[destX][destY] = chosenPiece
    chosenPiece.location = [parseInt(destX), parseInt(destY)]
    // Update JS Board and Real Board
    let newSpace = document.getElementById(`${destX}${destY}`)
    newSpace.appendChild(chosen.docEl)
    if (color === "black")
        whoTurn = "red"
    else {
        whoTurn = "black"
    }
    changeTurn()
}

function remove(x, y, color) {
    if (color === "black") {
        redLostPieces.push(places[x][y])
    }
    else {
        blkLostPieces.push(places[x][y])
    }
    places[x][y] = null
    let died = document.getElementById(`${x}${y}`)
    died.innerHTML = ""
    updateScore()
}

function render() {
    // startPositionsRed.length && startPositionsBlk.length
    for (let i = 0; i < 1; i++) {
        let newMan = new Man()
        newMan.createPiece('#FF4C4C')
        newMan.color = 'red'
        newMan.id = `red${i}`
        newMan.docEl.id = `red${i}`
        newMan.docEl.classList.add('red')
        let space = document.getElementById(`${startPositionsRed[i]}`)
        let [x, y] = startPositionsRed[i].split('')
        places[x][y] = newMan
        newMan.location = [parseInt(x), parseInt(y)]
        space.appendChild(newMan.docEl)
        redPieces.push(newMan)


    }
    for (let i = 0; i < 1; i++) {
        let newMan = new Man()
        newMan.createPiece("black")
        newMan.color = 'black'
        newMan.id = `black${i}`
        newMan.docEl.id = `black${i}`
        newMan.docEl.classList.add('black')
        let space = document.getElementById(`${startPositionsBlk[i]}`)
        let [x, y] = startPositionsBlk[i].split('')
        places[x][y] = newMan
        newMan.location = [parseInt(x), parseInt(y)]
        space.appendChild(newMan.docEl)
        blkPieces.push(newMan)
        
    }
    allPieces = [...redPieces, ...blkPieces]
    gameOn = true
}

function changeTurn() {
    let turn = document.querySelector(".turn")
    if (turn.textContent === "Player 1/ BLK") {
        turn.textContent = "Player 2/ RED"
    } else {
        turn.textContent = "Player 1/ BLK"
    }
}

function resetTurn() {
    let turn = document.querySelector(".turn")
    turn.textContent = "Player 1/ BLK"
}

function updateScore() {
    let redScore = document.querySelector(".redScore")
    let blkScore = document.querySelector(".blkScore")
    redScore.textContent = `${blkLostPieces.length}`
    blkScore.textContent = `${redLostPieces.length}`
}


function fullReset() {
    redPieces = []
    blkPieces = []
    redLostPieces = []
    blkLostPieces = []
    allPieces = []
    whoTurn = 'black'
    // Clear JS Board
    for (let i = 0; i<places.length;i++) {
        for (let j = 0; j<places[i].length;j++){
            places[i][j] = null
        }
    }
    // Clear Real Board
    allSpaces.forEach(function(id){
        let tempSpace = document.getElementById(`${id}`)
        tempSpace.innerHTML = ''
    })
    render()
    resetTurn()
    updateScore()
    msgBoard.style.display = "none"
    console.log("reset")
    gameOn = true
}

function eatingUpwards(x, y, pieceX, pieceY, chosen) {
    if (x === undefined || y === undefined){
        pass
    }
    else if (x - pieceX === -1) {
        if (y - pieceY === 1) {
            if (places[x - 1][y + 1] === null && places[x - 1][y + 1] !== undefined){
                newX = x - 1
                newY = y + 1
                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                remove(x, y, chosen.color)
            }
        }
        else if (y - pieceY === -1) {
            if (places[x - 1][y - 1] === null && places[x - 1][y - 1] !== undefined){
                newX = x - 1
                newY = y - 1
                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                remove(x, y, chosen.color)
            }
        }
    }
    clear()
}

function eatingDownwards(x, y, pieceX, pieceY, chosen) {
    if (x === undefined || y === undefined){
        pass
    }
    else if (x - pieceX === 1) {
        // To the right of red
        if (y - pieceY === 1) {
            // if the space diagonally behind it is null
            if (places[x + 1][y + 1] === null && places[x + 1][y + 1] !== undefined) {
                newX = x + 1
                newY = y + 1
                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                remove(x, y, chosen.color)
            }
        }
        // To the left of red
        else if (y - pieceY === -1) {
            if (places[x + 1][y - 1] === null && places[x + 1][y - 1] !== undefined) {
                newX = x + 1
                newY = y - 1
                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                remove(x, y, chosen.color)
            }
        }
    }
    clear()
}

function movingUpwards(x, y, chosen) {
    let pieceX = chosen.location[0]
    let pieceY = chosen.location[1]
    if (x - pieceX === -1) {
        if (Math.abs(y - pieceY) === 1) {
            movement(pieceX, pieceY, x, y, chosen.color, chosen)
        }
    
    }
    clear() 
}

function movingDownwards(x, y, chosen) {
    let pieceX = chosen.location[0]
    let pieceY = chosen.location[1]
    if (x - pieceX === 1) {
        if (Math.abs(y - pieceY) === 1) {
            movement(pieceX, pieceY, x, y, chosen.color, chosen)
        }
    
    }
    clear()
}

// Implement double jumping and Possibly King full diagonal movement
// Work on making code neater
// Work on making CSS and HTML nicer too