/**
 * Creating variables
 * Aidan Khan
 * 
 * Creating variables practice
 * add a grade please
 */

"use strict";

///variables
let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade = 0;
let holeSize = 120;
let holeX = 140;
let holeY = 175;

/**
 * Creates canvas
*/
function setup() {

createCanvas(480, 480);

}


/**
 * draws hole in piece of cheese
*/
function draw() {

    ///the cheese
    background(255, 255, 0)


///the hole
push();
noStroke();
fill(holeShade);
ellipse(holeX, holeY, holeSize)
Pop();

}