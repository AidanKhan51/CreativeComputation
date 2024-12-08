/**
 * Darts Menu
 * Aidan Khan
 * 
 */

"use strict";
//JSON data
let dartsData;
//variable that determines what game you're playing
let gameState;
//cases for gameState
const menu = 1;
const dartmaster = 2;
const dartdefender = 3;
const dartslayer = 4;

//preload for images and data
function preload() {
    // JSON data
    dartsData = loadJSON("assets/data/darts.json");
    //images
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
 * changes gameState to the menu case
 * removes cursor visibility within canvas
 * populates the Red and Blue dart icons in dartmaster
 * creates canvas
 * changes the player turn to the blue player's turn
 * sets up font for text
 * sets default text size
 * sets image and rectangle mode to center
*/
function setup() {
    gameState = menu;
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


//For every gameState case
function draw() {
    switch (gameState) {
        /** * Menu 
        * Menu for selecting game. Throw darts at game name to select said game
        * draws darts, hand crosshair, and power meter to throw darts
        */
        case menu:
            background('black')
            title();
            let button = createButton('menu');
            button.position(700, 840);
            button.mousePressed(delayMenu);
            let button2 = createButton('darts');
            button2.position(750, 840);
            button2.mousePressed(delayDartMaster);
            drawDarts();
            drawCrosshair();
            drawPowerBar();
            image(border, 400, 400, 800, 800)
            break;
        /** * Dartmaster
        * who up darting they master
        */
        case dartmaster:
            background('black')
            drawDartboard();
            checkTurn();
            roundDisplay();
            drawDarts();
            dartDisplay();
            redScore();
            blueScore();
            drawCrosshair();
            drawPowerBar();
            resetBoard();
            image(border, 400, 400, 800, 800)
            break;
        /** * Dartdefender
        * 
        */
        case dartdefender:
            break;
        /** * Dartslayer
        * 
        */
        case dartslayer:
            break;
    }
}

function delayDartMaster() {
    setTimeout(dartMaster, 700)
}

function delayMenu() {
    setTimeout(menuChange, 700)
}

function dartMaster() {
    blueDartCounter = []
    redDartCounter = []
    populateRed();
    populateBlue();
    redDarts = []
    blueDarts = []
    gameState = dartmaster;
    gameOn = true;
}

function menuChange() {
    blueDarts = []
    redDarts = []
    gameState = menu;
    gameOn = false;
}

function title() {
    push();
    fill('white');
    textSize(80);
    text('CART DART©', 220, 200);
    pop();
    push();
    fill('white');
    textSize(20);
    text("Aidan's world famous", 225, 120);
    pop();
    push();
    fill('white');
    textSize(20);
    text("est. 2024", 225, 230);
    pop();
}
