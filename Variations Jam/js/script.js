/**
 * Dartmaster
 * Aidan Khan
 * 
 * Welcome to the Dart dome
 * 
 */

"use strict";
let dartsData;
let playerTurn;
let calculateX;
let calculateY;
let textTurn;
let font;
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
let thumbHeight = 0;
let thumbDown = false;
let slowFrame = 0
let game = true;
let thrown = false;
let hand;

const BLUE = 1;
const RED = 2;

let blueDarts = [
]

let redDarts = [
]

let redDartCounter = [
]

let blueDartCounter = [
]

const score = {
    blue: 300,
    red: 300
}

class Dart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Darticon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function preload() {
    // turn data into variable
    dartsData = loadJSON("assets/data/darts.json");
    font = loadFont('assets/fonts/DotGothic.ttf');
    aimBlue = loadImage('assets/images/armBlue.png');
    aimRed = loadImage('assets/images/armRed.png');
    dartBlue = loadImage('assets/images/dartBlue.png');
    dartRed = loadImage('assets/images/dartRed.png');
    dartUpBlue = loadImage('assets/images/dartUpBlue.png');
    dartUpRed = loadImage('assets/images/dartUpRed.png');
    dartboard = loadImage('assets/images/dartboard.png');
    border = loadImage('assets/images/dartborder.png');
    barImg = loadImage('assets/images/bar.png');
    thumbImg = loadImage('assets/images/thumb.png');
    hand = loadImage('assets/images/thrown.png');
}

/**
 * My Setup
*/
function setup() {
    noCursor();
    populateRed();
    populateBlue();
    createCanvas(800, 800);
    playerTurn = BLUE;
    textFont(font);
    textSize(30);
    imageMode(CENTER);
    rectMode(CENTER);
}

/**
 * My Draw
*/
function draw() {
    background('black')
    drawDartboard();
    checkTurn();
    roundDisplay();
    drawDarts();
    dartDisplay();
    drawCrosshair();
    drawPowerBar();
    redScore();
    blueScore();
    resetBoard();
    image(border, 400, 400, 800, 800)
}

function resetBoard() {
    if ((redDarts.length === 3) && (blueDarts.length === 3)) {
        push();
        if (game === true) {
            game = false;
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
    if (game === false) {
        populateRed();
        populateBlue();
        redDarts = []
        blueDarts = []
    }
    if (game === false) {
        game = true;
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
    if (game === true) {
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
    const blueCross = {
        x: mouseX + 20,
        y: mouseY + 50,
    }
    if (playerTurn === BLUE) {
        if (thrown === true) {
            image(hand, blueCross.x, blueCross.y, 250, 250);
        } else {
            image(aimBlue, blueCross.x, blueCross.y, 250, 250);
        }
    }
    else if (playerTurn === RED) {
        if (thrown === true) {
            image(hand, blueCross.x, blueCross.y, 250, 250);
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
    text(score.blue, 40, 700);
    pop();
}

function redScore() {
    push();
    fill('white')
    textSize(60);
    text(score.red, 670, 700);
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
    blueDartCounter.push(new Darticon(55, 730));
    blueDartCounter.push(new Darticon(85, 730));
    blueDartCounter.push(new Darticon(115, 730));
}

function populateRed() {
    redDartCounter.push(new Darticon(745, 730));
    redDartCounter.push(new Darticon(715, 730));
    redDartCounter.push(new Darticon(685, 730));
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
    if (thumbHeight >= 75)
        thumbDown = true;
    else if (thumbHeight <= -75)
        thumbDown = false;

    if (thumbDown)
        thumbHeight -= 5;
    else
        thumbHeight += 5;
}

