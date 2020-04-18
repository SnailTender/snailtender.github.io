// Game state
let gs = {
  finger: {
    img: null,
    imgPressed: null,
  },
  button: {
    img: null,
    imgPressed: null,
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
  gs.button.img = loadImage('assets/images/buttonOff.png');
  gs.button.imgPressed = loadImage('assets/images/buttonPress.png');
  gs.finger.img = loadImage('assets/images/fingerPoint.png');
  gs.finger.imgPressed = loadImage('assets/images/fingerPress.png');

}

function setup() {
  createCanvas(1280, 720);
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
    image(gs.button.imgPressed, gs.button.x - gs.button.imgPressed.width/2, gs.button.y - gs.button.imgPressed.height/2);
  } else {
    image(gs.button.img, gs.button.x - gs.button.img.width/2, gs.button.y - gs.button.img.height/2);
  }
}

function drawHand() {
  if (mouseIsPressed) {
    image(gs.finger.imgPressed, mouseX - gs.finger.imgPressed.width/10, mouseY - gs.finger.imgPressed.height/10);
  } else {
    image(gs.finger.img, mouseX - gs.finger.img.width/10, mouseY - gs.finger.img.height/10);
  }
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