/**
 * Dart Defender
 * Aidan Khan
 * 
 */
"use strict";
//determines when game is active
let dartDefenderOn = false;
let lives = 3;
let remainingDarts = 10;

let attackers = []

function drawnDartMax() {
    if ((blueDarts.length > 3)) {
        blueDarts.shift();
    }
}

function displayLives() {
    push();
    image(dartUpBlue, 520, 750, 50, 50);
    pop();
    push();
    textAlign(LEFT)
    textSize(30)
    text(' X ' + lives, 550, 770)
    pop();
}

function displayRemainingDarts() {
    push();
    image(dartUpBlue, 665, 750, 50, 50);
    pop();
    push();
    textAlign(LEFT)
    textSize(30)
    text(' X ' + remainingDarts, 685, 770)
    pop();
}