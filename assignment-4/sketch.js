function keyPressed() {
  // Was it the upper/lower 'S' key?
  if (key == "S" || key == "s") {
    saveCanvas("assignment[3]_pattern_Li_Yiyang");
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noStroke();
  let color = 0;
  let ja = (width + height) / 1.5;
  for (let a = 0; a <= 6; a++) {
    fill(40, color, color);
    circle(width / 2, height / 2, ja);
    ja -= 65;
    color += 40;
  }
  strokeWeight(15);
  stroke(0, 0, 0, 150);
  for (let i = 0; i <= width * 2; i += width / 8) {
    line(i, 0, 0, i);
  }
  push();
  translate(0, height);
  scale(1, -1);
  let c = 235;
  strokeWeight(20);
  for (let i = 0; i <= width * 2; i += width / 8) {
    stroke(c, 201, 255);
    line(i, 0, 0, i);
    c -= 10;
  }
  strokeWeight(15);
  stroke(0, 0, 0);
  for (let i = 0; i <= width * 2; i += width / 8) {
    line(i, 0, 0, i);
  }
  pop();
  rectMode(CENTER);
  noStroke();
  noLoop();
}
