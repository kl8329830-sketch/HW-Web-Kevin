
// SETUP


function setup() {
  createCanvas(W, H);
  textFont("Courier New");
  textStyle(BOLD);
  initGame();
}

function initGame() {
  enemies = makeEnemies();
  enemyIndex = 0;
  enemy = enemies[0];
  player.hp = player.maxHP;
  player.block = 0;
  player.energy = player.maxEnergy;

  enemyScale = 0;
  enemies = makeEnemies();
  enemyIndex = 0;
  enemy = enemies[0];

  charged = false;
  enemyNextDmg = floor(random(8, 18));
  playerDebuffs.weak = 0;

  drawPile = [];
  hand = [];
  discardPile = [];

  for (let [card, count] of STARTING_DECK) {
    for (let i = 0; i < count; i++) {
      drawPile.push(Object.assign({}, card));
    }
  }

  shuffleDeck();
  drawCards(5);

  gameState = "player_turn";
  hitTimer = 0;
  drawPileCheck = false;
  discardPileCheck = false;
}


// MAIN DRAW LOOP


function draw() {
  background(...COL_Background);

  if (!menuShown) { drawMenuScreen(); return; }
  if (gameState === "win") { drawWinScreen(); return; }
  if (gameState === "lose") { drawLoseScreen(); return; }

  drawEnemyBars();
  drawEnemyShape();
  drawEnemyIntent();
  drawHand();
  drawBottomHUD();
  drawOverlays();
}


// INPUT - MOUSE


function mousePressed() {
  if (gameState === "menu") {
    if (mouseX > W / 2 - 100 && mouseX < W / 2 + 100 &&
      mouseY > H / 2 && mouseY < H / 2 + 55) {
      menuShown = true;
    }
    return;
  }
  if (!menuShown) {
    if (btnVisible &&
      mouseX > W / 2 - 100 && mouseX < W / 2 + 100 &&
      mouseY > H / 2 && mouseY < H / 2 + 55) {
      menuShown = true;
    }
    return;
  }

  if (drawPileCheck || discardPileCheck) return;

  if (gameState === "win" || gameState === "lose") {
    let bx = W / 2 - 100;
    let by = H / 2 + 20;
    if (mouseX > bx && mouseX < bx + 200 && mouseY > by && mouseY < by + 55) {
      initGame();
    }
    return;
  }

  if (gameState !== "player_turn") return;

  // draw pile button
  if (mouseX > PlayerBar_X && mouseX < PlayerBar_X + 110 &&
    mouseY > cardPileB_Y - 20 && mouseY < cardPileB_Y + 5) {
    drawPileCheck = true; return;
  }

  // discard pile button
  let dx = PlayerBar_X + PlayerBar_W - 110;
  if (mouseX > dx && mouseX < dx + 110 &&
    mouseY > cardPileB_Y - 20 && mouseY < cardPileB_Y + 5) {
    discardPileCheck = true; return;
  }

  // end turn button
  let etx = PlayerBar_X + PlayerBar_W - 160;
  let ety = EnergyText_Y - 22;
  if (mouseX > etx && mouseX < etx + 160 &&
    mouseY > ety && mouseY < ety + 30) {
    endTurn(); return;
  }

  // hand cards
  let total = hand.length;
  let startX = W / 2 - (total * (Card_W + 10)) / 2;
  for (let i = 0; i < total; i++) {
    let x = startX + i * (Card_W + 10);
    let y = Hand_Y;
    if (mouseX > x && mouseX < x + Card_W &&
      mouseY > y && mouseY < y + Card_H) {
      playCard(i); return;
    }
  }
}


// INPUT - KEYBOARD


function keyPressed() {
  if (keyCode === ESCAPE) {
    drawPileCheck = false;
    discardPileCheck = false;
  }
}