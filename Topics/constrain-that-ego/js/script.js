/**
 * Constrain that Ego!
 * Pippin Barr & Aidan Khan
 * 
 * This ego is out of control...
 */

"use strict";

// My ego
let ego = {
    x: 200,
    y: 200,
    size: 1,
    fill: 200,
    minSize: 0,
    maxSize: 400
};

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Updates (expands and darkens) and displays the ego
 */
function draw() {
    // Pink background
    background(255, 200, 200);

    // Update the ego
    // Fill gets darker, symbolizing the negative energy
    ego.fill = ego.fill - 0.5;
    // Size gets bigger, symbolizing taking up emotional space
    ego.size = ego.size + 1;
    ego.size = constrain(ego.size, ego.minSize, ego.maxSize);

    // Draw the ego
    push();
    noStroke();
    fill(ego.fill);
    ellipse(ego.x, ego.y, ego.size);
    pop();
}