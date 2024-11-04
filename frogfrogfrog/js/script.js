/**
 * GambleGambleGamble
 * Aidan Khan & Pippin Barr
 * 
 * A game of gambling
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let gameState;

// Game states
const GAMBLING = 1;
const GAME_PLAYING = 2;
const GAME_WON = 3;
const GAME_LOST = 4;
const GAME_TIE = 5;

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 600,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 560,
        size: 20,
        speed: 25,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

const standButton = {
    x: 270,
    y: 50,
    size: 100
};

//Card array that stores the numbers on the cards
let cardNumbers = [
];

//Array that stores dealer numbers
let dealerNumbers = [
];

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    gameState = GAME_PLAYING;
    createCanvas(640, 800);
    populateDealer();

    // Give the fly its first random position
    resetFly();
}

function populateDealer() {
    dealerCard();
    dealerCard();
}

function draw() {
    switch (gameState) {
        case GAME_PLAYING:
            background("#87ceeb");
            moveFly();
            drawFly();
            drawStand();
            moveFrog();
            moveTongue();
            drawFrog();
            drawForeground();
            dealerCalculate();
            checkTongueFlyOverlap();
            cardCalculate();
            checkStandOverlap();
            break;
        case GAME_WON:
            text(screenText, 315, 300);
            break;
        case GAME_LOST:
            text(screenText, 315, 300);
            break;
        case GAME_TIE:
            text(screenText, 315, 300);
            break;
    }
}

let screenText; // text on winning/losing screen

function mouseClicked() {
    // Resumes game when mouse is clicked
    if (gameState == GAME_WON || gameState == GAME_LOST || gameState == GAME_TIE) {
        cardNumbers = []
        dealerNumbers = []
        populateDealer();
        gameState = GAME_PLAYING;
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(100, 450);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawForeground() {
    push();
    rect(0, 600, 800, 200)
    pop();
}

function drawStand() {
    push();
    rect(standButton.x, standButton.y, standButton.size)
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        cardNumbers.push(int(random(1, 11))); // Adds random number from 1-10 into card array
        calculateState(); // Calculates if win or lose condition has been activated
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}

function getPlayerSum() { // Sum of numbers in player's card array
    return cardNumbers.reduce((playerSum, x) => playerSum + x, 0);
}

function getDealerSum() { // Sum of numbers in dealer's card array
    return dealerNumbers.reduce((dealerSum, x) => dealerSum + x, 0);
}

function cardCalculate() {
    const playerSum = getPlayerSum();
    cardNumbers.join('');
    text(cardNumbers.join(' '), 50, 700); // Prints string of numbers from card array
    text(playerSum, 325, 700); // Prints sum of card array

}

function dealerCalculate() {
    const playerSum = getPlayerSum();
    const dealerSum = getDealerSum();
    text(dealerNumbers.join(' '), 325, 500); // Prints string of dealer's card array
    text(dealerSum, 325, 450);
    if (cardNumbers.length === 3 && playerSum > dealerSum) {
        // If the player has drawn 3 cards and the dealer's number is lower, the dealer draws
        dealerCard();
        if (dealerSum < 16) {
            // If the dealer's sum is still under 16, the dealer draws
            dealerCard();
        }
    }
}

function dealerCard() {
    dealerNumbers.push(int(random(1, 11))); // Dealer draws card
    calculateState(); // Calculates win or lose condition
}

function checkStandOverlap() { // Checks when player decides to stand
    const playerSum = getPlayerSum();
    const dealerSum = getDealerSum();
    const d = dist(frog.tongue.x, frog.tongue.y, standButton.x, standButton.y);
    const standing = (d < frog.tongue.size / 2 + standButton.size / 2);
    if (standing) {
        frog.tongue.state = "inbound";
        if (playerSum === dealerSum) {
            screenText = 'Push!'
            gameState = GAME_TIE;
        }
        if (playerSum > dealerSum) {
            screenText = 'Win!'
            gameState = GAME_WON;
        }
        if (playerSum < dealerSum) {
            screenText = 'Lost!'
            gameState = GAME_LOST;
        }
    }
    //if playerSum > dealer, player wins
    // if playerSum < dealer, player loses
    //if playerSum = dealer, push
}

function calculateState() {
    const playerSum = getPlayerSum();
    const dealerSum = getDealerSum();
    if (playerSum > 21) {
        screenText = 'Bust!'
        // If playerSum of card array is greater than 21, player loses
        gameState = GAME_LOST;
    }
    if (cardNumbers.length === 5) {
        screenText = 'Five-card Charlie!'
        // If player has drawn 5 cards without going over 21, player wins
        gameState = GAME_WON;
    }
    if (dealerSum > 21) {
        screenText = 'Dealer Bust!'
        // If dealer's cards are over 21, player wins
        gameState = GAME_WON;
    }
}
