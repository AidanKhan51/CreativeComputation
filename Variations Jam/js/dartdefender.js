/**
 * Dart Defender
 * Aidan Khan
 * 
 * Huzzah! Defend against the evil attacking darts by striking them out of the air!
 * Wacth out for bombs, Count your darts, and collect Ammo Boxes!
 * 
 */
"use strict";
//determines when game is active
let dartDefenderOn = false;
//image variables
let heart;
let dartDown;
let bombImg;
let ammoImg;
//life counter
let lives = 3;
//ammo counter
let ammo = 10;
//switch to push attackers into array
let pushTimer = false;
//Your score!
let defenderScore = 0;

//array for attackers
let attackers = []

//position, size, and speed of bomb item
const bomb = {
    x: 0,
    y: -10,
    size: 70,
    speed: 0.5
}

//position, size, and speed of ammo box item
const ammoBox = {
    x: 0,
    y: -10,
    size: 70,
    speed: 1
}

//position, size, and speed of heart item
const heartBox = {
    x: 0,
    y: -10,
    size: 70,
    speed: 1.5
}

//class for attacker that holds position, size, speed etc.
class attacker {
    constructor(speed, size) {
        this.x = 0;
        this.y = -50;
        this.speed = speed;
        this.size = size;
    }
}

//adds a maximum limit to how many darts can be drawn at once
function drawnDartMax() {
    if ((blueDarts.length > 3)) {
        blueDarts.shift();
    }
}

//displays how many lives you have remaining
function displayLives() {
    push();
    image(heart, 650, 750, 50, 50);
    pop();
    push();
    textAlign(LEFT)
    textSize(30)
    text(' X ' + lives, 680, 770)
    pop();
}

//displays how much ammo you have remaining (underneath your cursor)
function displayAmmo() {
    push();
    image(dartUpBlue, mouseX, mouseY + 200, 50, 50);
    pop();
    push();
    textAlign(LEFT)
    textSize(30)
    text(' X ' + ammo, mouseX + 30, mouseY + 200)
    pop();
}

//If you run out of ammo, lose function triggered
function checkZeroAmmo() {
    if (ammo === 0) {
        youLose();
    }
}

//lose function
function youLose() {
    fill('red');
    textSize(50);
    text('YOU LOSE', 400, 400);
    dartDefenderOn = false;
    setTimeout(delayMenu, 2300)
}

// move the attackers
function moveAttacker() {
    attackers.forEach(attacker => {
        attacker.y += attacker.speed;
        // reset when it hits bottom of screen
        if ((attacker.y > 800) && (lives > 0)) {
            //if attacker hits bottom of screen, lose a life
            resetAttacker(attacker);
            lives -= 1;
        }
    })
}

function resetAttacker(attacker) {
    //reset attacker at random x coordinate
    attacker.y = -50;
    attacker.x = random(10, 790);
}

//pushes attackers when game is started
function pushAttackerTimer() {
    //variable switch to make sure this happens once. Probably could have used a loop instead
    if (pushTimer === true) {
        //resets all items
        resetBomb();
        resetAmmoBox();
        resetHeartBox();
        //push attackers
        pushAttacker();
        //randomizes X-coordinate of attackers
        attackers.forEach(attacker => {
            resetAttacker(attacker);
        });
        //switch turns off to stop from looping
        pushTimer = false;
    }
}

//push attackers
function pushAttacker() {
    //for loop to push attackers into array at random speeds and sizes
    for (let i = 0; i <= 4; i++) {
        attackers.push(new attacker(random(1, 2), random(30, 40)));
    }
}

//draws image for each attacker
function drawAttacker() {
    attackers.forEach(attacker => {
        push();
        image(dartDown, attacker.x, attacker.y, 70, 70)
        pop();
    })
}

//detects collision between darts and attackers/items
function detectCollision() {
    blueDarts.forEach(dart => {
        attackers.forEach(attacker => {
            //distance calculations for each object
            let dDart = dist(dart.x, dart.y, attacker.x, attacker.y);
            let dBomb = dist(dart.x, dart.y, bomb.x, bomb.y);
            let dAmmo = dist(dart.x, dart.y, ammoBox.x, ammoBox.y);
            let dHeart = dist(dart.x, dart.y, heartBox.x, heartBox.y);
            //if attacker is struck, gain a point
            if (dDart <= 50) {
                resetAttacker(attacker);
                defenderScore += 1;
            }
            //if bomb is struck, reset all darts and lose a life
            else if (dBomb <= 50) {
                resetBomb();
                attackers.forEach(attacker => {
                    resetAttacker(attacker);
                });
                lives -= 1;
            }
            //if ammo box is struck, gain 5 ammo
            else if (dAmmo <= 50) {
                resetAmmoBox();
                //if you've already lost, don't give any more darts
                if (dartDefenderOn === true) {
                    ammo += 5;
                }
            }
            //if heart is struck, gain a life
            else if (dHeart <= 50) {
                resetHeartBox();
                lives += 1
            }
        });
    });

}

//draws score for dartdefender
function drawDefenderScore() {
    push();
    textAlign(LEFT);
    fill('white');
    textSize(50);
    text(defenderScore, 50, 770);
    pop();
}

//check how many lives you have
function checkLives() {
    //if you have zero lives left, you lose
    if (lives <= 0) {
        youLose();
    }
}

//move the bomb at it's speed
function moveBomb() {
    bomb.y += bomb.speed;
    //if bomb hits bottom of screen, reset
    if (bomb.y > width) {
        resetBomb();
    }
}

//draw bomb image for the bomb
function drawBomb() {
    push();
    image(bombImg, bomb.x, bomb.y, 50, 50)
    pop();
}

//reset bomb at random x-coordinate
function resetBomb() {
    //reset bomb far from canvas to make it take longer to "respawn"
    bomb.y = -200;
    bomb.x = random(10, 790);
}

//move ammo box across screen
function moveAmmoBox() {
    ammoBox.y += ammoBox.speed;
    if (ammoBox.y > width) {
        //if ammo box hits bottom of screen, reset it
        resetAmmoBox();
    }
}

//draw ammo box image for the ammo box
function drawAmmoBox() {
    push();
    image(ammoImg, ammoBox.x, ammoBox.y, 50, 50)
    pop();
}

//resey ammo box at random x coordinate
function resetAmmoBox() {
    //reset ammo box far from canvas to make it take longer to "respawn"
    ammoBox.y = -200;
    ammoBox.x = random(10, 790);
}

//move heart box across screen if health is below 1
function moveHeartBox() {
    if (lives === 1) {
        heartBox.y += heartBox.speed;
    }
    if (heartBox.y > width) {
        resetHeartBox();
    }
}

//draw heart box image for heart item
function drawHeartBox() {
    push();
    image(heart, heartBox.x, heartBox.y, 50, 50)
    pop();
}

//reset heart item far from screen 
function resetHeartBox() {
    //reset heart box far from canvas to make it take longer to "respawn"
    heartBox.y = -200;
    heartBox.x = random(10, 790);
}

//draw high score from JSON file
function drawHighScore() {
    push();
    textAlign(LEFT);
    fill('white');
    textSize(30);
    text('HI: ' + dartsData.high.score, 50, 700);
    pop();
}

//update high score if the score is greater than it
function calculateHighScore() {
    if (defenderScore >= dartsData.high.score) {
        dartsData.high.score = defenderScore;
    }
}