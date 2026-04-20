//PlayCard
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

//EnemyIntent
function endTurn() {
  if (enemy.hp <= 0) {
    nextEnemy(); return;
  }

  //Discard Remaining
  for (let c of hand) discardPile.push(c);
  hand = [];

  //Act Intent
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

  //PlayerBlock
  player.block = 0;

  //Advance Enemy Intent
  enemy.nextIntent();
  if (enemy.intent === "attack") {
    enemyNextDmg = floor(random(8, 18));
  }

  //Restore Energy
  player.energy = player.maxEnergy;
  drawCards(5);

  //Tick Down
  if (playerDebuffs.weak > 0) playerDebuffs.weak--;
}

//Apply Damage
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

//Add Block
function addBlock(target, amount) {
  if (target === player && playerDebuffs.weak > 0) {
    amount = floor(amount * 0.8);
  }
  target.block += amount;
}

//Next Enemy Transition
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

    //All into drawpile
    let allCards = [];
    for (let i = 0; i < drawPile.length; i++)    allCards.push(drawPile[i]);
    for (let i = 0; i < hand.length; i++)         allCards.push(hand[i]);
    for (let i = 0; i < discardPile.length; i++)  allCards.push(discardPile[i]);

    drawPile = allCards;
    hand = [];
    discardPile = [];
    enemyScale = 0;

    //Animated HP Values
    displayEnemyHp = enemy.hp;

    if (enemyIndex === enemies.length - 1) {
      gameState = "reward";
    } else {
      drawCards(5);
    }
  } else {
    gameState = "win";
  }
}