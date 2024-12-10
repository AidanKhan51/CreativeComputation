/**
 * DartSlayer
 * Aidan Khan
 * 
 */
"use strict";
//determines when game is active
let dartSlayerOn = false;
//images
let monsterIdle;
let monsterDead;
let monsterAttack;
let monsterDefend;
let monsterDA;
//monster health
var health = 100;
//monster's arm health
var armHealth = 50;
//cases for what actions the monster is going to perform
const IDLE = 1
const BLOCK = 2
const ATTACK = 3
const PARRY = 4
const DEAD = 5
//turn monster immunity to body damage to false
let immune = false;
//start monster in idle state
let monsterState = IDLE;
//start timer at 2 secs
let timer = 2;


function monsterActions() {
    //Monster actions
    switch (monsterState) {
        case IDLE:
            //show monster image
            image(monsterIdle, 400, 400, 400, 400)
            //body immunity off
            immune = false;
            //switch case using timer
            switchState();
            break;
        case BLOCK:
            image(monsterDefend, 400, 400, 400, 400)
            immune = true;
            switchState();
            break;
        case ATTACK:
            image(monsterAttack, 400, 400, 400, 400)
            immune = true;
            switchState();

            break;
        case PARRY:
            image(monsterDA, 400, 400, 400, 400)
            immune = true;
            switchState();

            break;
        case DEAD:
            image(monsterDead, 400, 400, 400, 400)
            immune = true;
            youWin();
            break;
    }
}

function drawHealthBar() {
    push();
    fill('red');
    rect(400, 170, 300, 20);
    stroke('white')
    strokeWeight(3)
    pop();
    push();
    fill('green')
    rect(400, 170, health * 3, 20);
    pop();
}

function checkMonsterHealth() {
    if (health <= 0) {
        monsterState = DEAD;
    }
}

function youWin() {
    fill('blue');
    textSize(50);
    text('YOU WIN', 400, 750);
    dartSlayerOn = false;
    setTimeout(delayMenu, 2300)
}

function switchState() {
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }
    if (timer == 0) {
        const decideState = (int(random(2, 5)));
        if ((monsterState === ATTACK) && (armHealth > 0)) { lives -= 1 }
        else if ((monsterState === PARRY) && (armHealth > 0)) { lives -= 1 }
        if (decideState === 1) {
            monsterState = IDLE;
        }
        else if (decideState === 2) {
            blueDarts = []
            monsterState = BLOCK;
        }
        else if (decideState === 3) {
            monsterState = ATTACK;
        }
        else if (decideState === 4) {
            blueDarts = []
            monsterState = PARRY;
        }
        timer = 3;
    }
}

function drawArmHealth() {
    if ((monsterState === PARRY) || (monsterState === ATTACK)) {
        push();
        fill('red');
        rect(230, 400, 50, 10);
        stroke('white')
        strokeWeight(3)
        pop();
        push();
        fill('green')
        rect(230, 400, armHealth, 10);
        pop();
    }
}

function checkArmHealth() {
    if ((monsterState === PARRY) && (armHealth <= 0)) {
        monsterState = BLOCK;
        armHealth = 50;
        timer = 2;
    }
    else if ((monsterState === ATTACK) && (armHealth <= 0)) {
        monsterState = IDLE;
        armHealth = 50;
        timer = 2;
    }
}

function checkSlayerLives() {
    //if you have zero lives left, you lose
    if (lives <= 0) {
        youLoseSlayer();
    }
}

function youLoseSlayer() {
    fill('red');
    textSize(50);
    text('YOU LOSE', 400, 750);
    dartSlayerOn = false;
    setTimeout(delayMenu, 2300)
}