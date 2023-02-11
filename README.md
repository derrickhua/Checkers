# **Checkers** 

---

## Brief Description
Checkers is said to be an ancient game with many variants. There have been similar board games dating back to as early as 3000 BC. The variant I am choosing to use is American Checkers. It is played by two opponents. One player has black pieces and the other usually white or red. Players alternate turns and pieces can only move diagonally to a closeby square. If an opposing pieces occupies a diagonal space while the square across it is vacant, the piece may be captured. The player without any remaining pieces or is unable to move any pieces, loses the game. 

## Pieces

### Man 
This is a regular piece which only move one step diagonally forwards and has the ability to capture an adjacent enemy's piece as long as it can land on the next square. 

### King
When a man reaches the farthest row forward, known as the kings row or crown head, it becomes a king.
For this version, the king will only have the bonus ability to capture and move backwards. 


# GAME CHOICE: CHECKERS

# WireFrame
![Imgur](https://i.imgur.com/OgmbFFH.jpg)


# PsuedoCode

1. Define required constants:
    * define an array that holds all the divs that make up the playable squares on the board
    * define an array with 2 strings, player 1 or player 2
    * define a class for the checker
        - attributes: color, location, king, moving, id, alive, element will be saved into it, possibleToMove 
        - methods: createElement on Board with a specific id, move(), possibleMove(): checks if the two possible spaces in front are free or not
        - the move function: if elem is clicked, set it to moving state, the next valid space clicked move there
        - if clicked again, return moving to false
        - the consume function: if enemy closeby and the space behind that enemy are free, take
    * define 2 arrays that will hold checker piece objects, redPieces, blkPieces
    * define a class for each valid space:
        - attributes: onSpace, if true, no piece can move on it, only be consumed, domObject: 
    * define 2 arrays that will hold removed checker piece objects, redLost, blkLost
    * define a startPosition array: that will indicate the starting locations of the pieces

2. Define the required variables:
    * define a variable that will say whoWon which is initialized with '' and will gain array[0] or array[1] depending on who wins
    * define 2 variables that will state total black or red pieces on either side
        - redHave or blkHave

3. Select and Save caches elements
    * Each element with a class of 'red', and same id will saved into redPieces array into the compatible object, 
    * Each element with a class of 'black' and same id will saved into blkPieces array into the compatible object
    * Each element with a class of 'space' saved into spaces array of objects

4. Call render to place each element on it's proper div location / spaces on the board / this will also be used to reset everything on the board

5. The whosTurn variable will indicate which player's turn it is and which pieces are possible to move possibleToMove 
    * This section will have multiple loops through each element
    * For each array, object's element, there will be an addEventListener on click, that will change it's state from moving false to true
        - there can only be one element with a moving true 
        - if clicked again, it will change the moving from true to false 
        - the clicked element will have a changed color 
    * Afterwards, if a space is clicked, the div's addEventListener, will check if it is possible, if so move it there, so long
        as the piece is within range to move to it 
        - if the space contains a piece of the opposite color and the diagonal space behind it is not occupied, then it is possible to consume that piece
        - if that space behind is clicked, the space containing the enemy piece will destroy/delete that div, 
    * if an opposing piece reaches one side, it turns on the king attribute to true    
        - it can then moves backwards along the board one piece at a time 
    * there's a loop that will check if one sides pieces still exist and are movable, if not that side loses , the whoWon variable gets inputted with the oppsoite person's strings
        - then a message pops up indicating who won, 

6. in the bottom right corner will be a reset button, that will reset all the arrays and will clear all the divs within the spaces
    * the render function is then called to place all pieces on the board 


