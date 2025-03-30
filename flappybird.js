function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




// Function to create a grid of characters
function createGrid(rows, columns, defaultCharacter) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(defaultCharacter);
        }
        grid.push(row);
    }
    return grid;
}

// Function to display the grid
function displayGrid(grid) {
    grid.forEach(row => {
        console.log(row.join(' '));
    });
    
    console.log("Score: "+score)
}

// Function to update a specific character in the grid
function updateCharacter(grid, row, column, newCharacter) {
    if (row >= 0 && row < grid.length && column >= 0 && column < grid[row].length) {
        grid[row][column] = newCharacter;
    } else {
        
    }
}

function updateColumn(grid, columnIndex, newCharacter) { //function to update a column
    if (columnIndex >= 0 && columnIndex < grid[0].length) {
        for (let row = 0; row < grid.length; row++) {
            grid[row][columnIndex] = newCharacter;
        }
    } else {
        
    }
}

function createGap(grid, column, newCharacter) { //function to create the gap
    const min = 1;
    const max = 8;
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    updateCharacter(grid, randomInt, column, newCharacter)
    updateCharacter(grid, randomInt - 1, column, newCharacter)
    updateCharacter(grid, randomInt + 1, column, newCharacter)
    

}

function generatePipes(grid, column) {
    updateColumn(grid, 9, "|")
    createGap(grid, 9, ".")
}


function moveCharacterLeft(grid, columnIndex, targetCharacter, direction) {
    for (let row = 0; row < grid.length; row++) {
        if (grid[row][columnIndex] === targetCharacter && columnIndex > 0) {
            // Swap the target character with the character to its left
            grid[row][columnIndex] = grid[row][columnIndex - direction];
            grid[row][columnIndex - direction] = targetCharacter;
        }
    }
}


function isCharacterAtPosition(grid, row, column, character) {
    if (row >= 0 && row < grid.length && column >= 0 && column < grid[row].length) {
        // Check if the character at the given position matches the target character
        return grid[row][column] === character;
    } else {
        // Out-of-bounds check
        console.error("Invalid position: Out of grid boundaries");
        return false;
    }
}



function movePipes(grid, character,) {
    
    moveCharacterLeft(grid, 1, character, 1)
    moveCharacterLeft(grid, 2, character, 1)
    moveCharacterLeft(grid, 3, character, 1)
    moveCharacterLeft(grid, 4, character, 1)
    moveCharacterLeft(grid, 5, character, 1)
    moveCharacterLeft(grid, 6, character, 1)
    moveCharacterLeft(grid, 7, character, 1)
    moveCharacterLeft(grid, 8, character, 1)
    moveCharacterLeft(grid, 9, character, 1)

}

// Example usage
const rows = 10; // Number of rows
const columns = 10; // Number of columns
const defaultCharacter = '.'; // Default character in the grid
const grid = createGrid(rows, columns, defaultCharacter);
var flappy_x = 0
var flappy_y = 4
var flappy_x_old 
var flappy_y_old
const refreshrate = 750 //the speed of the game
let score = 0
var deathmessage = "Game over. Score: "+score



updateCharacter(grid, flappy_y, flappy_x, "@")


process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", (key) => {
    if (key.toString().trim() === 'q') { // Press 'q' to quit
        console.log("Goodbye!");
        process.exit();
    }
    if (key.toString() === ' ') { // Press SPACE
        
        if (flappy_y<10) {
            if (flappy_y > 0) {
                flappy_y_old = flappy_y
                flappy_x_old = flappy_x
                if (isCharacterAtPosition(grid, flappy_y-1, flappy_x, "|")) {
                    console.log("game over")
                    process.exit();
                }
                console.clear()
                flappy_y-- //only important thing here
                updateCharacter(grid, flappy_y, flappy_x, "@")
                updateCharacter(grid, flappy_y_old, flappy_x_old, ".")
                displayGrid(grid)
            }
        } 
        
        
    }
    if (key.toString() === 'b') { // Press b
        
        
        if (flappy_y<9) {
            if (flappy_y > -1) {
                flappy_y_old = flappy_y
                flappy_x_old = flappy_x
                flappy_y++ //only important thing here
                console.clear()
                updateCharacter(grid, flappy_y, flappy_x, "@")
                updateCharacter(grid, flappy_y_old, flappy_x_old, ".")
                displayGrid(grid)
            }
        } 
        
    }
    
});


function normalround() {
    
}


generatePipes(grid, 9)

while (true) {

    //round 1-3
    for (let i = 0; i < 3; i++) {
        console.clear()
        displayGrid(grid)
        
        updateCharacter(grid, flappy_y, flappy_x, "@")
        movePipes(grid, "|")
        updateColumn(grid, 0, ".")
        updateCharacter(grid, flappy_y, flappy_x, "@")
        await sleep(refreshrate)
        
        if (flappy_y<8) {
            if (flappy_y > -1) {
                flappy_y_old = flappy_y
                flappy_x_old = flappy_x
                flappy_y++ //only important thing here
                console.clear()
                updateCharacter(grid, flappy_y, flappy_x, "@")
                updateCharacter(grid, flappy_y_old, flappy_x_old, ".")
                displayGrid(grid)
            }
        } 
        
        if (isCharacterAtPosition(grid, flappy_y, flappy_x, "|")) {
            console.log("Game over. Score: "+score);
            process.exit();
        }
        
        if (isCharacterAtPosition(grid, flappy_y, flappy_x+1, "@")) {
            console.log("Game over. Score: "+score);
            process.exit();
        }
        
        if (isCharacterAtPosition(grid, flappy_y+1, flappy_x+1, "@")) {
            console.log("Game over. Score: "+score);
            process.exit();
        }
        if (isCharacterAtPosition(grid, flappy_y-1, flappy_x+1, "@")) {
            console.log("Game over. Score: "+score);
            process.exit();
        }

        
    }
    
    
    //round 4, generate pipes

    console.clear()
    displayGrid(grid)

    

    updateCharacter(grid, flappy_y, flappy_x, "@")
    movePipes(grid, "|")
    updateColumn(grid, 0, ".")
    generatePipes(grid, 9)
    updateCharacter(grid, flappy_y, flappy_x, "@")
    score = score + 1
    
    await sleep(refreshrate)
    if (isCharacterAtPosition(grid, flappy_y, flappy_x, "|")) {
        console.log("Game over. Score: "+score);
        process.exit();
    }
    if (isCharacterAtPosition(grid, flappy_y, flappy_x+1, "@")) {
        console.log("Game over. Score: "+score);
        process.exit();
    }
}



