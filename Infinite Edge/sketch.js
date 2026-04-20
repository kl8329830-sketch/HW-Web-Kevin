let starImg;

function preload() {
  starImg = loadImage("Energy_Image.png");
}

//Setup
function setup() {
  createCanvas(W, H);
  textFont("Courier New");
  textStyle(BOLD);
  initGame();
}

//Reset
function initGame() {
  enemies = makeEnemies();
  enemyIndex = 0;
  enemy = enemies[0];

  player.hp = player.maxHP;
  player.block = 0;
  player.energy = player.maxEnergy;

  playerBuffs.strikeBonus = 0;
  playerBuffs.defendBonus = 0;
  playerDebuffs.weak = 0;

  charged = false;
  enemyNextDmg = floor(random(8, 18));
  enemyScale = 0;

  drawPile = [];
  hand = [];
  discardPile = [];
  lastKill = 0;

  for (let [card, count] of STARTING_DECK) {
    for (let i = 0; i < count; i++) {
      drawPile.push(Object.assign({}, card));
    }
  }

  shuffleDeck();
  drawCards(5);

  displayPlayerHp = player.hp;
  displayEnemyHp = enemy.hp;

  gameState = "player_turn";
  hitTimer = 0;
  drawPileCheck = false;
  discardPileCheck = false;
  tutorialOpen = false;
}

//Main
function draw() {
  background(...colBackground);

  if (!menuShown) { drawMenuScreen(); return; }
  if (gameState === "win") { drawWinScreen(); return; }
  if (gameState === "lose") { drawLoseScreen(); return; }
  if (gameState === "reward") { drawRewardScreen(); return; }

  drawEnemyBars();
  drawEnemyShape();
  drawEnemyIntent();
  drawHand();
  drawBottomHUD();
  drawOverlays();
}

//Mouse Input
function mousePressed() {
  if (!menuShown) {
    if (btnVisible &&
      mouseX > W / 2 - 100 && mouseX < W / 2 + 100 &&
      mouseY > H / 2 && mouseY < H / 2 + 55) {
      menuShown = true;
    }
    return;
  }

  if (drawPileCheck || discardPileCheck || tutorialOpen) {
    drawPileCheck = false;
    discardPileCheck = false;
    tutorialOpen = false;
    return;
  }

  if (gameState === "win" || gameState === "lose") {
    let bx = W / 2 - 100;
    let by = H / 2 + 20;
    if (mouseX > bx && mouseX < bx + 200 && mouseY > by && mouseY < by + 55) {
      initGame();
    }
    return;
  }

  if (gameState === "reward") {
    if (mouseX > W / 2 - 520 && mouseX < W / 2 - 280 &&
      mouseY > H / 2 - 160 && mouseY < H / 2 + 80) {
      player.hp = min(player.hp + 25, player.maxHP);
      gameState = "player_turn";
      drawCards(5);
    }
    //Strike+
    if (mouseX > W / 2 - 120 && mouseX < W / 2 + 120 &&
      mouseY > H / 2 - 160 && mouseY < H / 2 + 80) {
      playerBuffs.strikeBonus += 2;
      gameState = "player_turn";
      drawCards(5);
    }
    //Defend+
    if (mouseX > W / 2 + 280 && mouseX < W / 2 + 520 &&
      mouseY > H / 2 - 160 && mouseY < H / 2 + 80) {
      playerBuffs.defendBonus += 2;
      gameState = "player_turn";
      drawCards(5);
    }
    return;
  }

  if (gameState !== "player_turn") return;

  //Tutorial Button
  let tx = playerBarX + playerBarW - 40;
  let ty = cardPileBY - 95;
  if (mouseX > tx && mouseX < tx + 30 && mouseY > ty && mouseY < ty + 30) {
    tutorialOpen = true; return;
  }

  //DrawPile
  if (mouseX > playerBarX && mouseX < playerBarX + 110 &&
    mouseY > cardPileBY - 20 && mouseY < cardPileBY + 5) {
    drawPileCheck = true; return;
  }

  //DiscardPile
  let dx = playerBarX + playerBarW - 110;
  if (mouseX > dx && mouseX < dx + 110 &&
    mouseY > cardPileBY - 20 && mouseY < cardPileBY + 5) {
    discardPileCheck = true; return;
  }

  //EndTurn
  let etx = playerBarX + playerBarW - 160;
  let ety = energyTextY - 22;
  if (mouseX > etx && mouseX < etx + 160 &&
    mouseY > ety && mouseY < ety + 30) {
    endTurn(); return;
  }

  //HandCards
  let total = hand.length;
  let startX = W / 2 - (total * (cardW + 10)) / 2;
  for (let i = 0; i < total; i++) {
    let x = startX + i * (cardW + 10);
    let y = handY;
    if (mouseX > x && mouseX < x + cardW &&
      mouseY > y && mouseY < y + cardH) {
      playCard(i); return;
    }
  }
}

//Keyboard Input
function keyPressed() {
  if (keyCode === ESCAPE) {
    drawPileCheck = false;
    discardPileCheck = false;
    tutorialOpen = false;
  }
}