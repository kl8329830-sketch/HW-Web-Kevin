/*
Name: Kevin Li (Yiyang)
Email: li.yiyang1@northeastern.edu
Course: Prototyping with Code tool
Lab: Lab 2
Assignment: Assignment 3
Title: "Self" Portrait - Frieren
*/
function setup() 
{
  createCanvas(400, 400);
}

function draw() 
{
  background(80);
  //Clothes
  fill(185, 159, 117);
  quad(88,400,92,320,308,320,312,400);
  fill(240, 240, 240);
  quad(92,400,96,324,304,324,308,400);
  fill(185, 159, 117);
  quad(158,322,158,400,168,400,168,322);
  quad(242,322,242,400,232,488,232,322);
  stroke(100,100,100);
  line(163,324,163,400);
  line(237,324,237,400);
  //HairBack
  noStroke();
  fill(237, 242, 247);
  quad(95,120,135,165,135,400,95,350);
  quad(305,120,265,165,265,400,305,350);
  triangle(95,120,135,165,150,145);
  triangle(305,120,265,165,250,145);
  //Ears
  noStroke();
  fill(247,239,218);
  quad(60,200,115,240,285,240,340,200);
  fill(219, 211, 189);
  quad(90,210,120,230,280,230,310,210);
  fill(247,239,218);
  //Neck
  quad(182,280,218,280,218,300,182,300);
  //Face
  ellipse(200,200,150,165);
  //HairMask
  let cx = 200, cy = 200;
  let w = 150, h = 165;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.ellipse(cx,cy,w/2,h/2,0,0,Math.PI*2);
  drawingContext.clip(); 
  //Hair
  push();
  noStroke();
  translate(150,140);
  rotate(PI/4);
  fill(237, 242, 247);
  ellipse(0,0,90,120);
  pop();
  
  push();
  noStroke();
  translate(250,140);
  rotate(-PI/4);
  fill(237, 242, 247);
  ellipse(0,0,90,120);
  pop();

  drawingContext.restore();
  fill(237, 242, 247);
  //hair
  quad(125,190,125,270,150,250,160,160);
  quad(275,190,275,270,250,250,240,160);
  //clotheNeck
  fill(185, 159, 117);
  quad(175,290,225,290,225,320,175,320);
  fill(240, 240, 240);
  quad(175,295,225,295,225,315,175,315);
  fill(150, 6, 6);
  circle(188,305,9);
  //Text
  textSize(25);
  fill(245,245,245);
  text("Frieren",15,35);
}