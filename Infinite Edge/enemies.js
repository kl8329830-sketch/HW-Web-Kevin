// enemy class
class Enemy {
  constructor(name, hp, intentCycle, shapeColor, sides, strengthGain = 0, debuffStrength = 0) {
    this.name = name;
    this.hp = hp;
    this.maxHP = hp;
    this.block = 0;
    this.intentCycle = intentCycle;
    this.cycleIndex = 0;
    this.intent = intentCycle[0];
    this.shapeColor = shapeColor;
    this.sides = sides;
    this.strength = 0;
    this.strengthGain = strengthGain;
    this.debuffStrength = debuffStrength;
  }

  nextIntent() {
    this.cycleIndex = (this.cycleIndex + 1) % this.intentCycle.length;
    this.intent = this.intentCycle[this.cycleIndex];
  }
}

// enemy list
function makeEnemies() {
  return [
    new Enemy("Triangle", 30, ["attack", "defend", "charge"], [120, 220, 255], 3),
    new Enemy("Square", 40, ["attack", "defend", "debuff", "attack"], [180, 255, 180], 4, 0, 2),
    new Enemy("Pentagon", 50, ["attack", "attack", "attack", "attack"], [255, 200, 100], 5, 2),
    new Enemy("Hexagon", 60, ["defend", "attack", "debuff", "attack"], [255, 200, 100], 6, 4, 2),
    new Enemy("Sphere", 100, ["wall", "attack", "attack", "debuff", "attack", "charge", "attack", "heal"], [255, 200, 100], 0, 5, 3),
  ];
}