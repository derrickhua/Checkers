// Classes 
class Man {
    constructor() {
        this.color = ''
        this.location = ''
        this.king = false
        // If the man is clicked
        this.moving = false
        this.id = ''
        this.alive = true
        this.docEl = ''
        this.possibleMovement = true
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
let whoWon = ''
let allPieces = []
let chosen = ''
let whoTurn = 'black'
// Cache all required Document Elements

// Make Multiple Pieces on for Usage on the Board

render()

//Reset Button 
let resetBtn = document.querySelector(".resetSpace")
resetBtn.addEventListener("click",fullReset)
// Check which square was clicked on the board
const mainEl = document.querySelector('.board')
mainEl.addEventListener('click', function(evt){
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
                if (chosen.color === "black"){
                    if (x - pieceX === -1) {
                        if (y - pieceY === 1) {
                            if (places[x - 1][y + 1] === null){
                                newX = x - 1
                                newY = y + 1
                                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                                remove(x, y, chosen.color)
                            }
                        }
                        else if (y - pieceY === -1) {
                            if (places[x - 1][y - 1] === null){
                                newX = x - 1
                                newY = y - 1
                                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                                remove(x, y, chosen.color)
                            }
                        }
                    }
                }
                else {
                    if (x - pieceX === 1) {
                        // To the right of red
                        if (y - pieceY === 1) {
                            // if the space diagonally behind it is null
                            if (places[x + 1][y + 1] === null){
                                newX = x + 1
                                newY = y + 1
                                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                                remove(x, y, chosen.color)
                            }
                        }
                        // To the left of red
                        else if (y - pieceY === -1) {
                            if (places[x + 1][y - 1] === null){
                                newX = x + 1
                                newY = y - 1
                                movement(pieceX, pieceY, newX, newY, chosen.color, chosen)
                                remove(x, y, chosen.color)
                            }
                        }
                    }
                }

            } 
        }
        // Regular Movement of a Black Piece
        else if (chosen.color === "black") {
            let pieceX = chosen.location[0]
            let pieceY = chosen.location[1]
            if (x - pieceX === -1) {
                if (Math.abs(y - pieceY) === 1) {
                    movement(pieceX, pieceY, x, y, chosen.color, chosen)
                }
            
            }
            clear() 
        } 
        // Regular Movement of a Red Piece
        else if (chosen.color === "red") {
            let pieceX = chosen.location[0]
            let pieceY = chosen.location[1]
            if (x - pieceX === 1) {
                if (Math.abs(y - pieceY) === 1) {
                    movement(pieceX, pieceY, x, y, chosen.color, chosen)
                }
            
            }
            clear()
        }
    } 

    if (evt.target.classList.contains('black') && whoTurn === "black") {
        clear()
        chosen = get('black', evt.target)
    }
    else if (evt.target.classList.contains('red') && whoTurn === "red") {
        clear()
        chosen = get('red', evt.target)
    }
    
})

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
    for (let i = 0; i < startPositionsRed.length; i++) {
        let newMan = new Man()
        newMan.createPiece('#FF4C4C')
        newMan.color = 'red'
        newMan.id = `red${i}`
        newMan.docEl.id = `red${i}`
        newMan.docEl.classList.add('red')
        let space = document.getElementById(`${startPositionsRed[i]}`)
        space.appendChild(newMan.docEl)
        redPieces.push(newMan)
        let [x, y] = startPositionsRed[i].split('')
        //Put Piece into Places Array
        places[x][y] = newMan
        //Click on Piece, piece return ID
    }
    for (let i = 0; i < startPositionsBlk.length; i++) {
        let newMan = new Man()
        newMan.createPiece("black")
        newMan.color = 'black'
        newMan.id = `black${i}`
        newMan.docEl.id = `black${i}`
        newMan.docEl.classList.add('black')
        let space = document.getElementById(`${startPositionsBlk[i]}`)
        space.appendChild(newMan.docEl)
        blkPieces.push(newMan)
        let [x, y] = startPositionsBlk[i].split('')
        places[x][y] = newMan
    }
    allPieces = [...redPieces, ...blkPieces]
}

function changeTurn() {
    let turn = document.querySelector(".turn")
    if (turn.textContent === "Player 1/ BLK") {
        turn.textContent = "Player 2/ RED"
    } else {
        turn.textContent = "Player 1/ BLK"
    }
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
    changeTurn()
    console.log("reset")
}

// Things to do
// Implement win logic, loops through every red and blk piece if possibleMovement is false for all reds, they lose
// if possible Movement for all blk is false then they lose
// When win logic is implemented and someone wins, put the message board up
// Implement if piece becomes king 

// BUG where it can move backwards then change colour