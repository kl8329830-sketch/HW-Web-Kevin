// play a card from hand
function playCard(i) {
  let card = hand[i];
  if (card.cost > player.energy) return;

  hand.splice(i, 1);
  discardPile.push(card);

  if (card.type === "attack") {
    if (card.value + playerBuffs.strikeBonus >= enemy.hp + enemy.block) {
      player.energy = player.maxEnergy;
      dealDamage(enemy, card.value + playerBuffs.strikeBonus);
    } else {
      dealDamage(enemy, card.value + playerBuffs.strikeBonus);
      player.energy -= card.cost;
    }
  } else if (card.type === "block") {
    addBlock(player, card.value + playerBuffs.defendBonus);
    player.energy -= card.cost;
  } else if (card.type === "mana") {
    player.energy += card.value;
  }
}

// end the player's turn and resolve enemy intent
function endTurn() {
  if (enemy.hp <= 0) {
    nextEnemy(); return;
  }

  // discard remaining hand
  for (let c of hand) discardPile.push(c);
  hand = [];

  // enemy acts on current intent
  if (enemy.intent === "attack") {
    let dmg = enemyNextDmg + enemy.strength;
    if (charged) {
      dmg += chargeBonus;
      charged = false;
    }
    isRotating = true;
    dealDamage(player, dmg);
    enemy.strength += enemy.strengthGain;
  } else if (enemy.intent === "defend") {
    addBlock(enemy, 10);
  } else if (enemy.intent === "charge") {
    charged = true;
  } else if (enemy.intent === "debuff") {
    playerDebuffs.weak = 2 + enemy.debuffStrength;
  } else if (enemy.intent === "heal") {
    enemy.hp += 10;
    if (enemy.hp > enemy.maxHP) enemy.hp = enemy.maxHP;
  } else if (enemy.intent === "wall") {
    addBlock(enemy, 40);
  }

  // player block resets every turn
  player.block = 0;

  // advance enemy intent and pre-roll next attack damage
  enemy.nextIntent();
  if (enemy.intent === "attack") {
    enemyNextDmg = floor(random(8, 18));
  }

  // restore energy and draw new hand
  player.energy = player.maxEnergy;
  drawCards(5);

  // tick down debuffs
  if (playerDebuffs.weak > 0) playerDebuffs.weak--;
}

// apply damage to a target, reduced by block
function dealDamage(target, amount) {
  let actual = max(0, amount - target.block);
  target.block = max(0, target.block - amount);
  target.hp -= actual;
  if (target.hp < 0) target.hp = 0;

  if (target === player && target.hp <= 0) gameState = "lose";
  if (target === enemy) {
    hitTimer = 10;
    shakeTimer = 12;
    shakeAmount = 8;
    if (target.hp <= 0) nextEnemy();
  }
}

// add block to a target, reduced if player is weak
function addBlock(target, amount) {
  if (target === player && playerDebuffs.weak > 0) {
    amount = floor(amount * 0.8);
  }
  target.block += amount;
}

// transition to the next enemy
function nextEnemy() {
  enemyIndex++;
  if (enemyIndex < enemies.length) {
    enemy = enemies[enemyIndex];
    enemy.cycleIndex = 0;
    enemy.intent = enemy.intentCycle[0];

    charged = false;
    playerDebuffs.weak = 0;
    player.block = 0;
    enemyNextDmg = floor(random(5, 11));

    // merge all cards back into draw pile
    let allCards = [];
    for (let i = 0; i < drawPile.length; i++)    allCards.push(drawPile[i]);
    for (let i = 0; i < hand.length; i++)         allCards.push(hand[i]);
    for (let i = 0; i < discardPile.length; i++)  allCards.push(discardPile[i]);

    drawPile = allCards;
    hand = [];
    discardPile = [];
    enemyScale = 0;

    // sync animated hp values
    displayEnemyHp = enemy.hp;

    if (enemyIndex === enemies.length - 1) {
      gameState = "reward"; // show reward screen before final enemy
    } else {
      drawCards(5);
    }
  } else {
    gameState = "win";
  }
}