//Menu
let menuShown = false;
let menuAlpha = 0;
let btnVisible = false;
let btnAlpha = 0;

//Player
let player = {
  hp: 80,
  maxHP: 80,
  block: 0,
  energy: 3,
  maxEnergy: 3,
};

//Player buffs and debuffs
let playerBuffs = {
  strikeBonus: 0,
  defendBonus: 0,
};
let playerDebuffs = {
  weak: 0,
};

//Enemy
let enemies = [];
let enemyIndex = 0;
let enemy = null;

//Enemy Animation
let enemyScale = 0;
let enemyRotation = 0;
let isRotating = false;
let shakeTimer = 0;
let shakeAmount = 0;

//HP bar animation
let displayPlayerHp = 80; // HP value for player bar
let displayEnemyHp = 0;  // HP value for enemy bar

//CardPile
let drawPile = [];
let hand = [];
let discardPile = [];
let lastKill = 0;

//Starting Deck
const STARTING_DECK = [
  [{ name: "Strike", cost: 1, type: "attack", value: 6 }, 5],
  [{ name: "Defend", cost: 1, type: "block", value: 6 }, 5],
  [{ name: "Bash", cost: 2, type: "attack", value: 14 }, 2],
  [{ name: "Recharge", cost: 0, type: "mana", value: 1 }, 2],
];

//Combat State
let charged = false;
let chargeBonus = 5;
let enemyNextDmg = 0;

//UI State
let gameState = "player_turn";
let hitTimer = 0;
let drawPileCheck = false;
let discardPileCheck = false;
let tutorialOpen = false; // tutorial overlay toggle