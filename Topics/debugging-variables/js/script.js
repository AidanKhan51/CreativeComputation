/**
 * Debugging Variables
 * Pippin Barr & Aidan Khan 
 * 
 * Displays a bug that moves across the screen. But it doesn't work.
 * Because it has bugs. Not for long!
 */

"use strict";

const bgColor = "#87ceeb"; // Sky blue

// The bug
const bug = {
    // Position and dimensions
    x: 250,
    y: 0,
    w: 20,
    h: 30,

    // Movement
    velocity: {
        x: 0,
        y: 12
        // Starts moving down
    },
    // Colour
    color: "#874444" // Dark brown

};
/**
 * Create the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Updates and draws the bug
*/
function draw() {
    background(bgColor);

    moveBug();
    drawBug();
}

function moveBug() {
    bug.x = bug.x + bug.velocity.x;
    bug.y = bug.y + bug.velocity.y;
}

/**
 * Displays the bug with its six legs sticking out
 */
function drawBug() {
    // Body
    push();
    noStroke();
    fill(bug.color);
    ellipse(bug.x, bug.y, bug.w, bug.h);
    pop();

    // Legs
    push();
    stroke(bug.color);
    // Thicken the legs a bit
    strokeWeight(2);
    // Three lines horizontally across the body at different heights for the legs
    line(bug.x - bug.w, bug.y - bug.h / 4, bug.x + bug.w, bug.y - bug.h / 4);
    line(bug.x - bug.w, bug.y, bug.x + bug.w, bug.y);
    line(bug.x - bug.w, bug.y + bug.h / 4, bug.x + bug.w, bug.y + bug.h / 4);
    pop();
}