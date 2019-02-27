// ==================================
// Variables
// ==================================

// variable to store the number randomly chosen by the computer
var computerNumber;

// variable to store the score of the player
var playerNumber;

// variable to store the random number for the buttons
var buttonsNumbers = [];

// variable to store the wins
var wins = 0;

// variable to store the losses
var losses = 0;

// variable to count the number of clicks
var clickCount= 0;

// array to store the button ids
var buttonIds = ["#btn-1", "#btn-2", "#btn-3", "#btn-4"];

// variable to get a random number for the surprise
var numberForSurprise;

// variable to store the random index - for the surprise
var randomIndex;


// ==================================
// Functions
// ==================================

// function to generate the computer number - random number between 19 and 120
// and display it on the web page
function computerRandom() {
    // reset the computer number before assigning a new one
    computerNumber = 0;
    // assign a random number
    computerNumber = (Math.floor(Math.random() * 102) + 19);
    // display it on the web page
    $("#computer-number").text(computerNumber);
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

// function to reset the player's number at the end of a round
function resetPlayerNumber() {
    playerNumber = 0;
    $("#player-number").text(playerNumber);
};

// function to generate random number between 1 and 6 - for the surprise
function resetNumberForSurprise() {
    numberForSurprise = Math.floor(Math.random() * 6) + 1;
};



// ==================================
// Main process
// ==================================

// Getting the game ready
// the computer gets a random number
computerRandom();
console.log("computer number: " + computerNumber);
// generate random number between 1 and 6 - for the surprise
resetNumberForSurprise();
console.log("number of clicks for surprise: " + numberForSurprise);
// each button get a random number, which become their value
buttonRandom();
// the player's number is zero - game hasn't started yet
resetPlayerNumber()
// make sure the click counter is set to 0
clickCount = 0;
// get the type of the surprise - false = poisonous mushroom / true = magic mushroom
var surpriseType = (Math.random() > 0.5);
console.log("type of surprise: " + surpriseType);

// the html document loads before the js file starts running
$(document).ready(function() {

    // when the player clicks on any of the four buttons
    $(".btn").on("click", function () {
        
        // store the value of the button that has been clicked in the variable "value"
        var value = $(this).val();
        console.log("button value: " + value);

        // add 1 to the counter "clickCount"
        clickCount++;
        console.log("click count: " + clickCount);

        // if the number of clicks is equal to the number for the surprise 
        // and the type of the surprise is "true"
        if (clickCount === numberForSurprise && surpriseType) {
            // generate a random number between 0 and 3
            randomIndex = Math.floor(Math.random() * 4);
            console.log("random index: " + randomIndex);
            // get the HTML button whose index in the array "buttonIds" is equal to randomIndex 
            // and change its value to "magic mushroom"
            $(buttonIds[randomIndex]).attr("value", "magic mushroom");
            console.log("id for the button that will change: " + buttonIds[randomIndex]);
        // if the number of clicks is equal to the number for the surprise
        // and the type of the surprise is "false"
        } else if (clickCount === numberForSurprise && !surpriseType) {
            // generate a random number between 0 and 3
            randomIndex = Math.floor(Math.random() * 4);
            console.log("random index: " + randomIndex);
            // get the HTML button whose index in the array "buttonIds" is equal to randomIndex 
            // and change its value to "poisonous mushroom"
            $(buttonIds[randomIndex]).attr("value", "poisonous mushroom");
            console.log("id for the button that will change: " + buttonIds[randomIndex]);
        };

        // if value === "poisonous mushroom"
        if (value === "poisonous mushroom") {
            // some text appear on the screen
            $("#text-surprise").text("Oh nooo! You picked a poisonous mushroom, got dizzy and lost track of the mushroom values...")
            // new numbers are chosen and their values are attributed to the buttons
            buttonRandom();
        // otherwise if value === "magic mushroom"    
        } else if (value === "magic mushroom") {   
            // some text appear on the screen
            $("#text-surprise").text("Oh you got lucky! You picked a magic mushroom... you see the truth now...!")
            // the magic mushroom get back its original value
            $(buttonIds[randomIndex]).attr("value", buttonsNumbers[randomIndex]);
            console.log("randomIndex: " + randomIndex);
            console.log("buttonsNumbers: " + buttonsNumbers[randomIndex]);
            // the values of the mushroom are reavealed
            $("#caption-btn-1").text(buttonsNumbers[0]);
            $("#caption-btn-2").text(buttonsNumbers[1]);
            $("#caption-btn-3").text(buttonsNumbers[2]);
            $("#caption-btn-4").text(buttonsNumbers[3]);
        } else {
            // convert the value of the button into an integer and
            // add the value of the button to the player's number 
            playerNumber = playerNumber + parseInt(value);
            console.log("player's number: " + playerNumber)
            // display the player's number on the web page
            $("#player-number").text(playerNumber);
        };

        // if the player's number matches the computer's number
        if (playerNumber === computerNumber) {
            // the number of wins increases by 1
            updateWins();
            // empty the "text-surprise" div
            $("#text-surprise").empty();
            // empty the "caption" divs
            $("#caption-btn-1").empty();
            $("#caption-btn-2").empty();
            $("#caption-btn-3").empty();
            $("#caption-btn-4").empty();
            // a new random number to reach is chosen and displayed on the screen
            computerRandom();
            console.log("computer number: " + computerNumber);
            // reset the number for "surprise"
            resetNumberForSurprise();
            console.log("number of clicks for surprise: " + numberForSurprise);
            // reset the surprise type
            surpriseType = Math.random() > 0.5;
            console.log("type of surprise: " + surpriseType);
            // reset the click counter to 0
            clickCount = 0;
            // new numbers are chosen and their values are attributed to the buttons
            buttonRandom();
            // the player's number is reset
            resetPlayerNumber();

        // if the player's number goes over the computer's number
        } else if (playerNumber > computerNumber) {
            // the number of losses increases by 1
            updateLosses();
            // empty the "text-surprise" div
            $("#text-surprise").empty();
            // empty the "caption" divs
            $("#caption-btn-1").empty();
            $("#caption-btn-2").empty();
            $("#caption-btn-3").empty();
            $("#caption-btn-4").empty();
            // a new random number to reach is chosen and displayed on the screen
            computerRandom();
            console.log("computer number: " + computerNumber);
            // reset the number for "surprise"
            resetNumberForSurprise();
            console.log("number of clicks for surprise: " + numberForSurprise);
            // reset the surprise type
            surpriseType = Math.random() > 0.5;
            console.log("type of surprise: " + surpriseType);
            // reset the click counter to 0
            clickCount = 0;
            // new numbers are chosen and their values are attributed to the buttons
            buttonRandom();
            // the player's number is reset
            resetPlayerNumber();
        };

    });

});


