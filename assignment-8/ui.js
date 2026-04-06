//Menu
function drawMenuScreen() {
  background(...COL_Background);

  menuTimer++;
  if (menuAlpha < 255) {
    menuAlpha += 2;
  }

  if (menuAlpha >= 255) {
    btnVisible = true;
  }

  fill(200, 220, 255, menuAlpha);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(80);
  textFont("Orbitron");
  text("Infinite Edge", W / 2, H / 2 - 100);

  if (btnVisible) {
    if (btnAlpha < 255) {
      btnAlpha += 2;
    }

    if (mouseX > W / 2 - 100 && mouseX < W / 2 + 100 &&
      mouseY > H / 2 && mouseY < H / 2 + 55) {
      fill(50, 70, 120, btnAlpha); // hover 稍亮
    } else {
      fill(25, 40, 80, btnAlpha);  // 默认深蓝，比背景亮一点
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


// WIN / LOSE SCREENS


function drawWinScreen() {
  background(...COL_Background);
  fill(...COL_HpBar);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("You Win!", W / 2, H / 2 - 60);
  drawRetryButton();
  textAlign(LEFT, BASELINE);
}

function drawLoseScreen() {
  background(...COL_Background);
  fill(220, 80, 80);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("You Lose!", W / 2, H / 2 - 60);
  drawRetryButton();
  textAlign(LEFT, BASELINE);
}

function drawRetryButton() {
  let bx = W / 2 - 100;
  let by = H / 2 + 20;
  if (mouseX > bx && mouseX < bx + 200 && mouseY > by && mouseY < by + 55) {
    fill(...COL_EndTurnButtonHover);
  } else {
    fill(...COL_EndTurnButton);
  }
  stroke(...COL_Text);
  rect(bx, by, 200, 55, 8);
  fill(...COL_Text);
  noStroke();
  textSize(22);
  text("Retry", bx + 200 / 2, by + 30);
}


// ENEMY BARS (top)


function drawEnemyBars() {
  drawBar(PlayerBar_X, EnemyHP_Y, PlayerBar_W, BarHeight, enemy.hp, enemy.maxHP, COL_HpBar);
  drawBar(PlayerBar_X, EnemyBlock_Y, PlayerBar_W, BarHeight, enemy.block, enemy.maxHP, COL_BlockBar);

  fill(...COL_Text);
  textSize(13);
  text("HP " + enemy.hp + "/" + enemy.maxHP, PlayerBar_X + 6, EnemyHP_Y + 13);
  if (enemy.block > 0) {
    text("Block " + enemy.block, PlayerBar_X + 6, EnemyBlock_Y + 13);
  }
  textAlign(RIGHT, BASELINE);
  textSize(15);
  text(enemy.name, PlayerBar_X + PlayerBar_W, EnemyHP_Y + 13);
  textAlign(LEFT, BASELINE);
}


// ENEMY SHAPE


function drawEnemyShape() {
  let cx = W / 2;
  let cy = 280;
  let r = 90;

  if (enemyScale < 1) {
    enemyScale += (1 - enemyScale) * 0.1;
    if (enemyScale > 0.99) enemyScale = 1;
  }

  if (shakeTimer > 0) {
    cx += random(-shakeAmount, shakeAmount);
    cy += random(-shakeAmount, shakeAmount);
    shakeTimer--;
    shakeAmount *= 0.92;
  }

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


// ENEMY INTENT


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
  fill(...COL_Text);
  textSize(16);
  text(label, W / 2, 390);
  fill(...COL_SubText);
  textSize(13);
  text(value, W / 2, 410);
  textAlign(LEFT, BASELINE);
}


// HAND


function drawHand() {
  let total = hand.length;
  let startX = W / 2 - (total * (Card_W + 10)) / 2;

  for (let i = 0; i < total; i++) {
    let x = startX + i * (Card_W + 10);
    let y = Hand_Y;
    let hover = mouseX > x && mouseX < x + Card_W &&
      mouseY > y && mouseY < y + Card_H;
    let cardY;
    if (hover) {
      cardY = y - 15;
      fill(...COL_CardHover);
    } else {
      cardY = y;
      fill(...COL_Card);
    }

    stroke(...COL_SubText);
    rect(x, cardY, Card_W, Card_H, 8);

    fill(...COL_Text);
    noStroke();
    textSize(15);
    text(hand[i].name, x + 10, cardY + 25);
    textSize(12);
    text("Cost: " + hand[i].cost, x + 10, cardY + 45);
    textSize(14);
    text(hand[i].value, x + 10, cardY + 68);
  }
}


// BOTTOM HUD


function drawBottomHUD() {
  // energy text
  fill(...COL_Text);
  textSize(14);
  text("Energy: " + player.energy + "/" + player.maxEnergy, PlayerBar_X, EnergyText_Y);

  // weak debuff
  if (playerDebuffs.weak > 0) {
    fill(...COL_WeakDebuff);
    textSize(13);
    text("Weak: " + playerDebuffs.weak, PlayerBar_X + 130, EnergyText_Y);
  }

  // draw pile button (bottom left)
  let drawHover = mouseX > PlayerBar_X && mouseX < PlayerBar_X + 110 &&
    mouseY > cardPileB_Y - 20 && mouseY < cardPileB_Y + 5;
  drawPileBtn(PlayerBar_X, cardPileB_Y, "Draw: " + drawPile.length, drawHover);

  // end turn button (top right of HUD)
  let etx = PlayerBar_X + PlayerBar_W - 160;
  let ety = EnergyText_Y - 22;
  let etHov = mouseX > etx && mouseX < etx + 160 && mouseY > ety && mouseY < ety + 30;
  if (etHov) {
    fill(...COL_EndTurnButtonHover);
  } else {
    fill(...COL_EndTurnButton);
  }
  stroke(...COL_SubText);
  rect(etx, ety, 160, 30, 6);
  fill(...COL_Text); noStroke(); textSize(14);
  text("End Turn", etx + 35, ety + 20);

  // discard pile button (bottom right)
  let dx = PlayerBar_X + PlayerBar_W - 110;
  let discardHov = mouseX > dx && mouseX < dx + 110 &&
    mouseY > cardPileB_Y - 20 && mouseY < cardPileB_Y + 5;
  drawPileBtn(dx, cardPileB_Y, "Discard: " + discardPile.length, discardHov);

  // player block bar
  drawBar(PlayerBar_X, PlayerBlock_Y, PlayerBar_W, BarHeight, player.block, player.maxHP, COL_BlockBar);
  if (player.block > 0) {
    fill(...COL_Text); textSize(12);
    text("Block " + player.block, PlayerBar_X + 6, PlayerBlock_Y + 13);
  }

  // player hp bar
  drawBar(PlayerBar_X, PlayerHP_Y, PlayerBar_W, BarHeight, player.hp, player.maxHP, COL_HpBar);
  fill(...COL_Text); textSize(12);
  text("HP " + player.hp + "/" + player.maxHP, PlayerBar_X + 6, PlayerHP_Y + 13);
}

function drawPileBtn(x, y, label, isHovered) {
  if (isHovered) {
    fill(...COL_PileButtonHover);
  } else {
    fill(...COL_PileButton);
  }
  stroke(...COL_SubText);
  rect(x, y - 20, 110, 25, 5);
  fill(...COL_Text); noStroke(); textSize(12);
  text(label, x + 6, y - 4);
}


// OVERLAYS


function drawOverlays() {
  if (drawPileCheck) viewPile(drawPile, "Draw Pile");
  if (discardPileCheck) viewPile(discardPile, "Discard Pile");
}

function viewPile(pile, title) {
  fill(0, 0, 0, 180); noStroke();
  rect(0, 0, W, H);
  fill(...COL_Text); textSize(22);
  textAlign(CENTER, BASELINE);
  text(title + " (" + pile.length + ")", W / 2, 80);
  textAlign(LEFT, BASELINE);

  for (let i = 0; i < pile.length; i++) {
    let x = 100 + (i % 7) * 160;
    let y = 110 + floor(i / 7) * 200;
    fill(...COL_Card); stroke(...COL_SubText);
    rect(x, y, Card_W, Card_H, 8);
    fill(...COL_Text); noStroke();
    textSize(14);
    text(pile[i].name, x + 10, y + 25);
    textSize(12);
    text("Cost: " + pile[i].cost, x + 10, y + 45);
    textSize(13);
    text(pile[i].value, x + 10, y + 65);
  }

  fill(...COL_SubText); textSize(13);
  textAlign(CENTER, BASELINE);
  text("Press ESC to close", W / 2, H - 20);
  textAlign(LEFT, BASELINE);
}


// BAR UTILITY


function drawBar(x, y, w, h, current, max, col) {
  fill(...COL_BarTrack); noStroke();
  rect(x, y, w, h, 4);
  if (current > 0) {
    fill(...col);
    rect(x, y, w * (current / max), h, 4);
  }
}