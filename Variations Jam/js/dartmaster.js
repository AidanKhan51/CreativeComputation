/**
 * Dartmaster
 * Aidan Khan
 * 
 * Welcome to the Dart dome
 * 
 */

"use strict";
//Variable that switches between BLUE and RED player's turns
let playerTurn;
//Variables that calculate the X and Y of the dart based on the mouse position + how accurate their shot was
let calculateX;
let calculateY;
//font for text
let font;
//image variables
let aimBlue;
let aimRed;
let dartBlue;
let dartRed;
let dartUpBlue;
let dartUpRed;
let dartboard;
let barImg;
let thumbImg;
let border;
let hand;
//height of thumb on the power meter determines "accuracy" of shot
let thumbHeight = 0;
//Variable that switches the thumb up or down the power meter
let thumbDown = false;
//variable that declares when the game is active
let gameOn = false;
//variable that declares when the dart has been thrown, so that the hand image can alternate
let thrown = false;

//cases for playerTurn, which determines which player's turn it is
const BLUE = 1;
const RED = 2;

//Array that stores blue team's thrown darts
let blueDarts = [
]
//Same as above, just for red player
let redDarts = [
]
//Array that stores the images for the dart icons at the bottom of the screen. These show how many darts you have remaining
let blueDartCounter = [
]
//Same as above, just for red player
let redDartCounter = [
]

//stores player scores of game, starting from 300
const score = {
    blue: 300,
    red: 300
}

//Dart that gets pushed into array
class Dart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//Dart icon to display how many darts you have left in your turn
class Darticon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function resetBoard() {
    if ((redDarts.length === 3) && (blueDarts.length === 3)) {
        push();
        if (gameOn === true) {
            gameOn = false;
        }
        pop();
        push();
        fill('white');
        textSize(50);
        text('Next Round', 265, 750);
        pop();
        setTimeout(resetDarts, 2000);
    }
}

function resetDarts() {
    if (gameOn === false) {
        populateRed();
        populateBlue();
        redDarts = []
        blueDarts = []
    }
    if (gameOn === false) {
        gameOn = true;
    }
}

function checkTurn() {
    if (redDarts.length === (blueDarts.length)) {
        playerTurn = BLUE;
    }
    else if (blueDarts.length === (redDarts.length + 3)) {
        playerTurn = RED;
    }
}

function mouseClicked() {
    thrown = true;
    setTimeout(resetHand, 700);
    if (gameOn === true) {
        switch (playerTurn) {
            case BLUE:
                addDartBlue();
                blueDartCounter.shift();
                break;
            case RED:
                addDartRed();
                redDartCounter.shift();
                break;
        }
    }
    else if (gameState === menu) {
        addDartBlue();
    }
}

function resetHand() {
    thrown = false;
}

function roundDisplay() {
    if (playerTurn === BLUE) {
        push();
        fill('blue');
        textSize(50);
        text('BLUE Turn', 25, 65);
        pop();
    }
    else if (playerTurn === RED) {
        push();
        fill('red');
        textSize(50);
        text(' RED Turn', 545, 65);
        pop();
    }
}

function addDartBlue() {
    calculateX = mouseX
    calculateY = mouseY + thumbHeight;
    blueDarts.push(new Dart(calculateX, calculateY));
}

function addDartRed() {
    calculateX = mouseX
    calculateY = mouseY + thumbHeight;
    redDarts.push(new Dart(calculateX, calculateY));
}

function drawDarts() {
    blueDarts.forEach(dart => {
        push();
        noStroke();
        fill("blue");
        image(dartBlue, dart.x, dart.y, 50, 50)
        pop();
    });
    redDarts.forEach(dart => {
        push();
        noStroke();
        fill("red");
        image(dartRed, dart.x, dart.y, 50, 50)
        pop();
    });
}

function drawCrosshair() {
    if (playerTurn === BLUE) {
        if (thrown === true) {
            image(hand, mouseX + 20, mouseY + 50, 250, 250);
        } else {
            image(aimBlue, mouseX + 20, mouseY + 50, 250, 250);
        }
    }
    else if (playerTurn === RED) {
        if (thrown === true) {
            image(hand, mouseX + 20, mouseY + 50, 250, 250);
        }
        else {
            image(aimRed, mouseX + 20, mouseY + 50, 250, 250);
        }
    }
}

function drawDartboard() {
    push();
    image(dartboard, 400, 400, 672, 592);
    pop();
}

function blueScore() {
    push();
    fill('white')
    textSize(60);
    text(score.blue, 40, 720);
    pop();
}

function redScore() {
    push();
    fill('white')
    textSize(60);
    text(score.red, 670, 720);
    pop();
}

function dartDisplay() {
    blueDartCounter.forEach(darticon => {
        push();
        image(dartUpBlue, darticon.x, darticon.y, 50, 50);
        pop();
    });
    redDartCounter.forEach(darticon => {
        push();
        image(dartUpRed, darticon.x, darticon.y, 50, 50);
        pop();
    });
}

function populateBlue() {
    blueDartCounter.push(new Darticon(55, 750));
    blueDartCounter.push(new Darticon(85, 750));
    blueDartCounter.push(new Darticon(115, 750));
}

function populateRed() {
    redDartCounter.push(new Darticon(745, 750));
    redDartCounter.push(new Darticon(715, 750));
    redDartCounter.push(new Darticon(685, 750));
}

function drawPowerBar() {
    const thumb = {
        x: mouseX + 130,
        y: (mouseY + 80) + thumbHeight,
        w: 20,
        h: 10
    }
    const bar = {
        x: mouseX + 130,
        y: mouseY + 80,
        w: 20,
        h: 150
    }
    push();
    image(barImg, bar.x, bar.y, bar.w, bar.h);
    pop();
    push();
    image(thumbImg, thumb.x, thumb.y, thumb.w, thumb.h);
    pop();
    console.log(thumb)
    if (thumbHeight >= 75)
        thumbDown = true;
    else if (thumbHeight <= -75)
        thumbDown = false;

    if (thumbDown)
        thumbHeight -= 5;
    else
        thumbHeight += 5;
}

