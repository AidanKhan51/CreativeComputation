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
let frogimg;
let card1;
let card2;
let card3;
let card4;
let card5;
let card6;
let card7;
let card8;
let card9;
let card10;

// Game states
const GAME_GAMBLING = 1;
const GAME_PLAYING = 2;
const GAME_WON = 3;
const GAME_LOST = 4;
const GAME_TIE = 5;



// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 575,
        size: 400
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

const bank = {
    bet: 0,
    total: 1000
};

// Our fly
// Has a position, size, and speed of horizontal movement
class Fly {
    constructor(x, y, speed, size, center) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.center = center;
        this.circle = random(5, 20);
        this.angle = 0;
    }
}

let flies = [
]

const standButton = {
    x: 270,
    y: 50,
    sizeX: 100,
    sizeY: 50,
    speed: 5
};

//Card array that stores the numbers on the cards
let cardNumbers = [
];

//Array that stores dealer numbers
let dealerNumbers = [
];

let hiddenDealerCard = [
];

/**
 * Creates the canvas and initializes the fly
 */
function preload() {
    frogimg = loadImage('assets/images/frogtest.png');
    card1 = loadImage('assets/images/one.png')
    card2 = loadImage('assets/images/two.png')
    card3 = loadImage('assets/images/three.png')
    card4 = loadImage('assets/images/four.png')
    card5 = loadImage('assets/images/five.png')
    card6 = loadImage('assets/images/six.png')
    card7 = loadImage('assets/images/seven.png')
    card8 = loadImage('assets/images/eight.png')
    card9 = loadImage('assets/images/nine.png')
    card10 = loadImage('assets/images/ten.png')
}

function setup() {
    gameState = GAME_GAMBLING;
    createCanvas(640, 800);
    bank.bet = 10;
    bank.total = 1000;
    textSize(30);
    textAlign(CENTER)
    imageMode(CENTER);
    populateDealer();
    populateFly();
    checkDifficulty();
    // Give the fly its first random position
    flies.forEach(fly => {
        resetFly(fly);
    });
}

let cardReveal;
let sumReveal;

function populateDealer() {
    dealerCard();
    cardReveal = '?';
    hiddenDealerCard.push(int(random(1, 11)));
}

function populateFly() {
    flies.push(new Fly(0, 100, 1, 10, 0));
}

function displayBank() {
    text('Bet: $' + bank.bet, 500, 700);
    text('Bank: $' + bank.total, 500, 650);
}

function draw() {
    switch (gameState) {
        case GAME_GAMBLING:
            background("#87ceeb");
            drawStand();
            showCard();
            drawFrog();
            drawForeground();
            screenText = 'Gamble!'
            text(screenText, 325, 300);
            text('UP to bet higher, DOWN to bet lower', 325, 350);
            text('press ENTER to continue', 325, 450);
            text('$' + bank.bet, 325, 400);
            displayBank();
            if (keyIsPressed === true && key === 'Enter') {
                gameState = GAME_PLAYING;
            }
            else if (keyIsPressed === true && key === 'ArrowUp') {
                bank.bet = constrain(bank.bet + 10, 20, (490 + bank.total))
                bank.bet += 10
            }
            else if (keyIsPressed === true && key === 'ArrowDown') {
                bank.bet = constrain(bank.bet - 10, 20, 490)
                bank.bet -= 10
            }
            break;
        case GAME_PLAYING:
            background("#87ceeb");
            moveFly();
            drawFly();
            drawStand();
            moveStand();
            moveFrog();
            moveTongue();
            drawFrog();
            drawForeground();
            displayBank();
            dealerCalculate();
            checkTongueFlyOverlap();
            cardCalculate();
            checkStandOverlap();
            text(cardReveal, 325, 500);
            text(sumReveal, 325, 550);
            break;
        case GAME_WON:
            text(screenText, 325, 300);
            text('press r to restart', 325, 400);
            text('You won $' + bank.bet, 325, 350);
            break;
        case GAME_LOST:
            text(screenText, 325, 300);
            text('press r to restart', 325, 400);
            text('You lost $' + bank.bet, 325, 350);
            break;
        case GAME_TIE:
            text(screenText, 325, 300);
            text('press r to restart', 325, 400);
            text('$' + bank.bet + ' returned', 325, 350);
            break;
    }
}

let screenText; // text on winning/losing screen

function keyPressed() {
    // Resumes game when r key is pressed
    if (key === 'r' && gameState == GAME_WON || gameState == GAME_LOST || gameState == GAME_TIE) {
        checkDifficulty();
        cardNumbers = []
        dealerNumbers = []
        hiddenDealerCard = []
        flies = []
        standButton.x = 270;
        populateDealer();
        populateFly();
        bank.bet = 10;
        gameState = GAME_GAMBLING;
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */

function moveFly() {
    flies.forEach(fly => {
        // Move the fly\
        fly.x += 5 * cos(fly.angle / fly.circle);
        fly.x += fly.speed;
        fly.center += fly.speed;
        fly.y += 5 * sin(fly.angle / fly.circle);
        // Handle the fly going off the canvas
        fly.angle++;
        if (fly.center > 600) {
            fly.speed *= -1
        }
        else if (fly.center < 0) {
            fly.speed *= -1
        }
    });
}

/**
 * Draws the fly as a black circle
 */

function drawFly() {
    flies.forEach(fly => {
        push();
        noStroke();
        fill("#000000");
        ellipse(fly.x, fly.y, fly.size);
        pop();
    });
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.center = 0;
    fly.y = random(250, 450);
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
    image(frogimg, frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawForeground() {
    push();
    rect(0, 600, 640, 200)
    pop();
}

function drawStand() {
    push();
    rect(standButton.x, standButton.y, standButton.sizeX, standButton.sizeY)
    pop();
}

function moveStand() {
    standButton.x += standButton.speed;
    if (standButton.x > 540) {
        standButton.speed *= -1
    }
    else if (standButton.x < 0) {
        standButton.speed *= -1
    }
}

let flySpawn;

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    flies.forEach(fly => {
        // Get distance from tongue to fly
        const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
        // Check if it's an overlap
        const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
        if (eaten) {
            // Reset the fly
            flies.push(new Fly((random() < 0.5 ? (flySpawn = 0) : (flySpawn = 600)), 100, 1, 10, flySpawn));
            resetFly(fly);
            // Bring back the tongue
            frog.tongue.state = "inbound";
            cardNumbers.push(int(random(1, 11))); // Adds random number from 1-10 into card array
            calculateState(); // Calculates if win or lose condition has been activated
            random() < 0.5 ? 0 : (flies.push(new Fly((random() < 0.5 ? (flySpawn = 0) : (flySpawn = 600)), 100, 1, 10, flySpawn)));
        }
    })
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle" && gameState === GAME_PLAYING) {
        frog.tongue.state = "outbound";
    }
}

function getPlayerSum() { // Sum of numbers in player's card array
    return cardNumbers.reduce((playerSum, x) => playerSum + x, 0);
}

function getDealerSum() { // Sum of numbers in dealer's card array
    const shownDealerSum = getShownDealerSum();
    return shownDealerSum + hiddenDealerCard.reduce((dealerSum, x,) => dealerSum + x, 0);
}

function getShownDealerSum() { // Sum of numbers in dealer's card array
    return dealerNumbers.reduce((shownDealerSum, x,) => shownDealerSum + x, 0);
}

function cardCalculate() {
    const playerSum = getPlayerSum();
    cardNumbers.join('');
    text(cardNumbers.join(' '), 100, 700); // Prints string of numbers from card array
    text(playerSum, 325, 700); // Prints sum of card array
}

function dealerCalculate() {
    const playerSum = getPlayerSum();
    const dealerSum = getDealerSum();
    const shownDealerSum = getShownDealerSum();
    text(dealerNumbers.join(' '), 375, 500); // Prints string of dealer's card array
    sumReveal = shownDealerSum
    if (cardNumbers.length === 3 && playerSum > dealerSum && dealerSum < 16) {
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
    const standing = (d < frog.tongue.size / 2 + standButton.sizeY);
    if (standing) {
        frog.tongue.y = 560
        frog.tongue.state = "idle";
        flies.forEach(fly => {
            resetFly(fly);
        })
        cardReveal = hiddenDealerCard.join(' ');
        sumReveal = dealerSum
        if (dealerSum < 16 && dealerSum < playerSum) {
            dealerCard();
        }
        if (dealerSum > 21) {
            screenText = 'Dealer Bust!'
            // If dealer's cards are over 21, player wins
            bank.total += (bank.bet * 0.5);
            gameState = GAME_WON;
        }
        else if (playerSum === dealerSum) {
            screenText = 'Push!'
            gameState = GAME_TIE;
        }
        else if (playerSum > dealerSum) {
            screenText = 'Win!'
            bank.total += (bank.bet * 0.5);
            gameState = GAME_WON;
        }
        else if (playerSum < dealerSum) {
            screenText = 'Lost!'
            bank.total -= bank.bet;
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
    const shownDealerSum = getShownDealerSum();
    if (playerSum > 21) {
        screenText = 'Bust!'
        bank.total -= bank.bet;
        // If playerSum of card array is greater than 21, player loses
        gameState = GAME_LOST;
    }
    else if (shownDealerSum > 21) {
        screenText = 'Dealer Bust!'
        // If dealer's cards are over 21, player wins
        bank.total += bank.bet * 0.5;
        gameState = GAME_WON;
    }
    else if (cardNumbers.length === 5) {
        screenText = 'Five-card Charlie!'
        // If player has drawn 5 cards without going over 21, player wins
        bank.total += bank.bet * 0.5;
        gameState = GAME_WON;
    }
}

function checkDifficulty() {
    //The more money the faster the stand button and flies move
    flies.forEach(fly => {
        standButton.speed = 5
        fly.speed = 1.5
        standButton.speed += (bank.total * 0.0003)
        fly.speed += (bank.total * 0.0001)
        standButton.speed = constrain(standButton.speed + 0.01, 5, 10)
        fly.speed = constrain(fly.speed + 0.01, 1, 3)
    })
}
function showCard() {

}
