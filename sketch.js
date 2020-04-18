let computerImg;
let button = {
  x: 300,
  y: 250,
  r: 30
}
let touchingButton = false;
let timer;
let lose = false;

function preload() {
  computerImg = loadImage('assets/images/computer.png');
}

function setup() {
  createCanvas(600, 400);
  t = setTimeout(function() {
    lose = true;
  }, 10000); 
}

function draw() {
  background(220);

  if (lose) {
    text("Time out!", 10, 10, 70, 80);
    return;
  }

// Logic
if (mouseIsPressed && isPointInCircle(mouseX, mouseY, button.x, button.y, button.r)) {
  touchingButton = true;
}


// Drawings
  image(computerImg, 225, 110, 150, 100);
  drawButton();
  drawHand();
}

function isPointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

function drawButton() {
  if (mouseIsPressed && isPointInCircle(mouseX, mouseY, button.x, button.y, button.r)) {
    let red = color(255, 0, 0);
    fill(red);
  } else {
    let blue = color(0, 0, 255);
    fill(blue);
  }
  
  noStroke();
  ellipse(button.x, button.y, button.r, button.r);
}

function drawHand() {
  let blue = color(255, 255, 255);
  fill(blue);
  ellipse(mouseX, mouseY, 5, 5);
}

function mouseReleased() {
  if (touchingButton) {
    touchingButton = false;
  }
}