let computerImg;

function preload() {
  computerImg = loadImage('assets/images/computer.png');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(computerImg, 10, 10, 50, 50);
}