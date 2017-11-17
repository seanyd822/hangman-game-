

// Array of Word Options (all lowercase)
var wordsList   = ["genji", "mccree", "reaper", "pharah", "tracer", "junkrat", "hanzo", "reinhart", "lucio", "roadhog"];
var chosenWord  = ""; 
var lettersInChosenWord = []; 
var numBlanks   = 0; 
var blanksAndSuccesses = []; 
var wrongGuesses = []; 

// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses  = 9;

// startGame()

function startGame() {
    // Reset the guesses back to 0
    numGuesses = 9;

    chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)]; 
    lettersInChosenWord = chosenWord.split(""); 
    numBlanks = lettersInChosenWord.length; 

    console.log(chosenWord); 

    blanksAndSuccesses = []; 
    wrongGuesses = []; 

    // Fill up the blanksAndSuccesses list with appropriate number of blanks. 
    for (var i=0; i <numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    console.log(blanksAndSuccesses); 

    // Reprints the guessesLeft to 9
    document.getElementById("guessesLeft").innerHTML = numGuesses;
    
    // Prints the blanks at the beginning of each round in the HTML
    document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

    // Clears the wrong guesses from the previous round
    document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");



}

// checkLettesr() function
// It's where we will do all of the comparisons for matches. 
function checkLetters(letter) {

    var letterInWord = false; 

    // Check if a leter exists inside the array at all.
    for (var i=0; i<numBlanks; i++) {
        if(chosenWord[i] == letter) {
            letterInWord = true;  
        }
    }

    // If the letter exists somewhere in the word, then figure out exactly where 
    if(letterInWord){
    
        // loop through the word 
        for (var i=0; i<numBlanks; i++){

            // Populate the blanksAndSuccesses with every instance of the letter.
            if(chosenWord[i] == letter) {
                blanksAndSuccesses[i] = letter; 
            }
        }
        console.log(blanksAndSuccesses); 
    }
    // If the letter doesn't exist at all...
    else {
        // then we add the letter to the list of wrong letters
        wrongGuesses.push(letter); 
        // and we subtract one of the guesses
        numGuesses--; 
    }
}

// roundComplete() function

function roundComplete(){

    // First, log an initial status update in the console telling us how many wins, losses, and guesses are left
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guessesLeft").innerHTML= numGuesses;
    document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); 
    document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" "); 

    // If we have gotten all the letters to match the solution... 
    if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
        winCounter++; 
        alert("Cheers Love the Cavalry's Here!"); 

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML= winCounter;
        startGame(); 
    }

    // If we've run out of guesses
    else if(numGuesses == 0) {
        lossCounter++;   
        alert("Die Die Die!"); 

        // Update the loss counter in the HTML
        document.getElementById("lossCounter").innerHTML= lossCounter; 
        startGame(); 
    }

}



// Starts the Game by running the startGame() function
startGame();

// Then initiates the function for capturing key clicks.
document.onkeyup = function(event) {
    letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); 
    checkLetters(letterGuessed); 
    roundComplete(); 
}