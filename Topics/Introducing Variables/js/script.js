/**
 * Introducing Variables
 * Aidan Khan
 * 
 * Learning about variables
 * Please add a grade
 */

"use strict";

/**
 * Create Canvas
*/
function setup() {

    createCanvas(640, 640);
}



/**
 * Draws circle in center of canvas
*/
function draw() {

    background(0);

    //draw a circle
    push();
    fill(MouseX,MouseY,0);
    noStroke();
    ellipse(width/2, height/2, MouseX, MouseY);
    Pop();
}