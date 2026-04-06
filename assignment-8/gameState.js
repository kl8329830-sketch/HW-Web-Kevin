//Main Menu
let menuShown = false;
let menuTimer = 0;
let menuAlpha = 0;
let btnVisible = false
let btnAlpha = 0;
let shakeTimer = 0;
let shakeAmount = 0;
// PLAYER


let player = {
  hp: 80,
  maxHP: 80,
  block: 0,
  energy: 3,
  maxEnergy: 3,
};


// ENEMIES


let enemies = [];
let enemyIndex = 0;
let enemy = null;
let enemyScale = 0;
let enemyRotation = 0;
let isRotating = false;

// CARD PILES


let drawPile = [];
let hand = [];
let discardPile = [];
let lastKill = 0;


// STARTING DECK


const STARTING_DECK = [
  [{ name: "Strike", cost: 1, type: "attack", value: 6 }, 5],
  [{ name: "Defend", cost: 1, type: "block", value: 6 }, 5],
  [{ name: "Bash", cost: 2, type: "attack", value: 14 }, 2],
  [{ name: "Recharge", cost: 0, type: "mana", value: 1 }, 2],
];


// DEBUFFS


let playerDebuffs = { weak: 0 };


// COMBAT STATE


let charged = false;
let chargeBonus = 5;
let enemyNextDmg = 0;


// UI STATE


let gameState = "player_turn";
let hitTimer = 0;
let drawPileCheck = false;
let discardPileCheck = false;


