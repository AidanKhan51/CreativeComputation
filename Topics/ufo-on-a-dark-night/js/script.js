/**
 * UFO on a Dark Night
 * Pippin Barr & Aidan Khan
 * 
 * A UFO. On a dark night. It just sits there?
 */

"use strict";

// Our UFO
let ufo = {
    // Position
    x: 200,
    y: 375,
    // Dimensions
    width: 150,
    height: 50,
    // Fill colour (greyscale)
    fill: 255
};

// Shade to fill the sky (background)
let skyShade = 0;

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}

/**
 * Displays a UFO
*/
function draw() {
    //dawn
    skyShade = skyShade + 1;
    // Display the sky
    background(skyShade);

    //Move UFO
    ufo.x = ufo.x + 0.5;
    ufo.y = ufo.y - 2;

    //change fill
    ufo.fill = ufo.fill * 0.995;

    //change dimensions
    ufo.width = ufo.width / 1.005;

    ufo.height = ufo.height / 1.005;

    // Draw the UFO based on its properties
    push();
    fill(ufo.fill);
    noStroke();
    ellipse(ufo.x, ufo.y, ufo.width, ufo.height);
    pop();
}