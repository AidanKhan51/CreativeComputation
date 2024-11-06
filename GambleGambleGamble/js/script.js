/**
 * GambleGambleGamble
 * Aidan Khan & Pippin Barr
 * 
 * A game of amphibian blackjack
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * - try to get a total of 21 without going over!
 * - Make as much money as you can! (payout 3:2)
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let gameState; // variable for game states
let cardReveal; // variable for revealing the card in the hole
let sumReveal; //variable for revealing the total sum with the card in the hole
let screenText; // text on winning/losing screen
let flySpawn; //variable to decide 50% chance of fly spawning on left or right side of screen. 
//Flyspawn has to exist because it stores the data from fly.x into it and gives it to fly.centre, so they're on the same page
//this is because the trigger for the fly bouncing off the screen and moving the other direction is controlled by fly.center, not fly.x

//images
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
let flyimg;
let foreground;
let counter;
let standimg;
let board;

// Game states
const GAME_GAMBLING = 1;
const GAME_PLAYING = 2;
const GAME_WON = 3;
const GAME_LOST = 4;
const GAME_TIE = 5;


//let images = [
//image(card1, 0, 0, 100, 150),
// image(card2, 0, 0, 100, 150),
// image(card3, 0, 0, 100, 150),
// image(card4, 0, 0, 100, 150),
// image(card5, 0, 0, 100, 150),
// image(card6, 0, 0, 100, 150),
// image(card7, 0, 0, 100, 150),
// image(card8, 0, 0, 100, 150),
// image(card9, 0, 0, 100, 150),
// image(card10, 0, 0, 100, 150)
//]

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

//where bank data is stored
const bank = {
    bet: 0,
    total: 1000
};

// Our fly object
// so we can keep adding to our fly array
class Fly {
    constructor(x, y, speed, size, center) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.center = center; //center of circle instead of position of fly
        this.circle = random(5, 20);
        this.angle = 0;
    }
}
//array for our flies
let flies = [
]
//data for the "stand" Target
const standTarget = {
    x: 270,
    y: 25,
    sizeX: 100,
    sizeY: 50,
    speed: 5
};

//Card array that stores the Values on the player's cards
let cardValues = [
];

//Array that stores dealer Values
let dealerValues = [
];

//Stores the card in the hole
let hiddenDealerCard = [
];

/**
 * image preload
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
    flyimg = loadImage('assets/images/flyimg.png')
    foreground = loadImage('assets/images/Foreground.png')
    counter = loadImage('assets/images/counter.png')
    standimg = loadImage('assets/images/standimg.png')
    board = loadImage('assets/images/board.png')
}

/**
 * Creates the canvas and initializes the fly
 * draws a few objects like the board and the bank counters
 * alligns text and images
 * populates the dealer's array with their starting hand and populates the first fly array
 * checks the amount of money in your bank and changes the speed of the flies and stand target accordingly, creating scaled difficulty
 */
function setup() {
    gameState = GAME_GAMBLING;
    createCanvas(640, 800);
    showBoard();
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

//populate dealer array with starting hand
function populateDealer() {
    dealerCard();
    cardReveal = '?';
    hiddenDealerCard.push(int(random(1, 11)));
}

//populate fly array with first fly
function populateFly() {
    flies.push(new Fly(0, 100, 1, 30, 0));
}

function checkDifficulty() {
    //The more money the faster the stand Target and flies move
    flies.forEach(fly => {
        standTarget.speed = 5
        fly.speed = 1.5
        standTarget.speed += (bank.total * 0.0003)
        fly.speed += (bank.total * 0.0001)
        standTarget.speed = constrain(standTarget.speed + 0.01, 5, 10)
        fly.speed = constrain(fly.speed + 0.01, 1, 3)
    })
}

//displays bank counter
function displayBank() {
    push();
    image(counter, 517, 552);
    pop();
    textAlign(LEFT);
    text('Bet:   $' + bank.bet, 435, 586);
    text('Bank:   $' + bank.total, 410, 541);
    textAlign(CENTER);
}

function draw() {
    switch (gameState) {
        case GAME_GAMBLING:
            /**
             * gambling state
             * draws a few objects 
             * displays text
             * lets you adjust betting amount
             */
            background("#87ceeb");
            showBoard();
            drawStand();
            drawForeground();
            screenText = 'Gamble!'
            text(screenText, 325, 300);
            text('UP to bet higher, DOWN to bet lower', 325, 350);
            text('press ENTER to continue', 325, 450);
            text('$' + bank.bet, 325, 400);
            displayBank();
            drawFrog();
            drawForeground();
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
            /**
             * The game
             */
            background("#87ceeb");
            showBoard();
            moveFly();
            drawFly();
            drawStand();
            moveStand();
            moveFrog();
            moveTongue();
            displayBank();
            drawFrog();
            drawForeground();
            dealerCalculate();
            checkTongueFlyOverlap();
            cardCalculate();
            checkStandOverlap();
            text(cardReveal, 160, 245);
            text(sumReveal, 322, 400);
            break;
        case GAME_WON:
            // Displays winning text 
            text(screenText, 325, 300);
            text('press r to restart', 325, 430);
            text('You won $' + bank.bet, 325, 350);
            break;
        case GAME_LOST:
            // Displays losing text 
            text(screenText, 325, 300);
            text('press r to restart', 325, 430);
            text('You lost $' + bank.bet, 325, 350);
            break;
        case GAME_TIE:
            // Displays push text
            text(screenText, 325, 300);
            text('press r to restart', 325, 430);
            text('$' + bank.bet + ' returned', 325, 350);
            break;
    }
}

function keyPressed() {
    // Resumes game when r key is pressed
    if (key === 'r' && gameState == GAME_WON || gameState == GAME_LOST || gameState == GAME_TIE) {
        // basically servers as a re-setup between rounds
        // clears out arrays and repopulates them with starting amount
        // brings "stand Target back to center"
        // sets minimum bet to 10
        checkDifficulty();
        cardValues = []
        dealerValues = []
        hiddenDealerCard = []
        flies = []
        standTarget.x = 270;
        populateDealer();
        populateFly();
        bank.bet = 10;
        gameState = GAME_GAMBLING;
    }
}

/**
 * Moves the fly according to its speed and the size of the circle
 * bounces the fly back when it hits the sides of the screen
 */

function moveFly() {
    flies.forEach(fly => {
        // Move the fly in a circular pattern
        fly.x += 5 * cos(fly.angle / fly.circle);
        fly.x += fly.speed;
        fly.center += fly.speed;
        fly.y += 5 * sin(fly.angle / fly.circle);
        // Handle the fly going off the canvas
        fly.angle++;
        //increase angle every frame
        if (fly.center > 600) {
            fly.speed *= -1
            //if fly hits LEFT border of the screen, it reverses direction
        }
        else if (fly.center < 0) {
            fly.speed *= -1
            //if fly hits RIGHT border of the screen, it reverses direction
        }
    });
}

/**
 * Draws the fly as an image
 */
function drawFly() {
    flies.forEach(fly => {
        push();
        image(flyimg, fly.x, fly.y, fly.size, 30);
        pop();
    });
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly(fly) {
    fly.x = 0;
    fly.center = 0;
    fly.y = random(250, 400);
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
    fill("ff3366");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff3366");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    image(frogimg, frog.body.x, frog.body.y, frog.body.size, 300);
    pop();
}

//draws foreground image
function drawForeground() {
    push();
    image(foreground, 320, 700, 640, 200);
    pop();
}

// draws board background
function showBoard() {
    push();
    image(board, 320, 300)
    pop();
}

//draws "Stand" target
function drawStand() {
    push();
    image(standimg, standTarget.x, standTarget.y, standTarget.sizeX, standTarget.sizeY)
    pop();
}

//moves "Stand" target, if the target reaches either end of the screen it reverses direction
function moveStand() {
    standTarget.x += standTarget.speed;
    if (standTarget.x > 590) {
        standTarget.speed *= -1
    }
    else if (standTarget.x < 45) {
        standTarget.speed *= -1
    }
}

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
            // Reset the fly that was just caught. 50% chance of it spawning on the other side of the screen
            flies.push(new Fly((random() < 0.5 ? (flySpawn = 0) : (flySpawn = 600)), 100, 1, 30, flySpawn));
            resetFly(fly);
            // Bring back the tongue
            frog.tongue.state = "inbound";
            cardValues.push(int(random(1, 11))); // Adds random number from 1-10 into card array
            calculateState(); // Calculates if win or lose condition has been activated
            // 50% chance of pushing new fly into array. 50% chance of it spawning on either side of the screen
            random() < 0.5 ? 0 : (flies.push(new Fly((random() < 0.5 ? (flySpawn = 0) : (flySpawn = 600)), 100, 1, 30, flySpawn)));
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

// Sum of values in player's card array
function getPlayerSum() {
    return cardValues.reduce((playerSum, x) => playerSum + x, 0);
}

// Sum of values in dealer's card array including "card in the hole"
function getDealerSum() {
    const shownDealerSum = getShownDealerSum();
    return shownDealerSum + hiddenDealerCard.reduce((dealerSum, x,) => dealerSum + x, 0);
}

// Sum of values in dealer's card array while "card in the hole" has NOT been revealed
function getShownDealerSum() {
    return dealerValues.reduce((shownDealerSum, x,) => shownDealerSum + x, 0);
}

//Calculates and prints the player's sum
function cardCalculate() {
    const playerSum = getPlayerSum();
    cardValues.join('');
    text(cardValues.join(' '), 50, 700); // Prints string of Values from card array
    text(playerSum, 513, 710); // Prints sum of player's card array
}

//calculates and prints the dealer sum while 'card in the hole' has NOT been revealed
function dealerCalculate() {
    const playerSum = getPlayerSum(); //gets the sums for the player, dealer, and dealer's true sum
    const dealerSum = getDealerSum();
    const shownDealerSum = getShownDealerSum();
    text(dealerValues.join(' '), 265, 245); // Prints string of dealer's card array
    sumReveal = shownDealerSum
    if (cardValues.length === 3 && playerSum > dealerSum && dealerSum < 16) {
        // If the player has drawn 3 cards and the dealer's number is lower, the dealer draws
        dealerCard();
        if (dealerSum < 16) {
            // If the dealer's sum is still under 16, the dealer draws
            dealerCard();
        }
    }
}

// Function for when dealer draws a card
function dealerCard() {
    dealerValues.push(int(random(1, 11))); // Dealer draws card
    calculateState(); // Calculates win or lose condition
}

// Checks when player decides to stand
function checkStandOverlap() {
    const playerSum = getPlayerSum(); //gets the sums for the player and dealer's true sum
    const dealerSum = getDealerSum();
    const d = dist(frog.tongue.x, frog.tongue.y, standTarget.x, standTarget.y);
    const standing = (d < frog.tongue.size / 2 + standTarget.sizeY); //calculates the same as the flies
    if (standing) {
        /**
         * sends frog tongue back, and turns it idle to prevent stand button from being hit multiple times
         */
        frog.tongue.y = 560
        frog.tongue.state = "idle";
        flies.forEach(fly => {
            resetFly(fly); // resets all flies
        })
        cardReveal = hiddenDealerCard.join(' '); // reveals card in the hole
        sumReveal = dealerSum // reveals true sum of dealer now including card in the hole
        if (dealerSum < 16 && dealerSum < playerSum) {
            dealerCard(); //if the dealer's sum is still under 16 when stand target is hit, they draw a card
        }
        else if (dealerSum > 21) {
            screenText = 'Dealer Bust!'
            // If dealer's cards are over 21, player wins
            bank.total += (bank.bet * 0.5);
            gameState = GAME_WON;
        }
        else if (playerSum === dealerSum) {
            // if sums are equal, it's a push
            screenText = 'Push!'
            gameState = GAME_TIE;
        }
        else if (playerSum > dealerSum) {
            // if player's sum is greater than dealer's, they win
            screenText = 'Win!'
            bank.total += (bank.bet * 0.5);
            gameState = GAME_WON;
        }
        else if (playerSum < dealerSum) {
            //if player's sum is less than dealer, they lose
            screenText = 'Lost!'
            bank.total -= bank.bet;
            gameState = GAME_LOST;
        }
    }
}

//Calculates win and lose conditions for when game is active
function calculateState() {
    const playerSum = getPlayerSum(); //gets sums
    const dealerSum = getDealerSum();
    const shownDealerSum = getShownDealerSum();
    if (playerSum > 21) {
        // If playerSum of card array is greater than 21, player loses
        screenText = 'Bust!'
        bank.total -= bank.bet; // subtracts bet from bank
        gameState = GAME_LOST;
    }
    else if (shownDealerSum > 21) {
        // If dealer's shown cards are over 21, player wins
        //This is also useful so that the dealer can't bust while the card in the hole is hidden, unless the shown cards are higher than 21
        screenText = 'Dealer Bust!'
        bank.total += bank.bet * 0.5; // gives bet + half back to bank
        gameState = GAME_WON;
    }
    else if (cardValues.length === 5) {
        // If player has drawn 5 cards without going over 21, player wins
        screenText = 'Five-card Charlie!'
        bank.total += bank.bet * 0.5; // gives bet + half back to bank
        gameState = GAME_WON;
    }
}