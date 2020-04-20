function Clock(img, imgPressed, display1, alarmSound) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.display1 = display1;
    this.timer = new Timer(0, 500);
    this.done = false;
    this.hb = new HitBox(canvasWidth / 8, canvasHeight / 10, canvasHeight / 7);
    this.alarmSound = alarmSound;

    this.transition = new Transition(-400, 0, 0);

    this.update = function () {
        if (!this.done && !this.alarmSound.isPlaying()) {
            this.alarmSound.setVolume(0.1);
            this.alarmSound.play();
        }

        this.timer.resume();

        if (this.transition.isTransitioning()) {
            this.transition.update();
        }
    }

    this.end = function () {
        this.transition.transitionOut();
        this.done = true;
        this.alarmSound.stop();
    }

    this.draw = function () {
        if (this.hb.isPressed() && !this.transition.isTransitioning()) {
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