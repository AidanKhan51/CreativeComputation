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
    aimBlue = loadImage('assets/images/aimBlue.png');
    aimRed = loadImage('assets/images/aimRed.png');
    dartBlue = loadImage('assets/images/dartBlue.png');
    dartRed = loadImage('assets/images/dartRed.png');
    dartUpBlue = loadImage('assets/images/dartUpBlue.png');
    dartUpRed = loadImage('assets/images/dartUpRed.png');
    dartboard = loadImage('assets/images/dartboard.png');
}

/**
 * My Setup
*/
function setup() {
    populateRed();
    populateBlue();
    createCanvas(800, 800);
    playerTurn = BLUE;
    textFont(font);
    textSize(30);
    imageMode(CENTER);
}

/**
 * My Draw
*/
function draw() {
    background("black");
    drawDartboard();
    checkTurn();
    roundDisplay();
    drawDarts();
    drawCrosshair();
    redScore();
    blueScore();
    dartDisplay();
    resetBoard();
}

function resetBoard() {
    if ((redDarts.length === 3) && (blueDarts.length === 3)) {
        populateRed();
        populateBlue();
        redDarts = []
        blueDarts = []
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
    console.log(blueDarts)
    console.log(redDarts)
}

function roundDisplay() {
    if (playerTurn === BLUE) {
        push();
        fill('blue');
        text('BLUE Turn', 50, 50);
        pop();
    }
    else if (playerTurn === RED) {
        push();
        fill('red');
        text(' RED Turn', 50, 50);
        pop();
    }
}

function addDartBlue() {
    calculateX = mouseX
    calculateY = mouseY
    blueDarts.push(new Dart(calculateX, calculateY));
}

function addDartRed() {
    calculateX = mouseX
    calculateY = mouseY
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
        push();
        image(aimBlue, mouseX, mouseY, 70, 70);
        pop();
    }
    else if (playerTurn === RED) {
        push();
        image(aimRed, mouseX, mouseY, 70, 70);
        pop();
    }
}

function drawDartboard() {
    push();
    image(dartboard, 400, 400, 600, 600);
    pop();
}

function redScore() {
    push();
    fill('white')
    textSize(50);
    text(score.red, 700, 700);
    pop();
}

function blueScore() {
    push();
    fill('white')
    textSize(50);
    text(score.blue, 30, 700);
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
    blueDartCounter.push(new Darticon(40, 770));
    blueDartCounter.push(new Darticon(70, 770));
    blueDartCounter.push(new Darticon(100, 770));
}

function populateRed() {
    redDartCounter.push(new Darticon(770, 770));
    redDartCounter.push(new Darticon(740, 770));
    redDartCounter.push(new Darticon(710, 770));
}

