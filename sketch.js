// Game state
let gs;
let alarmClock;

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = loadFont('assets/font/SegoePrint.ttf');
}

function setup() {
    //Images
    monitorImg = loadImage('assets/images/monitor.png');
    monitorDeadImg = loadImage('assets/images/monitorDead.png')
    deskImg = loadImage('assets/images/desk.png');
    buttonImg = loadImage('assets/images/buttonOff.png');
    buttonImgPressed = loadImage('assets/images/buttonPress.png');
    fingerImg = loadImage('assets/images/fingerPoint.png');
    fingerImgPressed = loadImage('assets/images/fingerPress.png');
    alarmImg = loadImage('assets/images/alarmclock.png');
    alarmImgPressed = loadImage('assets/images/alarmclockPressed.png');
    clock12Img = loadImage('assets/images/clock12.png');
    clock420Img = loadImage('assets/images/clock420.png');
    clockBoobImg = loadImage('assets/images/clockBoob.png');
    glassesGuyImg = loadImage('assets/images/glassesGuy0.png');
    glassesGuyImgPressed = loadImage('assets/images/glassesGuy1.png');

    // sound
    alarmSound = loadSound('assets/sounds/alarm.mp3');
	gameoverSound = loadSound('assets/sounds/error.mp3');

    canvasWidth = 1280;
    canvasHeight = 720;
    createCanvas(canvasWidth, canvasHeight);

	goSoundPlayed = 0;

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
        imgDead: monitorDeadImg,
    };

    alarmClock = new Clock(
        alarmImg,
        alarmImgPressed,
        clock12Img,
        alarmSound,
        new HitBox(canvasWidth / 8, canvasHeight / 10, canvasHeight / 7),
    );

    // On screen events
    gs.events = [];

    // main game timer ticks every second and ends at 4 seconds
    gs.timer = new Timer(3000, 1000, onGameTimerTick);

    // Set text characteristics
    textFont(font);
}

function draw() {
    background(220);

    { // Logic
        if (!gs.timer.done) {
            if (gs.button.hb.isPressed()) {
                gs.timer.reset();
            } else {
                gs.timer.resume();
            }

            // Update all events
            for (i = 0; i < gs.events.length; i++) {
                // remove event when compeleted
                if (gs.events[i].done && !gs.events[i].transition.isTransitioning()) {
                    gs.events.splice(i, 1);
                    i--;
                    continue;
                }

                gs.events[i].update();
            }
        } else { // end game logic
            // End all events when the game ends
            for (i = 0; i < gs.events.length; i++) {
                gs.events[i].end();
            }
        }
    }

    { // Drawings
        image(gs.desk.img, 0, 0, width, height);

        if (gs.timer.done) {
            image(gs.monitor.imgDead, 0, 0, width, height);
        } else {
            image(gs.monitor.img, 0, 0, width, height);
        }

        gs.button.draw();
        gs.timer.drawTop();

        // Draw all events
        for (i = 0; i < gs.events.length; i++) {
            gs.events[i].draw();
        }
		
        if (gs.timer.done) {
			gameOver();
        }

        // Draw hand last
        gs.finger.draw();
    }
}

// Pressed + Released
function mouseClicked() {

    // If game is over
    if (gs.timer.done && gs.button.hb.isTouchingMouse()) {
        setup();
        return
    }

    for (i = 0; i < gs.events.length; i++) {
        if (gs.events[i].hb.isTouchingMouse()) {
            gs.events[i].end();
        }
    }
}

// Text on gameover screen
function gameOver() {
	stroke('white');
    strokeWeight(5);
    textAlign(CENTER, CENTER);

    textSize(80);
    text("Time out!", width / 2, height / 2);

    textSize(40);
    text("\n\n\nClick to try again", width / 2, height / 2);
	
	if(!gameoverSound.isPlaying() && !goSoundPlayed) {
		gameoverSound.play();
		goSoundPlayed=1;
	}		
}

// Callback function called for in game timer
function onGameTimerTick(tickCount) {
    if (tickCount == 5) {
        gs.events.push(alarmClock);
    }
}