/*
 *Class: ARTG2262
 *Name: Yiyang Li
 *Email: li.yiyang1@northeastern.edu
 *Assignment: 6
 *Piece Name: Drawing App
 * features:
 *Glow size depends on mouse speed automatically
*/
// Constants
let COLOR_PALETTE = [
  { name: "White", h: 0, s: 0, b: 95 },
  { name: "Red", h: 0, s: 85, b: 90 },
  { name: "Orange", h: 30, s: 90, b: 95 },
  { name: "Yellow", h: 55, s: 90, b: 95 },
  { name: "Green", h: 130, s: 80, b: 75 },
  { name: "Blue", h: 200, s: 80, b: 90 },
  { name: "Purple", h: 270, s: 70, b: 88 },
  { name: "Pink", h: 300, s: 75, b: 92 },
  { name: "Cyan", h: 180, s: 70, b: 80 },
  { name: "Black", h: 0, s: 0, b: 10 },
];

// State variables
let offscreenCanvas;
let brushSize = 18;
let colorIndex = 5; // starts on Blue
let showHUD = true;

// Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  offscreenCanvas = createGraphics(windowWidth, windowHeight);
  offscreenCanvas.colorMode(HSB, 360, 100, 100, 255);
  offscreenCanvas.background(0, 0, 10);
  textFont("monospace");
}

// Main draw loop
function draw() {
  background(0, 0, 10);
  image(offscreenCanvas, 0, 0);

  if (mouseIsPressed && mouseButton === LEFT) doPaint();
  if (mouseIsPressed && mouseButton === RIGHT) doErase();

  drawColorIndicator();
  if (showHUD) drawHUD();
  drawCursor();
}

// Paint
function doPaint() {
  let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let currentColor = COLOR_PALETTE[colorIndex];

  // AUTO: glow size depends on mouse speed
  let glowSize = map(mouseSpeed, 0, 40, 0, 60, true);
  if (glowSize > 4) {
    offscreenCanvas.noStroke();
    offscreenCanvas.fill(
      currentColor.h,
      currentColor.s * 0.5,
      currentColor.b,
      glowSize * 0.65
    );
    offscreenCanvas.ellipse(mouseX, mouseY, brushSize * 3.8, brushSize * 3.8);
  }

  // Draw smooth circle stroke
  let steps = max(1, floor(mouseSpeed / 3));
  offscreenCanvas.noStroke();
  offscreenCanvas.fill(currentColor.h, currentColor.s, currentColor.b, 220);
  for (let i = 0; i <= steps; i++) {
    let ix = lerp(pmouseX, mouseX, i / steps);
    let iy = lerp(pmouseY, mouseY, i / steps);
    offscreenCanvas.ellipse(ix, iy, brushSize, brushSize);
  }
}

// Erase
function doErase() {
  offscreenCanvas.erase(200, 0);
  offscreenCanvas.noStroke();
  offscreenCanvas.ellipse(mouseX, mouseY, brushSize * 2.5, brushSize * 2.5);
  offscreenCanvas.noErase();
}

// Color indicator (top left)
function drawColorIndicator() {
  let c = COLOR_PALETTE[colorIndex];
  // Color swatch
  noStroke();
  fill(c.h, c.s, c.b);
  rect(16, 16, 32, 32, 6);
  // Border
  noFill();
  stroke(0, 0, 100, 150);
  strokeWeight(1.5);
  rect(16, 16, 32, 32, 6);
  // Color name
  noStroke();
  fill(0, 0, 80);
  textSize(11);
  textAlign(LEFT, CENTER);
  text(c.name, 56, 32);
  // Size indicator
  fill(0, 0, 50);
  textSize(11);
  text("Size: " + brushSize, 56, 48);
}

// HUD
function drawHUD() {
  let lines = [
    "DRAW   : Left drag",
    "ERASE  : Right drag",
    "COLOR  : C key",
    "SIZE   : UP / DOWN",
    "CLEAR  : X key",
    "SAVE   : S key",
    "HUD    : H key",
  ];
  let lineHeight = 16;
  let padding = 10;
  let boxW = 190;
  let boxH = lines.length * lineHeight + padding * 2;
  noStroke();
  fill(0, 0, 10, 200);
  rect(16, 68, boxW, boxH, 8);
  textSize(10.5);
  textAlign(LEFT, TOP);
  for (let i = 0; i < lines.length; i++) {
    fill(0, 0, 70);
    text(lines[i], 16 + padding, 68 + padding + i * lineHeight);
  }
}

// Cursor
function drawCursor() {
  let c = COLOR_PALETTE[colorIndex];
  noFill();
  stroke(c.h, 80, 95, 200);
  strokeWeight(1.5);
  ellipse(mouseX, mouseY, brushSize + 6, brushSize + 6);
  stroke(0, 0, 100, 80);
  strokeWeight(0.7);
  ellipse(mouseX, mouseY, brushSize + 12, brushSize + 12);
}

// Keyboard
function keyPressed() {
  if (key === "c" || key === "C")
    colorIndex = (colorIndex + 1) % COLOR_PALETTE.length;
  if (key === "x" || key === "X") offscreenCanvas.background(0, 0, 10);
  if (key === "s" || key === "S")
    saveCanvas(offscreenCanvas, "my-drawing", "png");
  if (key === "h" || key === "H") showHUD = !showHUD;
  if (keyCode === UP_ARROW) brushSize = constrain(brushSize + 2, 2, 120);
  if (keyCode === DOWN_ARROW) brushSize = constrain(brushSize - 2, 2, 120);
  return false;
}

// Window resize
function windowResized() {
  let savedDrawing = offscreenCanvas.get();
  resizeCanvas(windowWidth, windowHeight);
  offscreenCanvas = createGraphics(windowWidth, windowHeight);
  offscreenCanvas.colorMode(HSB, 360, 100, 100, 255);
  offscreenCanvas.background(0, 0, 10);
  offscreenCanvas.image(savedDrawing, 0, 0);
}
