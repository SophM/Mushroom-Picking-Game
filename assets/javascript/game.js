// ==================================
// Variables
// ==================================

// variable to store the number randomly chosen by the computer
var computerNumber;

// variable to store the score of the player
var playerNumber = 0;

// variable to store the random number for the buttons
var buttonsNumbers = [];

// variable to store the wins
var wins = 0;

// variable to store the losses
var losses = 0;


// ==================================
// Functions
// ==================================

// function to generate the computer number - random number between 19 and 120
// and display it on the web page
function computerRandom() {
    // reset the computer number before assigning a new one
    computerNumber = 0;
    // assign a random number
    computerNumber = (Math.floor(Math.random() * 101) + 19);
    // display it on the web page
    $("#computer-number").text(computerNumber);
    return computerNumber;
};

// function to generate the random numbers for the buttons - One number per button
// random numbers between 1 and 12
function buttonRandom() {
    // reset the buttonRandom array before assigning new numbers
    buttonsNumbers = [];
    // assign a random number to each button
    buttonsNumbers[0] = (Math.floor(Math.random() * 12) + 1);
    buttonsNumbers[1] = (Math.floor(Math.random() * 12) + 1);
    buttonsNumbers[2] = (Math.floor(Math.random() * 12) + 1);
    buttonsNumbers[3] = (Math.floor(Math.random() * 12) + 1);
    // attribute the numbers as a value for each HTML button element
    $("#btn-1").attr("value", buttonsNumbers[0]);
    $("#btn-2").attr("value", buttonsNumbers[1]);
    $("#btn-3").attr("value", buttonsNumbers[2]);
    $("#btn-4").attr("value", buttonsNumbers[3]);
};

// function to show the player's number, adding up
function showPlayerNumber() {
    $("#player-number").text(playerNumber);
};

// function to update the number of wins on the screen
function updateWins() {
    wins++;
    $("#number-win").text(wins);
};

// function to update the number of losses on the screen
function updateLosses() {
    losses++;
    $("#number-loss").text(losses);
};

// reset the player's number at the end of a round
function resetPlayerNumber() {
    playerNumber = 0;
    $("#player-number").empty();
};


// ==================================
// Main process
// ==================================

// Getting the game ready
// the computer gets a random number
computerNumber = computerRandom();
console.log(computerNumber);
// each button get a random number, which become their value
buttonRandom();

// when the player clicks on any of the four buttons
$(".btn").on("click", function () {

    // store the value of the button that has been clicked in the variable "value"
    var value = $(this).val();
    console.log(value);
    // convert the value of the button into an integer and
    // add the value of the button to the player's number 
    playerNumber = playerNumber + parseInt(value);
    console.log(playerNumber)
    // display the player's number on the web page
    $("#player-number").text(playerNumber);

    // if the player's number matches the computer's number
    if (playerNumber === computerNumber) {
        // the number of wins increases by 1
        updateWins();
        // the player's number is reset
        resetPlayerNumber();
        // a new random number to reach is chosen and displayed on the screen
        computerRandom();
        // new numbers are chosen and their values are attributed to the buttons
        buttonRandom();
        // if the player's number goes over the computer's number
    } else if (playerNumber > computerNumber) {
        // the number of losses increases by 1
        updateLosses();
        // the player's number is reset
        resetPlayerNumber();
        // a new random number to reach is chosen and displayed on the screen
        computerRandom();
        // new numbers are chosen and their values are attributed to the buttons
        buttonRandom();
    };

});


