function Bastet(img, imgPressed, meow) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.hb = new HitBox(0, 0, 150),
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(canvasWidth, canvasHeight * 24 / 40, random(canvasWidth) - 150);
    this.meowSound = meow;

    this.update = function () {
        if (this.transition.isTransitioning()) {
            this.transition.update();
        }

        this.hb.y = this.transition.current.y + canvasHeight / 10;
        this.hb.x = this.transition.current.x + canvasWidth / 10;
    }

    this.end = function () {
        this.transition.transitionOut();
        this.done = true;
    }

    this.draw = function () {
        if (this.hb.isPressed()) {
            if (!this.meowSound.isPlaying()) {
                this.meowSound.play();
            }
            image(this.imgPressed, this.transition.current.x, this.transition.current.y);
        } else {
            image(this.img, this.transition.current.x, this.transition.current.y);
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }

}