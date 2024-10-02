/**
 * Too Slow!
 * Aidan Khan
 * 
 * One must imagine tantalus giving a high five.
 * Gimme a high five! Or try your best I guess...
 */

"use strict";

let img1, img2, img3, img4;
let font;
let gif;

// Load the images, gifs and fonts
function preload() {
    img1 = loadImage('assets/images/STYLEHAND.png');
    img2 = loadImage('assets/images/Layer1.png');
    img3 = loadImage('assets/images/Layer2.png');
    img4 = loadImage('assets/images/Layer3.png');
    font = loadFont('assets/Team-Fury.ttf');
    gif = loadImage('assets/images/Background.gif')

}

//variable to slow the text "TOO SLOW" when mouse is pressed
let slowFrame = 0

//Array for the hands in the foreground
const handsFront = [{


    x: 700,
    y: 680,

}, {

    x: 1200,
    y: 680,

}]

//Array for the hands in the midground
const handsBack = [{


    x: 595,
    y: 500,

}, {

    x: 950,
    y: 500,

}, {

    x: 1295,
    y: 500,
}]


//The distance between the hand and the mouse where the hand starts moving
const TRIGGERDISTANCE = 300

/**
 * Sets up canvas and framerate
*/
function setup() {

    createCanvas(1920, 1080)
    frameRate(60);
}




/**
 * Draws all functions
*/
function draw() {

    background(50)
    //sets up background gif
    image(gif, 0, 0);
    //draws the 3rd layer of the 3D model
    drawBackground();
    //calculates distance between mouse and hands
    updateHandPosition();
    //draws the hands in the midground 
    drawHandBack();
    //draws the 2nd layer of the 3D model
    drawMidground();
    //draws the hands in the foreground
    drawHandFront();
    //draws the first layer of the 3D model
    drawForeground();
    //function for when mouse is pressed
    click();



}

//draws the 3rd layer of the 3D model
function drawBackground() {
    image(img4, 50, 60, 1824, 1026);
}

//draws the 2nd layer of the 3D model
function drawMidground() {
    image(img3, 50, 60, 1824, 1026);
}

//draws the first layer of the 3D model
function drawForeground() {
    image(img2, 50, 60, 1824, 1026);

}

//calculates distance between mouse and hands
function updateHandPosition() {
    //for hands in foreground
    handsFront.forEach(function (hand) {
        /**
         * For each hand in the array, if the distance between
         * the mouse's X and Y and the Hand's X and Y is
         * less than the trigger distance variable,
         * the hand will move down according to the distance of the mouse
         */
        if (dist(hand.x, 0, mouseX, 0) < TRIGGERDISTANCE) {
            hand.y = Math.max(mouseY + 215, 680);
        }
    });
    //for hands in midground
    handsBack.forEach(function (hand) {
        //same as above
        if (dist(hand.x, 0, mouseX, 0) < TRIGGERDISTANCE) {
            hand.y = Math.max(mouseY + 215, 500);
        }
    });
}

//draws the hands in the foreground
function drawHandFront() {

    push();
    imageMode(CENTER);
    handsFront.forEach(function (hand) {
        image(img1, hand.x, hand.y, 450, 450);
    })
    pop();

}

//draws the hands in the midground
function drawHandBack() {

    push();
    imageMode(CENTER);
    handsBack.forEach(function (hand) {
        image(img1, hand.x, hand.y, 450, 450);
    })
    pop();

}

//function for when mouse is clicked
function click() {

    //Map that makes the text become more red the further down the mouse is
    let textHueR = map(mouseY, 0, 1080, 50, 255);
    /**
     * when mouse is pressed, show text saying "TOO SLOW"
     * at cursor and wait 60 frames
    */
    if (mouseIsPressed || slowFrame) {
        textFont(font);
        fill(textHueR, 0, 0);
        textAlign(CENTER)
        textSize(70);
        text('TOO SLOW', mouseX, mouseY);
        if (mouseIsPressed) {

            slowFrame = 59
        }
        else {

            slowFrame--
        }
    }

    //Otherwise, show text "Score: 0, click to high five" at mouse position
    else {


        textFont(font);
        fill(textHueR, 0, 0);
        textAlign(CENTER)
        textSize(70);
        text('SCORE 0', mouseX, mouseY);
        textSize(20);
        text('click to high five', mouseX, mouseY + 30);
    }
}

//and that's it.