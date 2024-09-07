/**
 * Evil Vinyl that kills you
 * Aidan Khan
 * 
 * Evil Vinyl that will kill you, please beware
 * please add a grade 
 */

"use strict";

/**
 * Creates canvas for the evil vinyl that kills you
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Desplays evil vinyl that can kill you
*/
function draw() {

    //grey background for killer evil vinyl
    background(150);

    //red body for evil vinyl and white outline that can kill you btw
    push();
    fill(255, 0, 0);
    stroke(255);
    ellipse(320, 320, 480);
    pop();

    //white label at center of the evil killer vinyl
    push();
    fill("white");
    noStroke();
    ellipse(320, 320, 140)
    pop();

    //center killer donut hole for the dubious vinyl
    push();
    fill("#000000")
    noStroke();
    ellipse(320, 320, 20);
    pop();
}