// menu screen with fade-in animation
function drawMenuScreen() {
  background(...colBackground);

  if (menuAlpha < 255) menuAlpha += 2;
  if (menuAlpha >= 255) btnVisible = true;

  fill(200, 220, 255, menuAlpha);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(80);
  textFont("Orbitron");
  text("Infinite Edge", W / 2, H / 2 - 100);

  if (btnVisible) {
    if (btnAlpha < 255) btnAlpha += 2;

    if (mouseX > W / 2 - 100 && mouseX < W / 2 + 100 &&
      mouseY > H / 2 && mouseY < H / 2 + 55) {
      fill(50, 70, 120, btnAlpha);
    } else {
      fill(25, 40, 80, btnAlpha);
    }
    noStroke();
    rect(W / 2 - 100, H / 2, 200, 55, 8);
    fill(200, 220, 255, btnAlpha);
    noStroke();
    textSize(22);
    text("Start", W / 2, H / 2 + 30);
  }

  textAlign(LEFT, BASELINE);
}

// win screen
function drawWinScreen() {
  background(...colBackground);
  fill(...colHpBar);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("You Win!", W / 2, H / 2 - 60);
  drawRetryButton();
  textAlign(LEFT, BASELINE);
}

// lose screen
function drawLoseScreen() {
  background(...colBackground);
  fill(220, 80, 80);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("You Lose!", W / 2, H / 2 - 60);
  drawRetryButton();
  textAlign(LEFT, BASELINE);
}

// retry button shared by win/lose screens
function drawRetryButton() {
  let bx = W / 2 - 100;
  let by = H / 2 + 20;
  if (mouseX > bx && mouseX < bx + 200 && mouseY > by && mouseY < by + 55) {
    fill(...colEndTurnButtonHover);
  } else {
    fill(...colEndTurnButton);
  }
  stroke(...colText);
  rect(bx, by, 200, 55, 8);
  fill(...colText);
  noStroke();
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Retry", bx + 100, by + 30);
  textAlign(LEFT, BASELINE);
}

// reward screen — three choices after defeating the second-to-last enemy
function drawRewardScreen() {
  background(...colBackground);
  fill(...colText);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Choose a Reward", W / 2, H / 2 - 200);
  drawRewardOption(W / 2 - 400, H / 2 - 80, "Heal", "Restore 25 HP");
  drawRewardOption(W / 2, H / 2 - 80, "Strike+", "Attacks deal +2 damage");
  drawRewardOption(W / 2 + 400, H / 2 - 80, "Defend+", "Blocks absorb +2 damage");
  textAlign(LEFT, BASELINE);
}

function drawRewardOption(cx, cy, title, desc) {
  let hover = mouseX > cx - 120 && mouseX < cx + 120 &&
    mouseY > cy - 80 && mouseY < cy + 80;
  if (hover) { fill(...colCardHover); } else { fill(...colCard); }
  stroke(...colText);
  rect(cx - 120, cy - 80, 240, 160, 10);
  fill(...colText);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text(title, cx, cy - 20);
  textSize(14);
  fill(...colSubText);
  text(desc, cx, cy + 20);
}

// enemy hp and block bars at top of screen
function drawEnemyBars() {
  // smooth hp animation
  displayEnemyHp += (enemy.hp - displayEnemyHp) * 0.1;

  drawBar(playerBarX, enemyHpY, playerBarW, barHeight, displayEnemyHp, enemy.maxHP, colHpBar);
  drawBar(playerBarX, enemyBlockY, playerBarW, barHeight, enemy.block, enemy.maxHP, colBlockBar);

  fill(...colText);
  textSize(13);
  text("HP " + enemy.hp + "/" + enemy.maxHP, playerBarX + 6, enemyHpY + 13);
  if (enemy.block > 0) {
    text("Block " + enemy.block, playerBarX + 6, enemyBlockY + 13);
  }
  textAlign(RIGHT, BASELINE);
  textSize(15);
  text(enemy.name, playerBarX + playerBarW, enemyHpY + 13);
  textAlign(LEFT, BASELINE);
}

// enemy shape with entrance, shake, and rotation animations
function drawEnemyShape() {
  let cx = W / 2;
  let cy = 280;
  let r = 90;

  // entrance scale animation
  if (enemyScale < 1) {
    enemyScale += (1 - enemyScale) * 0.1;
    if (enemyScale > 0.99) enemyScale = 1;
  }

  // shake on hit
  if (shakeTimer > 0) {
    cx += random(-shakeAmount, shakeAmount);
    cy += random(-shakeAmount, shakeAmount);
    shakeTimer--;
    shakeAmount *= 0.92;
  }

  // rotation on attack
  if (isRotating) {
    let progress = enemyRotation / TWO_PI;
    let speed = sin(progress * PI) * 0.4 + 0.08;
    enemyRotation += speed;
    if (enemyRotation >= TWO_PI) {
      enemyRotation = 0;
      isRotating = false;
    }
  }

  push();
  translate(cx, cy);
  scale(enemyScale);
  rotate(enemyRotation);
  if (hitTimer > 0) {
    fill(255, 80, 80);
    hitTimer--;
  } else {
    fill(...enemy.shapeColor);
  }
  noStroke();
  if (enemy.sides === 0) {
    ellipse(0, 0, r * 2, r * 2);
  } else {
    drawPolygon(0, 0, r, enemy.sides);
  }
  pop();
}

function drawPolygon(cx, cy, r, sides) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = TWO_PI / sides * i - HALF_PI;
    vertex(cx + cos(angle) * r, cy + sin(angle) * r);
  }
  endShape(CLOSE);
}

// enemy intent label and value below the shape
function drawEnemyIntent() {
  let label = "";
  let value = "";

  if (enemy.intent === "attack") {
    if (charged) {
      label = "Attack (!)";
      value = (enemyNextDmg + chargeBonus) + " (+5)";
    } else {
      label = "Attack";
      value = String(enemyNextDmg + enemy.strength);
    }
  } else if (enemy.intent === "defend") {
    label = "Defend";
    value = "+10 Block";
  } else if (enemy.intent === "charge") {
    label = "Charge";
    value = "+5 next atk";
  } else if (enemy.intent === "debuff") {
    label = "Debuff";
    value = "Weak";
  } else if (enemy.intent === "heal") {
    label = "Buff";
    value = "Heal";
  } else if (enemy.intent === "wall") {
    label = "!Wall!";
    value = "+40 Block";
  }

  textAlign(CENTER, BASELINE);
  fill(...colText);
  textSize(16);
  text(label, W / 2, 390);
  fill(...colSubText);
  textSize(13);
  text(value, W / 2, 410);
  textAlign(LEFT, BASELINE);
}

// hand cards
function drawHand() {
  let total = hand.length;
  let startX = W / 2 - (total * (cardW + 10)) / 2;

  for (let i = 0; i < total; i++) {
    let x = startX + i * (cardW + 10);
    let y = handY;
    let hover = mouseX > x && mouseX < x + cardW &&
      mouseY > y && mouseY < y + cardH;
    let cardY;
    if (hover) {
      cardY = y - 15;
      fill(...colCardHover);
    } else {
      cardY = y;
      fill(...colCard);
    }

    stroke(...colSubText);
    rect(x, cardY, cardW, cardH, 8);

    fill(...colText);
    noStroke();
    textSize(15);
    text(hand[i].name, x + 10, cardY + 25);
    textSize(12);
    text("Cost: " + hand[i].cost, x + 10, cardY + 45);
    textSize(14);

    if (hand[i].type === "attack") {
      if (playerBuffs.strikeBonus > 0) { fill(255, 220, 50); } else { fill(...colText); }
      text(hand[i].value + playerBuffs.strikeBonus, x + 10, cardY + 68);
    } else if (hand[i].type === "block") {
      if (playerBuffs.defendBonus > 0) { fill(255, 220, 50); } else { fill(...colText); }
      text(hand[i].value + playerBuffs.defendBonus, x + 10, cardY + 68);
    } else {
      fill(...colText);
      text(hand[i].value, x + 10, cardY + 68);
    }
  }
}

// bottom HUD: energy, pile buttons, end turn, bars
function drawBottomHUD() {
  // energy icon and number
  image(starImg, playerBarX + 12, energyTextY - 70, 80, 80);
  fill(100, 100, 100);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text(player.energy, playerBarX + 53, energyTextY - 27);
  fill(255, 255, 255);
  text(player.energy, playerBarX + 52, energyTextY - 28);
  textAlign(LEFT, BASELINE);

  // weak debuff indicator
  if (playerDebuffs.weak > 0) {
    fill(...colWeakDebuff);
    textSize(13);
    text("Weak: " + playerDebuffs.weak, playerBarX + 130, energyTextY);
  }

  // draw pile button (bottom left)
  let drawHover = mouseX > playerBarX && mouseX < playerBarX + 110 &&
    mouseY > cardPileBY - 20 && mouseY < cardPileBY + 5;
  drawPileBtn(playerBarX, cardPileBY, "Draw: " + drawPile.length, drawHover);

  // end turn button (right side)
  let etx = playerBarX + playerBarW - 160;
  let ety = energyTextY - 22;
  let etHov = mouseX > etx && mouseX < etx + 160 && mouseY > ety && mouseY < ety + 30;
  if (etHov) { fill(...colEndTurnButtonHover); } else { fill(...colEndTurnButton); }
  stroke(...colSubText);
  rect(etx, ety, 160, 30, 6);
  fill(...colText); noStroke(); textSize(14);
  text("End Turn", etx + 35, ety + 20);

  // discard pile button (bottom right)
  let dx = playerBarX + playerBarW - 110;
  let discardHov = mouseX > dx && mouseX < dx + 110 &&
    mouseY > cardPileBY - 20 && mouseY < cardPileBY + 5;
  drawPileBtn(dx, cardPileBY, "Discard: " + discardPile.length, discardHov);

  // tutorial button (bottom right corner)
  let tx = playerBarX + playerBarW - 40;
  let ty = cardPileBY - 55;
  let tHov = mouseX > tx && mouseX < tx + 30 && mouseY > ty && mouseY < ty + 30;
  if (tHov) { fill(...colTutorialButtonHover); } else { fill(...colTutorialButton); }
  stroke(...colSubText);
  rect(tx, ty, 30, 30, 6);
  fill(...colText); noStroke(); textSize(16);
  textAlign(CENTER, CENTER);
  text("?", tx + 15, ty + 16);
  textAlign(LEFT, BASELINE);

  // player block bar
  drawBar(playerBarX, playerBlockY, playerBarW, barHeight, player.block, player.maxHP, colBlockBar);
  if (player.block > 0) {
    fill(...colText); textSize(12);
    text("Block " + player.block, playerBarX + 6, playerBlockY + 13);
  }

  // player hp bar with smooth animation
  displayPlayerHp += (player.hp - displayPlayerHp) * 0.1;
  drawBar(playerBarX, playerHpY, playerBarW, barHeight, displayPlayerHp, player.maxHP, colHpBar);
  fill(...colText); textSize(12);
  text("HP " + player.hp + "/" + player.maxHP, playerBarX + 6, playerHpY + 13);
}

function drawPileBtn(x, y, label, isHovered) {
  if (isHovered) { fill(...colPileButtonHover); } else { fill(...colPileButton); }
  stroke(...colSubText);
  rect(x, y - 20, 110, 25, 5);
  fill(...colText); noStroke(); textSize(12);
  text(label, x + 6, y - 4);
}

// pile viewer overlay
function drawOverlays() {
  if (drawPileCheck) viewPile(drawPile, "Draw Pile");
  if (discardPileCheck) viewPile(discardPile, "Discard Pile");
  if (tutorialOpen) drawTutorial();
}

function viewPile(pile, title) {
  fill(0, 0, 0, 180); noStroke();
  rect(0, 0, W, H);
  fill(...colText); textSize(22);
  textAlign(CENTER, BASELINE);
  text(title + " (" + pile.length + ")", W / 2, 80);
  textAlign(LEFT, BASELINE);

  for (let i = 0; i < pile.length; i++) {
    let x = 100 + (i % 7) * 160;
    let y = 110 + floor(i / 7) * 200;
    fill(...colCard); stroke(...colSubText);
    rect(x, y, cardW, cardH, 8);
    fill(...colText); noStroke();
    textSize(14);
    text(pile[i].name, x + 10, y + 25);
    textSize(12);
    text("Cost: " + pile[i].cost, x + 10, y + 45);
    textSize(13);
    text(pile[i].value, x + 10, y + 65);
  }

  fill(...colSubText); textSize(13);
  textAlign(CENTER, BASELINE);
  text("Press ESC to close", W / 2, H - 20);
  textAlign(LEFT, BASELINE);
}

// tutorial overlay
function drawTutorial() {
  fill(0, 0, 0, 200); noStroke();
  rect(0, 0, W, H);

  fill(...colCard); stroke(...colSubText);
  rect(W / 2 - 400, 60, 800, 580, 12);

  fill(...colText); noStroke();
  textAlign(CENTER, BASELINE);
  textSize(28);
  text("How to Play", W / 2, 110);

  textAlign(LEFT, BASELINE);
  textSize(14);
  fill(...colText);

  let lines = [
    "GOAL",
    "Defeat all 5 enemies to win.",
    "",
    "CARDS",
    "Click a card to play it. Each card costs Energy.",
    "Strike — deals damage to the enemy.",
    "Defend — gives you Block (absorbs incoming damage).",
    "Bash — deals heavy damage.",
    "Recharge — restores 1 Energy.",
    "",
    "ENERGY",
    "You have 3 Energy per turn. Unused energy does not carry over.",
    "",
    "BLOCK",
    "Block absorbs damage. It resets to 0 at the end of each turn.",
    "Weak debuff reduces your Block gain by 20%.",
    "",
    "ENEMY INTENT",
    "The label below the enemy shows what it will do next turn.",
    "Attack — it will deal damage.",
    "Defend — it will gain Block.",
    "Charge — next attack deals +5 bonus damage.",
    "Debuff — it will apply Weak to you.",
    "",
    "PILES",
    "Draw pile (bottom left) — cards you will draw next.",
    "Discard pile (bottom right) — cards you have played.",
    "Click either to inspect them.",
  ];

  let startY = 145;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === lines[i].toUpperCase() && lines[i] !== "") {
      fill(255, 220, 50); // section headers in yellow
    } else {
      fill(...colText);
    }
    text(lines[i], W / 2 - 370, startY + i * 18);
  }

  fill(...colSubText); textSize(13);
  textAlign(CENTER, BASELINE);
  text("Press ESC to close", W / 2, 620);
  textAlign(LEFT, BASELINE);
}

// bar utility
function drawBar(x, y, w, h, current, max, col) {
  fill(...colBarTrack); noStroke();
  rect(x, y, w, h, 4);
  if (current > 0) {
    fill(...col);
    rect(x, y, w * (current / max), h, 4);
  }
}