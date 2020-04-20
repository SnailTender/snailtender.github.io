function GlassesGuy(img, imgPressed, walkingSound, touchSound) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.hb = new HitBox(0, 0, canvasHeight / 18);
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(canvasWidth, 0, canvasWidth - 400);
    this.hobble = 0;
    this.wait = 0;
    this.walkingSound = walkingSound;
    this.touchSound = touchSound;

    this.update = function () {
        if (this.hb.isPressed()) {
            if (!this.touchSound.isPlaying()) {
                this.touchSound.play();
            }
            this.hasBeenPressed = true;
            this.transition = new Transition(this.transition.current.x, this.transition.current.y, canvasWidth + 400);
        }

        if (this.transition.isTransitioning()) {
            if (!this.walkingSound.isPlaying()) {
                this.walkingSound.setVolume(0.3);
                this.walkingSound.play();
            }
            this.transition.update();
            this.hobble = 10 / 2 + 10 * Math.sin(this.transition.current.x / 20);
        } else {
            this.hobble = 0;
            if (this.wait >= 100 && !this.hasBeenPressed) {
                let newPosition = Math.floor(Math.random() * Math.floor(canvasWidth - 400));
                this.transition = new Transition(this.transition.current.x, this.transition.current.y, newPosition);
                this.wait = 0;
            } else {
                this.wait += 1;
            }
        }

        this.hb.y = this.transition.current.y + this.hobble + canvasHeight / 3;
        this.hb.x = this.transition.current.x + canvasWidth * 3 / 25;
    }

    this.end = function () {
        if (!this.done){
            this.transition = new Transition(this.transition.current.x, this.transition.current.y, canvasWidth + 400);
            this.done = true;
        }
    }

    this.draw = function () {
        if (this.hasBeenPressed) {
            image(this.imgPressed, this.transition.current.x, this.transition.current.y + this.hobble);
        } else {
            image(this.img, this.transition.current.x, this.transition.current.y + this.hobble);
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}