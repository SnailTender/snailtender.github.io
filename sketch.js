// Game state
let gs;

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/font/SegoePrint.ttf');
}

function setup() {
    //Images
    monitorImg = loadImage('assets/images/monitor.png');
    deskImg = loadImage('assets/images/desk.png');
    buttonImg = loadImage('assets/images/buttonOff.png');
    buttonImgPressed = loadImage('assets/images/buttonPress.png');
    fingerImg = loadImage('assets/images/fingerPoint.png');
    fingerImgPressed = loadImage('assets/images/fingerPress.png');
    alarmImg = loadImage('assets/images/alarmclock.png');
    clock12Img = loadImage('assets/images/clock12.png');

    canvasWidth = 1280;
    canvasHeight = 720;
    createCanvas(canvasWidth, canvasHeight);

    // Initialize gamestate
    gs = {};

    gs.button = new Button(
        buttonImg,
        buttonImgPressed,
        new HitBox(canvasWidth / 50 * 26, canvasHeight / 10 * 7, canvasHeight / 15),
    );

    gs.finger = new Finger(
        fingerImg,
        fingerImgPressed,
    );

    gs.desk = {
        img: deskImg,
    };

    gs.monitor = {
        img: monitorImg,
    };

    gs.clock = new Clock(
        alarmImg,
        clock12Img
    );

    // main game timer ticks every second and ends at 4 seconds
    gs.timer = new Timer(3000, 1000);

    // Set text characteristics
    textFont(font);
}

function draw() {
    background(220);

    // Lose
    if (gs.timer.done) {
        // Print text
        stroke(0, 0, 0);
        strokeWeight(1);
        textAlign(CENTER, CENTER);

        textSize(80);
        text("Time out!", width / 2, height / 2);

        textSize(40);
        text("\n\n\nClick to try again", width / 2, height / 2);

        if (mouseIsPressed) {
            setup();
        }
        return;
    }

    // Logic
    if (gs.button.hb.isPressed()) {
        gs.timer.reset();
    } else {
        gs.timer.resume();
    }

    gs.clock.update();

    // Drawings
    image(gs.desk.img, 0, 0, width, height);
    image(gs.monitor.img, 0, 0, width, height);

    gs.button.draw();
    gs.timer.drawTop();
    gs.clock.draw();

    // Draw hand last
    gs.finger.draw();
}