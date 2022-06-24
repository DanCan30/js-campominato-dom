
    // Link variables to DOM elements
const play = document.getElementById("play-button");

    // Add onclick function on button element
play.addEventListener("click", function() {


    const minefield = document.getElementById("minefield-wrapper");
        // Pick the value of the option to set the difficulty
    let diffLevel = document.querySelector("#difficulty-selector").value;

        // Make the playing board visible
    minefield.classList.remove("disabled");

        // Create a new playing board every time the user press on the button
    minefield.innerHTML = null;
    
    // Depending on the difficulty choosen, set the number of box in the grid
    let boxNumber = diffSelector(diffLevel);

    let bombList = [];


    const totalBombNumber = 16;
    let newBomb;
    
    
    
        for ( let i = 0; i < totalBombNumber; i++) {
    
            newBomb = generateRandomUniqueNumber(bombList, 1, boxNumber);
            bombList.push(newBomb);
    
    }

    
    console.log(bombList);

        for ( let i = 1; i <= boxNumber; i++) {
                // Create boxes and give them a dimension depending on the difficulty
            let box = createNewBox(minefield, i, diffLevel);
                    // Give an onclick function on the boxes to make them change background color on click
                ChangeColorOnClick(box, box.value, "active", bombList, "bomb");

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




function generateRandomUniqueNumber(blacklist, min, max) {

    let randomNumber;
    let isNumValid = false;
    
    while (isNumValid === false) {
        randomNumber = Math.floor(Math.random() * (max) + min);
        
        if (!blacklist.includes(randomNumber)) {
            isNumValid = true;
        }

    }

    return randomNumber;
}




    // Function for the creation on the boxes and for give them style
function createNewBox(parentToAppend, index, difficulty) {

        // Create a div
    let newBox = document.createElement("div");
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
function ChangeColorOnClick(element, elementValue, classToAdd, bombList, bombClass) {

        // Create an onclick event for the boxes
    let activeClass = element.addEventListener("click", function() {

            // Add the class with background changes


        if (bombList.includes(elementValue)) {
            element.classList.add(bombClass)
        } else {
            element.classList.add(classToAdd);
        }

            // If the box has the class that change his background print it on console
        if (element.classList.contains(classToAdd)) {
            console.log(elementValue);
        };

            // Return the eventListener
        return activeClass;

    });
}
