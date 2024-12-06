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
const BLUE = 1;
const RED = 2;


let dartsOne = [
]

let dartsTwo = [

]

class Dart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function preload() {
    // turn data into variable
    dartsData = loadJSON("assets/data/darts.json");
}

/**
 * My Setup
*/
function setup() {
    createCanvas(800, 800);
    playerTurn = BLUE;
}

/**
 * My Draw
*/
function draw() {
    background("black");
    checkTurn();
    roundDisplay();
    drawDarts();
}

function checkTurn() {
    if (dartsTwo.length === (dartsOne.length)) {
        playerTurn = BLUE;
    }
    else if (dartsOne.length === (dartsTwo.length + 3)) {
        playerTurn = RED;
    }
}

function mouseClicked() {
    switch (playerTurn) {
        case BLUE:
            addDartBlue();
            console.log(dartsOne[0], dartsOne[1], dartsOne[2])
            console.log(dartsOne.length)
            break;
        case RED:
            addDartRed();
            console.log(dartsTwo[0], dartsTwo[1], dartsTwo[2])
            console.log(dartsTwo.length)
            break;
    }
}

function roundDisplay() {
    if (playerTurn === BLUE) {
        push();
        fill('blue');
        textSize(20);
        text('BLUE Turn', 50, 50);
        pop();
    }
    else if (playerTurn === RED) {
        push();
        fill('red');
        textSize(20);
        text(' RED Turn', 50, 50);
        pop();
    }
}

function addDartBlue() {
    calculateX = mouseX
    calculateY = mouseY
    dartsOne.push(new Dart(calculateX, calculateY));
}

function addDartRed() {
    calculateX = mouseX
    calculateY = mouseY
    dartsTwo.push(new Dart(calculateX, calculateY));
}

function drawDarts() {
    dartsOne.forEach(dart => {
        push();
        noStroke();
        fill("blue");
        ellipse(dart.x, dart.y, 50)
        pop();
    });
    dartsTwo.forEach(dart => {
        push();
        noStroke();
        fill("red");
        ellipse(dart.x, dart.y, 50)
        pop();
    });
}