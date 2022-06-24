
    // Link variables to DOM elements
const play = document.getElementById("play-button");
const score = document.getElementById("score-wrapper");
const scoreCounter = document.getElementById("score");
const minefield = document.getElementById("minefield-wrapper");

    // Set a start condition
let endGame = false;

    // Add onclick function on button element
play.addEventListener("click", function() {
    
        // Pick the value of the option to set the difficulty
    let diffLevel = document.querySelector("#difficulty-selector").value;

        // Make the playing board visible and reset it
    minefield.classList.remove("disabled", "bomb");
    score.classList.remove("disabled");
    scoreCounter.innerHTML = "";
    endGame = false;
    minefield.innerHTML = null;

    
    // Depending on the difficulty choosen, set the number of box in the grid
    let boxNumber = diffSelector(diffLevel);

        // Set number of bombs, sort the position randomically and the win condition
    let bombList = [];
    const totalBombNumber = 16;
    let howToWin = boxNumber - totalBombNumber;

    
    
        // Create a new bomb basing on the number of total bombs
    for ( let i = 0; i < totalBombNumber; i++) {

            // Give the bomb a random value and push it in the bombList array
        let newBomb = generateRandomUniqueNumber(bombList, 1, boxNumber);
        bombList.push(newBomb);

    }

        // Print in console the list of the bombs (For the cheaters)
    console.log(bombList);

        for ( let i = 1; i <= boxNumber; i++) {

                // Create boxes and give them a dimension depending on the difficulty
            let box = createNewBox(minefield, i, diffLevel);

                // Give an onclick function on the boxes to make them change background color on click
            ChangeColorOnClick(scoreCounter, minefield, box, box.value, "active", bombList, "bomb", howToWin);

            };
        
        // Change the text on the button
    play.innerHTML = "Restart!";
});






                                        // Functions

    // Function for the creation on the boxes depending on the difficulty
function diffSelector(diffValue) {

    let boxNumber;

        // If the difficulty is medium create 81 boxes
    if (diffValue == "1") {
        boxNumber = 81;
        
        // If the difficulty is hard create 49 boxes
    } else if (diffValue =="2") {
        boxNumber = 49;
    } else {
        
        // In every other situation ( difficulty set on easy or html manipulation) create 100 boxes
        boxNumber = 100;
    };

        // Return the value on boxNumber
    return boxNumber;

}


    // Function to generate a random number in a certain range that will never repeat
function generateRandomUniqueNumber(blacklist, min, max) {

    let randomNumber;

        // Number check
    let isNumValid = false;
    
    // When the check returns false, generate a random number
    while (isNumValid === false) {
        randomNumber = Math.floor(Math.random() * (max) + min);
        
            // If the generated number is not in the blacklist yet, change the check status
        if (!blacklist.includes(randomNumber)) {
            isNumValid = true;
        }

            // Else generate another random number
    }

        // Return the number
    return randomNumber;
}


    // Function for the creation of the boxes and for give them style
function createNewBox(parentToAppend, index, difficulty) {

        // Create a div
    let newBox = document.createElement("div");
        // Save the value of the box
    newBox.value = index;

        // Change the box dimension depending on the difficulty
    if (difficulty == "1") {     
        newBox.classList.add("box", "medium-box");
    } else if (difficulty == "2") {     
        newBox.classList.add("box", "hard-box");
    } else {
        newBox.classList.add("box", "easy-box");
    }

        // Append the divs to the parent in the DOM
    parentToAppend.append(newBox);

        // Return the element
    return newBox;
};


    // Function to change the color of boxes on click
function ChangeColorOnClick(message, parent, element, elementValue, classToActive, bombList, gameOverClass, winCondition) {
    
    // Create an onclick event for the boxes  
    element.addEventListener("click", function() {
        
            // If endgame condition is true exit from the function
        if (endGame === true) {
            return;
        }

            // If the value of the box clicked is not in the bombList array
        if (!bombList.includes(elementValue)) {

                // Add the active class that will change the background color
            element.classList.add(classToActive);
                // Set a counter of the active boxes as a score counter
            let counter = document.querySelectorAll("." + classToActive).length;
            message.innerHTML = "SCORE: " + counter;

                // If the score counter reach the number of the total boxes - the number of the bombs, the user wins and endgame condition becomes true
            if (counter === winCondition) {

                    // Print the message on screen
                message.innerHTML = "You won!"
                endGame = true;
            }

            // Else, if the user clicks on a bomb, add the class to change the background to red and set the endGame condition to true
        } else {
            element.classList.add(gameOverClass);
            endGame = true;
            
                // All the grid becomes red
            parent.classList.add(gameOverClass);

                // Print the message on screen
            message.innerHTML = "You lost."
            
        }
            
        
    });
}
