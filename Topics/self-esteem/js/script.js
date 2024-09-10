/**
 * Self-Esteem
 * Pippin Barr & Aidan Khan
 * 
 * A portrait of Pippin's self-esteem on a sunny day.
 */

"use strict";

// Colour of the sky
let sky = {

red: 150,
green: 180,
blue: 250

};

// The sun
let sun = {

    let fill = {
        red: 255,
        green: 255,
        blue: 0

    },
x: 500,
y: 70,
size: 100

};

let selfEsteem = {

shade: 0,
x: 320,
y: 320,
size: 20

};

/**
 * Create the canvas
 */
function setup() {
    // Create the canvas
    createCanvas(640, 320);
}

/**
 * Displays the sky, sun, and self-esteem
 */
function draw() {
    // A nice blue sky
    background(sky.red, sky.green, sky.blue);

    // The sun
    push();
    fill(sun.fill.red, sun.fill.green, sun.fill.blue);
    noStroke();
    ellipse(sun.x, sun.y, sun.size);
    pop();

    // My self esteem
    push();
    fill(selfEsteem.shade);
    noStroke();
    ellipse(selfEsteem.x, selfEsteem.y, selfEsteem.size);
    pop();
}