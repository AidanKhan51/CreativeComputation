/**
 * Darts Menu
 * Aidan Khan
 * Menu for selecting games. Throw dart at game name to play.
 */

"use strict";
//JSON data
let dartsData;
//variable that determines what game you're playing
let gameState;
//cases for gameState
const menu = 1;
const dartmaster = 2;
const dartdefender = 3;
const dartslayer = 4;

//preload for images and data
function preload() {
    // JSON data
    dartsData = loadJSON("assets/data/darts.json");
    //font
    font = loadFont('assets/fonts/DotGothic.ttf');
    //images
    aimBlue = loadImage('assets/images/armBlue.png');
    aimRed = loadImage('assets/images/armRed.png');
    dartBlue = loadImage('assets/images/dartBlue.png');
    dartRed = loadImage('assets/images/dartRed.png');
    dartUpBlue = loadImage('assets/images/dartUpBlue.png');
    dartUpRed = loadImage('assets/images/dartUpRed.png');
    dartboard = loadImage('assets/images/dartboard.png');
    border = loadImage('assets/images/dartborder.png');
    barImg = loadImage('assets/images/bar.png');
    thumbImg = loadImage('assets/images/thumb.png');
    hand = loadImage('assets/images/thrown.png');
    heart = loadImage('assets/images/heart.png');
    dartDown = loadImage('assets/images/dartDownRed.png');
    bombImg = loadImage('assets/images/bomb.png');
    ammoImg = loadImage('assets/images/ammoBox.png');
}

/**
 * changes gameState to the menu case
 * removes cursor visibility within canvas
 * populates the Red and Blue dart icons in dartmaster
 * creates canvas
 * changes the player turn to the blue player's turn
 * sets up font for text
 * sets default text size
 * sets image and rectangle mode to center
*/
function setup() {
    gameState = menu;
    noCursor();
    populateRed();
    populateBlue();
    createCanvas(800, 800);
    playerTurn = BLUE;
    textFont(font);
    textSize(30);
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER);
}


//For every gameState case
function draw() {
    switch (gameState) {
        /** * Menu 
        * Menu for selecting game. Throw darts at game name to select said game
        * draws darts, hand crosshair, and power meter to throw darts
        */
        case menu:
            background('black')
            title();
            dartMasterButton();
            dartDefenderButton();
            dartSlayerButton();
            drawDarts();
            drawCrosshair();
            drawPowerMeter();
            image(border, 400, 400, 800, 800)
            break;
        /** * Dartmaster
        * who up darting they master
        */
        case dartmaster:
            background('black')
            drawCircle();
            drawDartboard();
            menuButton();
            checkTurn();
            roundDisplay();
            drawDarts();
            dartDisplay();
            redScore();
            blueScore();
            drawRecentScoreBlue();
            drawRecentScoreRed();
            drawCrosshair();
            drawPowerMeter();
            checkWin();
            resetBoard();
            image(border, 400, 400, 800, 800)
            break;
        /** * Dartdefender
        * 
        */
        case dartdefender:
            console.log(bomb.x, bomb.y)
            background('black')
            drawAttacker();
            moveAttacker();
            drawAmmoBox();
            moveAmmoBox();
            drawHeartBox();
            moveHeartBox();
            drawBomb();
            moveBomb();
            menuButton();
            drawDarts();
            detectCollision();
            displayLives();
            displayAmmo();
            checkZeroAmmo();
            checkLives();
            drawnDartMax();
            drawDefenderScore();
            drawHighScore();
            calculateHighScore();
            drawCrosshair();
            drawPowerMeter();
            image(border, 400, 400, 800, 800)
            break;
        /** * Dartslayer
        * 
        */
        case dartslayer:
            background('black')
            menuButton();
            drawDarts();
            drawCrosshair();
            drawPowerMeter();
            image(border, 400, 400, 800, 800)
            break;
    }
}

/**
 * If mouse is clicked, set thrown variable that determines when a dart has been thrown to true.
 * the thrown variable is then used to change the hand icon to the throwing hand icon
 */
function mouseClicked() {
    thrown = true;
    //afterwards, the throwing hand icon resets after 0.7 seconds.
    setTimeout(resetHand, 700);
    if (dartMasterOn === true) {
        //If the game is active, determine which player's turn it is
        switch (playerTurn) {
            case BLUE: {
                //add blue dart to board
                addDartBlue();
                //remove blue dart icon from reserve
                blueDartCounter.shift();

                //determines score given based on the dart's position relative to the angles of the board
                //takes last dart in the array
                const dart = blueDarts[blueDarts.length - 1]
                //distance between dart and center of board
                let d = dist(dart.x, dart.y, 400, 400);
                //board angles around center of canvas
                let a = Math.atan2(dart.y - 400, dart.x - 400) * (180 / Math.PI)
                //loop to check where dart has landed using Array in JSON
                for (const score of dartsData.checkScores) {
                    //if the dart has landed close to the center of dartboard, give 50 points (inner bullseye)
                    if (d <= 10) {
                        gore.blue -= 50
                        recentScoreBlue = 'Bull ' + 50;
                        break;
                    }
                    //same as above, except for outer bullseye
                    else if (d <= 50) {
                        gore.blue -= 25
                        recentScoreBlue = 'Bull ' + 25;
                        break;
                    }
                    //If dart is within the dartboard, loop through array to find what angle the dart landed in
                    else if ((a >= score.angle) && (a <= score.end) && (d <= 250)) {
                        //if dart lands in outer ring, multiply score by 2
                        if ((d >= 215) && (d <= 249)) {
                            gore.blue -= (score.points * 2)
                            //show how many points player just scored
                            recentScoreBlue = (score.points * 2)
                        }
                        //if dart lands in inner rung, multiply score by 3
                        else if ((d >= 135) && (d <= 155)) {
                            gore.blue -= (score.points * 3)
                            recentScoreBlue = (score.points * 3)
                        }
                        //otherwise, assign normal score
                        else {
                            gore.blue -= score.points
                            recentScoreBlue = score.points
                        }
                        console.log(score)
                        console.log(d)
                        break;
                    }
                }
            }
                break;
            case RED: {
                //same as above but for red
                addDartRed();
                redDartCounter.shift();

                const dart = redDarts[redDarts.length - 1]
                let d = dist(dart.x, dart.y, 400, 400);
                let a = Math.atan2(dart.y - 400, dart.x - 400) * (180 / Math.PI)
                for (const score of dartsData.checkScores) {
                    if (d <= 15) {
                        gore.red -= 50
                        recentScoreRed = 'Bull ' + 50;
                        break;
                    }
                    else if (d <= 50) {
                        gore.red -= 25
                        recentScoreRed = 'Bull ' + 25;
                        break;
                    }
                    else if ((a >= score.angle) && (a <= score.end) && (d <= 250)) {
                        if ((d >= 215) && (d <= 249)) {
                            gore.red -= (score.points * 2)
                            recentScoreRed = (score.points * 2)
                        }
                        else if ((d >= 135) && (d <= 155)) {
                            gore.red -= (score.points * 3)
                            recentScoreRed = (score.points * 3)
                        }
                        else {
                            gore.red -= score.points
                            recentScoreRed = (score.points)
                        }
                        console.log(score)
                        console.log(d)
                        break;
                    }
                }
            }
                break;
        }
    }
    //if the game is not active, and the gameState is instead menu (meaning it's one the menu screen),
    // simply add a blue dart to the board
    else if (gameState === menu) {
        addDartBlue();
    }
    else if ((gameState === dartdefender) && (dartDefenderOn === true)) {
        addDartBlue();
        //use ammo when dart is fired
        ammo -= 1
    }
    else if ((gameState === dartslayer) && (dartSlayerOn === true)) {
        addDartBlue();
    }
}

//Delays start of next game/case by 0.7 seconds to limit user confusion when switching games
function delayMenu() {
    setTimeout(menuChange, 700)
}

//Text for dartmaster game in main menu
function dartMasterButton() {
    push();
    fill('white');
    textSize(50);
    text('- DartMaster -', 400, 350);
    pop();
    blueDarts.forEach(dart => {
        //distance of x and y between the text and the dart
        let dx = dist(dart.x, 0, 400, 0);
        let dy = dist(0, dart.y, 0, 350);
        //if dart lands within a certain distance, make text turn red and change gameState to dartmaster
        if ((dx <= 120) && (dy <= 60)) {
            push();
            fill('red');
            textSize(50);
            text('- DartMaster -', 400, 350);
            pop();
            delayDartMaster();
        }
    });
}

//Text for dartdefender game in main menu
function dartDefenderButton() {
    push();
    fill('white');
    textSize(50);
    text('- DartDefender -', 400, 500);
    pop();
    blueDarts.forEach(dart => {
        //distance of x and y between the text and the dart
        let dx = dist(dart.x, 0, 400, 0);
        let dy = dist(0, dart.y, 0, 500);
        //if dart lands within a certain distance, make text turn red and change gameState to dartmaster
        if ((dx <= 120) && (dy <= 60)) {
            push();
            fill('red');
            textSize(50);
            text('- DartDefender -', 400, 500);
            pop();
            delayDartDefender();
        }
    });
}

//Text for dartslayer game in main menu
function dartSlayerButton() {
    push();
    fill('white');
    textSize(50);
    text('- DartSlayer -', 400, 650);
    pop();
    blueDarts.forEach(dart => {
        //distance of x and y between the text and the dart
        let dx = dist(dart.x, 0, 400, 0);
        let dy = dist(0, dart.y, 0, 650);
        //if dart lands within a certain distance, make text turn red and change gameState to dartmaster
        if ((dx <= 120) && (dy <= 60)) {
            push();
            fill('red');
            textSize(50);
            text('- DartSlayer -', 400, 650);
            pop();
            delayDartSlayer();
        }
    });
}

//delays Gamestate changes by 0.7 secs
function delayDartMaster() {
    setTimeout(dartMaster, 700)
}

function delayDartDefender() {
    setTimeout(dartDefender, 700)
}

function delayDartSlayer() {
    setTimeout(dartSlayer, 700)
}

//sets up menu by cleaning arrays and changes gameState to menu
function menuChange() {
    //sets player to blue
    playerTurn = BLUE;
    //resets dart arrays and score variables for dartMaster
    blueDarts = []
    redDarts = []
    gameState = menu;
    gore.red = 300;
    gore.blue = 300;
    recentScoreBlue = 0;
    recentScoreRed = 0;
    ammo = 10;
    lives = 3;
    //turns off all game functionality
    dartMasterOn = false;
    dartDefenderOn = false;
    //resets dartDefender score and array
    attackers = []
    pushTimer = false;
    defenderScore = 0;
}

//sets up and changes gameState to dartmaster
//clears and populates arrays and scores
function dartMaster() {
    blueDartCounter = []
    redDartCounter = []
    populateRed();
    populateBlue();
    redDarts = []
    blueDarts = []
    gameState = dartmaster;
    dartMasterOn = true;
}

//sets up and changes gameState to dartdefender
function dartDefender() {
    blueDarts = []
    gameState = dartdefender;
    dartDefenderOn = true;
    //switch to push attackers into array
    pushTimer = true;
    //resets positions of special items
    bomb.y = -50;
    ammoBox.y = -50;
    heartBox.y = -50;
    //pushes attackers for dart defender
    setTimeout(pushAttackerTimer, 1000);
}

//sets up and changes gameState to dartslayer
function dartSlayer() {
    blueDarts = []
    gameState = dartslayer;
    dartSlayerOn = true;
}

//Title text for menu screen
function title() {
    push();
    fill('white');
    textSize(80);
    text('CART DART©', 400, 200);
    pop();
    push();
    fill('white');
    textSize(20);
    text("Aidan's world famous", 400, 120);
    pop();
    push();
    fill('white');
    textSize(20);
    text("est. 2024", 400, 230);
    pop();
}

