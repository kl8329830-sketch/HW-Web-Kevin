/*
  Class: ARTG2262
  Name: Yiyang Li
  Email: li.yiyang1@northeastern.edu
  Assignment: 5
  Piece Name: Radiate
*/

let circles = [];
let Squares = [];

function spawnCircle() {
  circles.push({
    x: width / 2,
    y: height / 2,
    r: 0,
    speed: random(1.5, 4),
    maxR: random(100, Math.min(width, height) * 0.8),
    hue: random(360),
  });
}

function spawnSquare() {
  Squares.push({
    x: width / 2,
    y: height / 2,
    size: 0,
    speed: random(1.5, 4),
    maxS: random(100, Math.min(width, height) * 0.8),
    hue: random(360),
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  spawnCircle();
}

function draw() {
  background(0, 0, 0, 15);
  if (frameCount % 80 === 0) spawnCircle();
  if (frameCount % 80 === 25) spawnSquare();

  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    c.r += c.speed;
    c.alpha = map(c.r, 0, c.maxR, 80, 0);
    stroke(c.hue, 80, 100, c.alpha);
    strokeWeight(2);
    ellipse(c.x, c.y, c.r * 2);
    if (c.r > c.maxR) circles.splice(i, 1);
  }
  for (let i = Squares.length - 1; i >= 0; i--) {
    let sq = Squares[i];
    sq.size += sq.speed;
    sq.alpha = map(sq.size, 0, sq.maxS, 80, 0);
    stroke(sq.hue, 80, 100, sq.alpha);
    strokeWeight(2);
    rectMode(CENTER);
    rect(sq.x, sq.y, sq.size, sq.size);
    if (sq.size > sq.maxS) Squares.splice(i, 1);
  }

  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);

  noStroke();
  fill(0, 0, 100, 90);
  textAlign(CENTER);
  textSize(width * 0.07);
  text(h + ":" + m + ":" + s, width / 2, height * 0.75);

  textSize(width * 0.015);
  fill(0, 0, 100, 60);
  text(
    year() + "." + nf(month(), 2) + "." + nf(day(), 2),
    width / 2,
    height * 0.75 + height * 0.06
  );

  noFill();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
