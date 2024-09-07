/**
 * The House of House
 * Pippin Barr & Aidan Khan
 * 
 * Draws a house (for the doctor) with shapes.
 * 
 * Disclaimer: Not actually my house. It is the doctor's.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

/**
 * Creates the canvas
 */



function preload() {

    img = loadImage('/assets/images/House.png');

}

function setup() {
    createCanvas(640, 480);
}




/**
 * Draws a house
 */
function draw() {


    // The sky
    background(150, 200, 250);

    drawCloud();

    drawGround();

    drawHouse();

    drawRuff();

    drawDrHouse();

    drawWindow();

    drawDoor();



}

/**
 * Draws a cloud to block the sun
 * 
 */

function drawCloud() {

    // A cloud
    push();
    noStroke();
    // Note: using a single number for a colour will be greyscale
    // (As if you used the same number for R, G, and B)
    // So this is white:
    fill(255);
    ellipse(100, 100, 100, 100);
    ellipse(180, 80, 100, 100);
    ellipse(160, 120, 60, 60);
    ellipse(190, 130, 60, 60);
    ellipse(220, 120, 60, 60);
    pop();

}

/**
 * Draws a ground for doc House to stand upon
 */

function drawGround() {

    // The ground
    push();
    noStroke();
    fill(200);
    rect(0, 400, 640, 480);
    pop();

}

/**
 * Draws the main body of the house for the doctor
 */

function drawHouse() {

    // The main body of the house
    push();
    noStroke();
    fill(250, 250, 200);
    rect(200, 240, 280, 180);
    pop();

}

/** 
 * If you're looking for Mine, he's on the ruff
 */

function drawRuff() {

    // The roof
    push();
    noStroke();
    // You can also write colors in hex code in quote marks
    fill("#dc143c");
    triangle(180, 240, 340, 120, 500, 240);
    pop();

}

/**
 * Draws a window for house to look out of
 */

function drawWindow() {

    // A window
    push();
    // You can also write colour names from the CSS standard in quotes
    // https://www.w3.org/wiki/CSS/Properties/color/keywords
    stroke("deeppink");
    strokeWeight(5);
    noFill();
    rect(220, 260, 80, 80);
    pop();
}

/**
 * MORE MOUSE BITES!!!
 */

function drawDrHouse() {

    //The doctor
    push();
    image(img, 220, 260, 80, 80);
    pop();


}

/**Draws a door for doc house to leave and enter through */

function drawDoor() {

    // An entrace

    // The door
    push();
    noStroke();
    fill(0, 128, 0);
    rect(320, 300, 80, 120);
    pop();

    // The doorknob
    push();
    noStroke();
    fill(255, 215, 0);
    ellipse(340, 360, 10, 10);
    pop();

}
