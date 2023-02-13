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
        // if it is the player color's turn
        this.possibleToMove = true
    }

    createPiece(color) {
        const piece = document.createElement('div')
        piece.style.backgroundColor = color
        piece.style.width = '40px'
        piece.style.height = '40px'
        piece.style.borderRadius = '30px'
        this.docEl = piece
    }

    getLocation() {
        this.location = this.docEl.parentElement.id
    }
}
// Constants 
// const divSpaces = []
const redPieces = []
const blkPieces = []
const redLostPieces = []
const blkLostPieces = []
const players = ['Player 1', 'Player 2']
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
let whoWon = ''
let allPieces = []
// Cache all required Document Elements

//Get all usable spaces on the board
// allSpaces.forEach(function(position){
//     let piece = document.getElementById(`${position}`)
//     divSpaces.push(piece)
// })

// Get the Turn Variable

// Make Multiple Pieces on for Usage on the Board
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

render()

// Check which square was clicked on the board
const mainEl = document.querySelector('.board')
mainEl.addEventListener('click', function(evt){
    if (evt.target.classList.contains('row')) return
    if (!evt.target.hasAttribute('id')) return
    if (evt.target.classList.contains('black')) {
        clear()
        // Get Man Object
        let clicked = blkPieces.find(function(piece) { 
            return piece.id === `${evt.target.id}`
        })
        // Get location of Man on board
        for (let i = 0; i<places.length;i++) {
            for (let j = 0; j<places[i].length;j++){
                if (places[i][j] === clicked) {
                    clicked.location = [i, j]
                }
            }
        }
        console.log(clicked.location)
        clicked.moving = true
    }
    else if (evt.target.classList.contains('red')) {
        clear()
        let clicked = redPieces.find(function(piece) {
            return piece.id === `${evt.target.id}`
        })
        clicked.moving = true
    }

    // if one piece is clicked
    // if (allPieces.some(piece => piece.moving === true)) {
    //     let [x, y] = evt.target.id.split("")
    //     // if the space is empty
    //     if (places[x][y] !== null) {
    //         // if the space is within range
    //         // need to get the piece location
    //     }
    // }

})

console.log(places)

function clear() {
    allPieces.forEach(function(piece){
        piece.moving = false
    })
}