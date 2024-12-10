/**
 * DartSlayer
 * Aidan Khan
 * 
 * Defeat the monster by reducing it's health to zero while keeping yours above 0.
 * Hint: aim for the sword when it's raised, and aim for the eyes when the shield is raised.
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
            //body damage immunity off
            immune = false;
            //switch case by using timer
            switchState();
            break;
        case BLOCK:
            //show monster image
            image(monsterDefend, 400, 400, 400, 400)
            //make monster immune to body damage
            immune = true;
            //switch case by using timer
            switchState();
            break;
        case ATTACK:
            //show monster image
            image(monsterAttack, 400, 400, 400, 400)
            //body damage immunity off
            immune = false;
            //switch case by using timer
            switchState();

            break;
        case PARRY:
            //show monster image
            image(monsterDA, 400, 400, 400, 400)
            //make monster immune to body damage
            immune = true;
            //switch case by using timer
            switchState();

            break;
        case DEAD:
            //show monster image
            image(monsterDead, 400, 400, 400, 400)
            //make monster immune to body damage
            immune = true;
            //win condition
            youWin();
            break;
    }
}

//draw monster's health bar
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

//check if monster's health is 0 or less
function checkMonsterHealth() {
    if (health <= 0) {
        monsterState = DEAD;
    }
}

//triggers win screen
function youWin() {
    fill('blue');
    textSize(50);
    text('YOU WIN', 400, 750);
    //turn game off
    dartSlayerOn = false;
    //sends player back to menu
    setTimeout(delayMenu, 2300)
}

//function is called to randomize what action the monster takes every few seconds
function switchState() {
    //If the frameCount is divisible by 60, then a second has passed. It will stop at 0
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
    //when timer runs out
    if (timer == 0) {
        //generate random number from 2-4
        const decideState = (int(random(2, 5)));
        //if the monster's arm is still alive by the end of the attack or parry stages, lose a life
        if ((monsterState === ATTACK) && (armHealth > 0)) { lives -= 1 }
        else if ((monsterState === PARRY) && (armHealth > 0)) { lives -= 1 }
        //if the random number generated is 1, monster is idle
        if (decideState === 1) {
            monsterState = IDLE;
        }
        //if the random number generated is 2, monster will block
        else if (decideState === 2) {
            //clear dart array so darts aren't visible on shield
            blueDarts = []
            monsterState = BLOCK;
        }
        //if the random number generated is 3, monster will attack
        else if (decideState === 3) {
            monsterState = ATTACK;
        }
        //if the random number generated is 4, monster will parry
        else if (decideState === 4) {
            //clear dart array so darts aren't visible on shield
            blueDarts = []
            monsterState = PARRY;
        }
        //reset timer to 3 seconds
        timer = 3;
    }
}

//draw health of arm when monster is either attacking or parrying
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

//check health of the arm
function checkArmHealth() {
    //if monster is parrying, and their arm is defeated, monster will block
    if ((monsterState === PARRY) && (armHealth <= 0)) {
        monsterState = BLOCK;
        armHealth = 50;
        timer = 2;
    }
    //if monster is attacking and arm is broken, monster will become idle, offering a window of opportunity
    else if ((monsterState === ATTACK) && (armHealth <= 0)) {
        monsterState = IDLE;
        armHealth = 50;
        timer = 2;
    }
}

//check how many lives the player has while playing dartSlayer
function checkSlayerLives() {
    //if you have zero lives left, you lose
    if (lives <= 0) {
        youLoseSlayer();
    }
}

//Lose condition for dartSlayer
function youLoseSlayer() {
    fill('red');
    textSize(50);
    text('YOU LOSE', 400, 750);
    dartSlayerOn = false;
    setTimeout(delayMenu, 2300)
}