function Clock(img, imgPressed, display1, alarmSound, hitbox) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.display1 = display1;
    this.timer = new Timer(0, 500);
    this.done = false;
    this.hb = hitbox;
    this.alarmSound = alarmSound;

    this.update = function () {
        this.timer.resume();

        if (!this.done && !this.alarmSound.isPlaying()) {
            this.alarmSound.play();
        }

        if (this.hb.isPressed()) {
            this.alarmSound.stop();
            this.done = true;
        }
    }

    this.draw = function () {

        if (this.hb.isPressed()) {
            image(this.imgPressed, 0, 0);
        } else {
            image(this.img, 0, 0);
            if (this.timer.elapsed % 1000 == 0) {
                image(this.display1, 0, 0);
            }
        }


        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}