/**
 * Dart Defender
 * Aidan Khan
 * 
 */
"use strict";
//determines when game is active
let dartDefenderOn = false;
let heart;
let dartDown;
let bombImg;
let ammoImg;
let lives = 3;
let ammo = 10;
let pushTimer = false;
let defenderScore = 0;

let attackers = []

const bomb = {
    x: 0,
    y: -10,
    size: 70,
    speed: 0.5
}

const ammoBox = {
    x: 0,
    y: -10,
    size: 70,
    speed: 1
}

const heartBox = {
    x: 0,
    y: -10,
    size: 70,
    speed: 1.5
}

class attacker {
    constructor(speed, size) {
        this.x = 0;
        this.y = -50;
        this.speed = speed;
        this.size = size;
    }
}

function drawnDartMax() {
    if ((blueDarts.length > 3)) {
        blueDarts.shift();
    }
}

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

function moveAttacker() {
    // move the attacker
    attackers.forEach(attacker => {
        attacker.y += attacker.speed;
        // reset when it hits bottom of screen
        if ((attacker.y > 800) && (lives > 0)) {
            resetAttacker(attacker);
            lives -= 1;
        }
    })
}

function resetAttacker(attacker) {
    attacker.y = -50;
    attacker.x = random(10, 790);
}

function pushAttackerTimer() {
    if (pushTimer === true) {
        resetBomb();
        resetAmmoBox();
        resetHeartBox();
        pushAttacker();
        attackers.forEach(attacker => {
            resetAttacker(attacker);
        });
        pushTimer = false;
    }
}

function pushAttacker() {
    //for loop to push attackers into array
    for (let i = 0; i <= 4; i++) {
        attackers.push(new attacker(random(1, 2), random(30, 40)));
    }
}

function drawAttacker() {
    attackers.forEach(attacker => {
        push();
        image(dartDown, attacker.x, attacker.y, 70, 70)
        pop();
    })
}

function detectCollision() {
    blueDarts.forEach(dart => {
        attackers.forEach(attacker => {
            let dDart = dist(dart.x, dart.y, attacker.x, attacker.y);
            let dBomb = dist(dart.x, dart.y, bomb.x, bomb.y);
            let dAmmo = dist(dart.x, dart.y, ammoBox.x, ammoBox.y);
            let dHeart = dist(dart.x, dart.y, heartBox.x, heartBox.y);
            if (dDart <= 50) {
                resetAttacker(attacker);
                defenderScore += 1;
            }
            else if (dBomb <= 50) {
                resetBomb();
                attackers.forEach(attacker => {
                    resetAttacker(attacker);
                });
                lives -= 1;
            }
            else if (dAmmo <= 50) {
                resetAmmoBox();
                ammo += 5;
            }
            else if (dHeart <= 50) {
                resetHeartBox();
                lives += 1
            }
        });
    });

}

function drawDefenderScore() {
    push();
    textAlign(LEFT);
    fill('white');
    textSize(50);
    text(defenderScore, 50, 770);
    pop();
}

function checkLives() {
    if (lives <= 0) {
        youLose();
    }
}

function moveBomb() {
    bomb.y += bomb.speed;
    if (bomb.y > width) {
        resetBomb();
    }
}

function drawBomb() {
    push();
    image(bombImg, bomb.x, bomb.y, 50, 50)
    pop();
}

function resetBomb() {
    bomb.y = -50;
    bomb.x = random(10, 790);
}

function moveAmmoBox() {
    ammoBox.y += ammoBox.speed;
    if (ammoBox.y > width) {
        setTimeout(resetAmmoBox, 3000)
    }
}

function drawAmmoBox() {
    push();
    image(ammoImg, ammoBox.x, ammoBox.y, 50, 50)
    pop();
}

function resetAmmoBox() {
    ammoBox.y = -200;
    ammoBox.x = random(10, 790);
}

function moveHeartBox() {
    if (lives === 1) {
        heartBox.y += heartBox.speed;
    }
    if (heartBox.y > width) {
        setTimeout(resetHeartBox, 3000)
    }
}

function drawHeartBox() {
    push();
    image(heart, heartBox.x, heartBox.y, 50, 50)
    pop();
}

function resetHeartBox() {
    heartBox.y = -200;
    heartBox.x = random(10, 790);
}