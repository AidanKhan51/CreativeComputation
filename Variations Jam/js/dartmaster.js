/**
 * Dartmaster
 * Aidan Khan
 * 
 * Welcome to the Dart dome
 * 
 */

"use strict";
//Variable that switches between BLUE and RED player's turns
let playerTurn;
//Variables that calculate the X and Y of the dart based on the mouse position + how accurate their shot was
let calculateX;
let calculateY;
//font for text
let font;
//image variables
let aimBlue;
let aimRed;
let dartBlue;
let dartRed;
let dartUpBlue;
let dartUpRed;
let dartboard;
let barImg;
let thumbImg;
let border;
let hand;
//height of thumb on the power meter determines "accuracy" of shot
let thumbHeight = 0;
//Variable that switches the thumb up or down the power meter
let thumbDown = false;
//variable that declares when the game is active
let dartMasterOn = false;
//variable that declares when the dart has been thrown, so that the hand image can alternate
let thrown = false;

//cases for playerTurn, which determines which player's turn it is
const BLUE = 1;
const RED = 2;

//Array that stores blue team's thrown darts
let blueDarts = [
]
//Same as above, except for red player
let redDarts = [
]
//Array that stores the images for the dart icons at the bottom of the screen. These show how many darts you have remaining
let blueDartCounter = [
]
//Same as above, except for red player
let redDartCounter = [
]

//stores player scores of game, starting from 300
const score = {
    blue: 300,
    red: 300
}

//Dart that gets pushed into array
class Dart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//Dart icon to display how many darts you have left in your turn
class Darticon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//reset board and start next round when both players have 3 darts on the board
function resetBoard() {
    if ((redDarts.length === 3) && (blueDarts.length === 3)) {
        push();
        //pauses some game functions temporarily
        if (dartMasterOn === true) {
            dartMasterOn = false;
        }
        pop();
        //displays "next round"
        push();
        fill('white');
        textSize(50);
        text('Next Round', 400, 765);
        pop();
        //Wait 2 seconds before next round begins
        setTimeout(resetDarts, 2000);
    }
}

function resetDarts() {
    //populates dart icons (the ones that show how many darts you have left) and clears dart arrays to wipe the board
    if (dartMasterOn === false) {
        populateRed();
        populateBlue();
        redDarts = []
        blueDarts = []
    }
    //restarts game function
    if (dartMasterOn === false) {
        dartMasterOn = true;
    }
}
/** changes player turn by checking length of dart arrays. 
 * If the length of blue has the same length as red with +3 darts,
 * that means that the blue array has 3 darts in it. This then changes it to red's turn*/
function checkTurn() {
    if (redDarts.length === (blueDarts.length)) {
        playerTurn = BLUE;
    }
    else if (blueDarts.length === (redDarts.length + 3)) {
        playerTurn = RED;
    }
}

//resets hand icon back to holding a dart (after 0.7 seconds, as explained in the mouseClicked function)
function resetHand() {
    thrown = false;
}

//displays which player's turn it is at top of screen
function roundDisplay() {
    if (playerTurn === BLUE) {
        push();
        fill('blue');
        textSize(50);
        text('BLUE Turn', 140, 65);
        pop();
    }
    else if (playerTurn === RED) {
        push();
        fill('red');
        textSize(50);
        text(' RED Turn', 655, 65);
        pop();
    }
}

//pushes dart into blue dart array, based on the position of the mouse and the "accuracy" of the power meter.
function addDartBlue() {
    calculateX = mouseX
    //the height of the thumb of the power meter determines how "accurate" the dart is.
    //The closer to the middle of the power bar, the less displacement.
    calculateY = mouseY + thumbHeight;
    blueDarts.push(new Dart(calculateX, calculateY));
}
//same as above except for red
function addDartRed() {
    calculateX = mouseX
    calculateY = mouseY + thumbHeight;
    redDarts.push(new Dart(calculateX, calculateY));
}

//draws each dart in the blue array
function drawDarts() {
    blueDarts.forEach(dart => {
        push();
        noStroke();
        fill("blue");
        image(dartBlue, dart.x, dart.y, 50, 50)
        pop();
    });
    //same as above except for red array
    redDarts.forEach(dart => {
        push();
        noStroke();
        fill("red");
        image(dartRed, dart.x, dart.y, 50, 50)
        pop();
    });
}

//draws hand icon, based on which player's turn it is
function drawCrosshair() {
    if (playerTurn === BLUE) {
        //if the dart has been thrown, change image to the throwing hand icon
        if (thrown === true) {
            image(hand, mouseX + 20, mouseY + 50, 250, 250);
        }
        //If not, simply display the hand icon for holding the blue dart
        else {
            image(aimBlue, mouseX + 20, mouseY + 50, 250, 250);
        }
    }
    else if (playerTurn === RED) {
        //same as above
        if (thrown === true) {
            image(hand, mouseX + 20, mouseY + 50, 250, 250);
        }
        //same as above except for red
        else {
            image(aimRed, mouseX + 20, mouseY + 50, 250, 250);
        }
    }
}

//draws dartboard image
function drawDartboard() {
    push();
    image(dartboard, 400, 400, 672, 592);
    pop();
}

//displays score of blue team
function blueScore() {
    push();
    fill('white')
    textSize(60);
    text(score.blue, 85, 720);
    pop();
}

//displays score of red team
function redScore() {
    push();
    fill('white')
    textSize(60);
    text(score.red, 715, 720);
    pop();
}

//displays dart icons, which show how many darts you have in reserve
function dartDisplay() {
    //display blue dart icon for each dart icon pushed into the blue dart counter array
    blueDartCounter.forEach(darticon => {
        push();
        image(dartUpBlue, darticon.x, darticon.y, 50, 50);
        pop();
    });
    //same as above except for red
    redDartCounter.forEach(darticon => {
        push();
        image(dartUpRed, darticon.x, darticon.y, 50, 50);
        pop();
    });
}

function populateBlue() {
    //pushes blue dart icons into exact places at bottom of the screen
    blueDartCounter.push(new Darticon(55, 750));
    blueDartCounter.push(new Darticon(85, 750));
    blueDartCounter.push(new Darticon(115, 750));
}

function populateRed() {
    //same as above, except for red
    redDartCounter.push(new Darticon(745, 750));
    redDartCounter.push(new Darticon(715, 750));
    redDartCounter.push(new Darticon(685, 750));
}

//power meter
function drawPowerMeter() {
    //thumb position data
    const thumb = {
        x: mouseX + 130,
        y: (mouseY + 80) + thumbHeight,
        w: 20,
        h: 10
    }
    //bar position data
    const bar = {
        x: mouseX + 130,
        y: mouseY + 80,
        w: 20,
        h: 150
    }
    //bar image
    push();
    image(barImg, bar.x, bar.y, bar.w, bar.h);
    pop();
    //thumb image
    push();
    image(thumbImg, thumb.x, thumb.y, thumb.w, thumb.h);
    pop();
    //if the thumb hits top of bar, change direction
    if (thumbHeight >= 75)
        thumbDown = true;
    //if the thumb hits bottom of bar, change direction
    else if (thumbHeight <= -75)
        thumbDown = false;
    //speed of thumb
    if (thumbDown)
        thumbHeight -= 5;
    else
        thumbHeight += 5;
}

//"button" that detects when dart hits it, sends user back to game select menu
function menuButton() {
    push();
    fill('white');
    textSize(50);
    text('MENU', 400, 65);
    blueDarts.forEach(dart => {
        //distance between dart and text
        let d = dist(dart.x, dart.y, 400, 65);
        //if distance between dart and text is less than 70px, send user back to menu
        if (d <= 70) {
            push();
            fill('red');
            textSize(50);
            text('MENU', 400, 65);
            pop();
            //function that changes case to menu
            delayMenu();
        }
    });
    //same thing as above but for red darts
    redDarts.forEach(dart => {
        let d = dist(dart.x, dart.y, 400, 65);
        if (d <= 70) {
            push();
            fill('red');
            textSize(50);
            text('MENU', 400, 65);
            pop();
            //function that changes case to menu
            delayMenu();
        }
    });
}

