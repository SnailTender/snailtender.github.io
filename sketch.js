// Game state
let gs;
const canvasWidth = 1280;
const canvasHeight = 720;

//fonts
let monitorFont;

//images
let monitorImg;
let monitorDeadImg;
let deskImg;
let buttonImg;
let buttonImgPressed;
let fingerImg;
let fingerImgPressed;
let alarmImg;
let alarmImgPressed;
let clock12Img;
let clock420Img;
let clockBoobImg;
let glassesGuyImg;
let glassesGuyImgPressed;
let monitorDisplayImg;
let monitorDisplayImg2;
let monitorDisplayImg3;
let monitorDisplayImg4;
let flyBugImg;
let flyBugFlightImg;
let flyBugFlight2Img;
let flyBugSquashImg;
let doughBoyImg;
let doughBoyImgWalk;
let doughBoyImgWalk2;
let doughBoyImgHead;
let doughBoyImgBelly;
let bastetImg;
let bastetImgMad;
let cosmoImg;
let cosmoImgMad;

//sound 
let alarmSound;
let gameoverSound;
let tapSound;
let backgroundSound;
let buzzSound;
let doughBoyTouchBellySound;
let doughBoyTouchFaceSound;
let doughBoyWalkingSound;
let glassesGuyWalkingSound;
let glassesGuyTouchSound;
let catTouchSound;
let heartSound;
let victorySound;
let snailtime;

function preload() {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    monitorFont = loadFont('assets/font/8bitOperatorPlusSC-Regular.ttf');

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
    monitorDisplayImg = loadImage("assets/images/snail1.png");
    monitorDisplayImg2 = loadImage("assets/images/snail2.png");
    monitorDisplayImg3 = loadImage("assets/images/snail3.png");
    monitorDisplayImg4 = loadImage("assets/images/snail4.png");
    flyBugImg = loadImage("assets/images/fly.png");
    flyBugFlightImg = loadImage("assets/images/flyFlight0.png");
    flyBugFlight2Img = loadImage("assets/images/flyFlight1.png");
    flyBugSquashImg = loadImage("assets/images/flySquash.png");
    doughBoyImg = loadImage("assets/images/doughBoy.png");
    doughBoyImgWalk = loadImage("assets/images/doughBoyWalk1.png");
    doughBoyImgWalk2 = loadImage("assets/images/doughBoyWalk2.png");
    doughBoyImgHead = loadImage("assets/images/doughBoyHead.png");
    doughBoyImgBelly = loadImage("assets/images/doughBoyBelly.png");
    bastetImg = loadImage("assets/images/bastet.png");
    bastetImgMad = loadImage("assets/images/bastetMad.png");
    cosmoImg = loadImage("assets/images/cosmo.png");
    cosmoImgMad = loadImage("assets/images/cosmoMad.png");

    // sound
    alarmSound = loadSound('assets/sounds/alarm.mp3');
    gameoverSound = loadSound('assets/sounds/error.mp3');
    tapSound = loadSound('assets/sounds/tap.mp3');
    backgroundSound = loadSound('assets/sounds/background.mp3');
    buzzSound = loadSound('assets/sounds/buzz.mp3');
    doughBoyTouchBellySound = loadSound('assets/sounds/doughboytouch.mp3');
    doughBoyTouchFaceSound = loadSound('assets/sounds/doughboyfacetouch.mp3');
    doughBoyWalkingSound = loadSound('assets/sounds/doughboywalking.mp3');
    glassesGuyWalkingSound = loadSound('assets/sounds/guywalkingsound.mp3');
    glassesGuyTouchSound = loadSound('assets/sounds/touchglasses.mp3');
    catTouchSound = loadSound('assets/sounds/meow.mp3');
    heartSound = loadSound('assets/sounds/heartsound.mp3');
    victorySound = loadSound('assets/sounds/victory.mp3');
    snailtime = loadSound('assets/sounds/snailtime.mp3');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    goSoundPlayed = 0;

    // Initialize gamestate
    gs = {};

    gs.button = new Button(
        buttonImg,
        buttonImgPressed,
    );

    gs.finger = new Finger(
        fingerImg,
        fingerImgPressed,
        tapSound
    );

    gs.desk = {
        img: deskImg,
    };

    gs.monitor = new MonitorDisplay(
        monitorImg,
        monitorDeadImg,
        monitorDisplayImg3,
        monitorDisplayImg4,
        [monitorDisplayImg, monitorDisplayImg2],
    );

    // On screen events
    gs.events = [];
}

function draw() {
    background(220);

    if (!backgroundSound.isPlaying()) {
        backgroundSound.setVolume(0.2);
        backgroundSound.play();
    }

    { // Logic
        if (gs.monitor.started) {
            if (gs.monitor.win) {
                gs.timer.endTimer();
            }

            if (!gs.timer.done) {

                gs.monitor.update();

                if (gs.button.hb.isPressed()) {
                    gs.timer.reset();
                } else {
                    gs.timer.resume();
                }

                if (gs.button.hb.isPressed()) {
                    gs.monitor.love += 10;
                }
            }
            
            if (gs.timer.done || gs.monitor.win){ // end game logic

                gs.monitor.end();

                // End all events when the game ends
                for (i = 0; i < gs.events.length; i++) {
                    gs.events[i].end();
                }
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
        }
    }

    { // Drawings
        image(gs.desk.img, 0, 0, width, height);

        gs.monitor.draw();
        gs.button.draw();

        // only draw game elements after we have started
        if (gs.monitor.started) {
            gs.timer.drawTop();

            // Draw all events
            for (i = 0; i < gs.events.length; i++) {
                gs.events[i].draw();
            }

            if (gs.timer.done && !gs.monitor.win) {
                gameOver();
            }
        }

        // Draw hand last
        gs.finger.draw();
    }
}

// Pressed + Released
function mouseClicked() {
    // Start the game
    if (!gs.monitor.started && gs.button.hb.isTouchingMouse()) {
        // main game timer ticks every second and ends at 4 seconds
        gs.timer = new Timer(3000, 100, onGameTimerTick);
        gs.monitor.started = true;

        if (!snailtime.isPlaying()) {
            backgroundSound.setVolume(0.1);
            snailtime.play();
        }
    }

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

function mousePressed() {
    if (gs.button.hb.isTouchingMouse()) {
        gs.monitor.pressed = true;
    }

    gs.finger.sound.play();
}

// Text on gameover screen
function gameOver() {
    // Set text characteristics
    textFont(monitorFont);

    stroke('black');
    strokeWeight(2);

    textSize(16);
    text("\n\n\nYou went too long without loving him.\n                Click to try again", width * 16 / 40, height * 15 / 40);

    if (!gameoverSound.isPlaying() && !goSoundPlayed) {
        backgroundSound.setVolume(0.1);
        gameoverSound.play();
        goSoundPlayed = 1;
    }
}

// Callback function called for in game timer
function onGameTimerTick(tickCount) {
    if (tickCount == 50) {
        gs.events.push(new Clock(
            alarmImg,
            alarmImgPressed,
            clock12Img,
            alarmSound,
        ));
    }

    if (tickCount == 100) {
        gs.events.push(new GlassesGuy(
            glassesGuyImg,
            glassesGuyImgPressed,
            glassesGuyWalkingSound,
            glassesGuyTouchSound,
        ));
    }

    if (tickCount == 120) {
        gs.events.push(new FlyBug(
            flyBugImg,
            flyBugFlightImg,
            flyBugFlight2Img,
            flyBugSquashImg,
            buzzSound
        ));
    }

    if (tickCount == 20 ) { //170
        gs.events.push(new DoughBoy(
            doughBoyImg,
            doughBoyImgWalk,
            doughBoyImgWalk2,
            doughBoyImgHead,
            doughBoyImgBelly,
            doughBoyTouchBellySound,
            doughBoyTouchFaceSound,
            doughBoyWalkingSound,
        ));
    }

    if (tickCount == 200) {
        gs.events.push(new Bastet(
            bastetImg,
            bastetImgMad,
            catTouchSound,
        ));
    }

    if (tickCount == 350) {
        gs.events.push(new Clock(
            alarmImg,
            alarmImgPressed,
            clock12Img,
            alarmSound,
        ));
        
        gs.events.push(new GlassesGuy(
            glassesGuyImg,
            glassesGuyImgPressed,
            glassesGuyWalkingSound,
            glassesGuyTouchSound,
        ));

        gs.events.push(new FlyBug(
            flyBugImg,
            flyBugFlightImg,
            flyBugFlight2Img,
            flyBugSquashImg,
            buzzSound
        ));

        gs.events.push(new DoughBoy(
            doughBoyImg,
            doughBoyImgWalk,
            doughBoyImgWalk2,
            doughBoyImgHead,
            doughBoyImgBelly,
            doughBoyTouchBellySound,
            doughBoyTouchFaceSound,
            doughBoyWalkingSound,
        ));

        gs.events.push(new Bastet(
            bastetImg,
            bastetImgMad,
            catTouchSound,
        ));
    }
}