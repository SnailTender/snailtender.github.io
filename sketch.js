// Game state
let gs = {
  button: {
    img: null,
    x: 0,
    y: 0,
    r: 0,
  },
  monitor: {
    img: null,
    x: 0,
    y: 0,
    r: 0,
  },
  desk: {
    img: null,
    x: 0,
    y: 0,
    r: 0,
  },
  timer: {
    elapsed: 0,
    ticking: false,
    max: 10,
  },
  lost: false,
}

function preload() {
  gs.monitor.img = loadImage('assets/images/monitor.png');
  gs.desk.img = loadImage('assets/images/desk.png');
}

function setup() {
  createCanvas(windowWidth, windowWidth*9/16);

  // Initialize objects on screen
  resizeButton();

  // timer ticks every second
  setInterval(function() {
    if (gs.timer.ticking) {
      gs.timer.elapsed += 1;
    }
  }, 1000)
}

function resizeButton() {
  gs.button.x = width/50*26;
  gs.button.y = height/10*7;
  gs.button.r = height/15;
}

function draw() {
  background(220);

  if (gs.lost) {
    text("Time out!", 10, 10, 70, 80);
    return;
  }

// Logic
if (isHoldingButton()) {
  gs.timer.ticking = false;
  gs.timer.elapsed = 0;
} else {
  gs.timer.ticking = true;
}

// Drawings
  image(gs.desk.img, 0, 0, width, height);
  image(gs.monitor.img, 0, 0, width, height);
  drawButton();
  drawHand();
  drawTimer();
}

function isPointInCircle(x, y, cx, cy, radius) {
  var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
}

function drawButton() {
  if (isHoldingButton()) {
    let red = color(255, 0, 0);
    fill(red);
  } else {
    let blue = color(0, 0, 255);
    fill(blue);
  }
  
  noStroke();
  ellipse(gs.button.x, gs.button.y, gs.button.r, gs.button.r);
}

function drawHand() {
  let blue = color(255, 255, 255);
  fill(blue);
  ellipse(mouseX, mouseY, 5, 5);
}

function isHoldingButton() {
  if (mouseIsPressed && isPointInCircle(mouseX, mouseY, gs.button.x, gs.button.y, gs.button.r)){
    return true;
  }

  return false;
}

function drawTimer() {
  stroke(255, 0, 0);
	strokeWeight(10);
  x = map(gs.timer.elapsed, 0, gs.timer.max, 0 , width);
	line(0, 0, x, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth*9/16);

  // resize button
  resizeButton();
}