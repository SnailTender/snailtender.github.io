function Boombox(img, imgPressed, display1, sound) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.display1 = display1;
    this.timer = new Timer(0, 500);
    this.done = false;
    this.hb = new HitBox(0, 0, canvasHeight / 10);
    this.sound = sound;
    this.turnedOff = false;

    this.transition = new Transition(canvasWidth, canvasHeight * 1 / 10, canvasWidth * 28 /40);

    this.update = function () {
        if (this.hb.isPressed()) {
            this.turnedOff = true;
        }

        if (!this.done && !this.sound.isPlaying()) {
            this.sound.play();
        }

        this.timer.resume();

        if (this.transition.isTransitioning()) {
            this.transition.update();
        }

        this.hb.y = this.transition.current.y + canvasHeight * 9 / 40;
        this.hb.x = this.transition.current.x + canvasWidth * 6 / 50;
    }

    this.end = function () {
        this.transition.transitionOut();
        this.done = true;
        this.sound.stop();
    }

    this.draw = function () {
        if (this.turnedOff) {
            image(this.imgPressed, this.transition.current.x, this.transition.current.y);
        } else {
            image(this.img, this.transition.current.x, this.transition.current.y);
            if (this.timer.elapsed % 1000 == 0) {
                image(this.display1, this.transition.current.x, this.transition.current.y);
            }
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}