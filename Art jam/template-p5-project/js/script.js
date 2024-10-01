/**
 * Too Slow!
 * Aidan Khan
 * 
 * One must image sisyphus giving a high five.
 * 
 */

"use strict";

let img1, img2, img3, img4;
let font;

// Load the images and fonts
function preload() {
    img1 = loadImage('assets/images/STYLEHAND.png');
    img2 = loadImage('assets/images/Layer1.png');
    img3 = loadImage('assets/images/Layer2.png');
    img4 = loadImage('assets/images/Layer3.png');
    font = loadFont('assets/Team-Fury.ttf');

}


const handsFront = [{


    x: 700,
    y: 680,

}, {

    x: 1200,
    y: 680,

}]

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
 * Sets up canvas
*/
function setup() {

    createCanvas(1920, 1080)

}




/**
 * Does the things
*/
function draw() {

    background(50)

    drawBackground();
    updateHandPosition();
    drawHandBack();
    drawMidground();
    drawHandFront();
    drawForeground();
    click();



}

function drawBackground() {

    image(img4, 50, 60, 1824, 1026);



}

function drawMidground() {
    image(img3, 50, 60, 1824, 1026);
}

function updateHandPosition() {
    handsFront.forEach(function (hand) {
        if (dist(hand.x, 0, mouseX, 0) < TRIGGERDISTANCE) {
            hand.y = Math.max(mouseY + 215, 680);
        }
    });

    handsBack.forEach(function (hand) {
        if (dist(hand.x, 0, mouseX, 0) < TRIGGERDISTANCE) {
            hand.y = Math.max(mouseY + 215, 500);
        }
    });
}

function drawHandFront() {

    push();
    imageMode(CENTER);
    handsFront.forEach(function (hand) {
        image(img1, hand.x, hand.y, 450, 450);
    })
    pop();

}

function drawHandBack() {

    push();
    imageMode(CENTER);
    handsBack.forEach(function (hand) {
        image(img1, hand.x, hand.y, 450, 450);
    })
    pop();

}

function drawForeground() {
    image(img2, 50, 60, 1824, 1026);

}

function click() {

    if (mouseIsPressed === true) {
        textFont(font);
        fill('#960000');
        textAlign(CENTER)
        textSize(100);
        text('TOO SLOW.', mouseX, mouseY);

    }
}