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
    monsterIdle = loadImage('assets/images/monsterIdle.png');
    monsterDead = loadImage('assets/images/monsterDead.png');
    monsterAttack = loadImage('assets/images/monsterAttack.png');
    monsterDefend = loadImage('assets/images/monsterDefend.png');
    monsterDA = loadImage('assets/images/monsterDefendAttack.png');
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
        * creates title text and text "buttons" to switch to the respective games
        * draws darts, hand crosshair, and power meter to throw darts
        * draws background and image border
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
        * draws background + border, dartboard and hidden circle behind dartboard (used to use dart score calculations)
        * draws menu text button that brings you back to menu
        * checks turn and displays which player's round it is
        * draws the total score the player has left as well as the points the latest dart had collected
        * draws darts, crosshair, and power meter
        * checks win condition and resets board after all 6 darts per round have been thrown
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
        * draws background and border
        * draws and moves the attackers/items
        * draws menu text button to send player back to menu
        * draws darts, cursor, and power meter
        * detects collisions between darts and attackers/items
        * displays lives, ammo, score, and high score
        * sets maximum amount of darts available on the screen
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
        * Draws background and border, the health bar for the monster/monster's arm, and the life counter
        * checks your life and the monster's life, depending on which one's at zero, you either win or lose
        * puts cap on darts that can be drawn at once on the board
        * draws darts, cursor, and power meter
        * calls the actions for the monster, separated by cases
        */
        case dartslayer:
            background('black')
            monsterActions();
            displayLives();
            checkSlayerLives();
            menuButton();
            drawHealthBar();
            drawArmHealth();
            checkArmHealth();
            drawDarts();
            drawnDartMax();
            checkMonsterHealth();
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
                        //otherwise, assign normal score (x1)
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
                //same as above except for red
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
        //for the last dart in the array
        const dart = blueDarts[blueDarts.length - 1]
        //distance of monster
        let dX = dist(dart.x, 0, 400, 0);
        let dY = dist(0, dart.y, 0, 400);
        //distance of monster's eyes
        let dEyesX = dist(dart.x, 0, 400, 0);
        let dEyesY = dist(0, dart.y, 0, 340);
        //distance of monster's arm
        let dArmX = dist(dart.x, 0, 250, 0);
        let dArmY = dist(0, dart.y, 0, 340);
        //If dart is within range of monster and shield is not up, reduce health by 5
        if ((dY <= 140) && (dX <= 110) && (immune === false)) {
            health -= 5
        }
        //If dart is within range of eyes and the monster is blocking/parrying,
        //reduce health by 10 and set monster back to idle position (window to do more damage) for 2 seconds
        else if ((dEyesX <= 100) && (dEyesY <= 40) && (monsterState === BLOCK || PARRY)) {
            health -= 10
            monsterState = IDLE;
            timer = 2;
        }
        //if dart is within range of the arm (while monster is attacking and parrying), deal 25 damage to the arm
        else if ((dArmX <= 60) && (dArmY <= 60) && (monsterState === ATTACK || PARRY)) {
            armHealth -= 25;
        }
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
    //turns off all game functionality
    dartMasterOn = false;
    dartDefenderOn = false;
    dartSlayerOn = false;
    //resets dartDefender score and array, as well as lives and ammo.
    attackers = []
    pushTimer = false;
    defenderScore = 0;
    ammo = 10;
    lives = 3;
    //resets dartSlayer variables, like damage immunity, monster/monster's arm health and the timer
    monsterState = IDLE;
    immune = false;
    health = 100;
    timer = 3;
    armHealth = 50;
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

