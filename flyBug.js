function FlyBug(img, imgFlight, imgFlight2, imgSquash) {
    this.img = img;
    this.imgFlight = imgFlight;
    this.imgFlight2 = imgFlight2;
    this.imgSquash = imgSquash;
    this.hb = new HitBox(canvasWidth * 33 / 40, canvasHeight / 3, canvasHeight / 18);
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(canvasWidth, 200, canvasWidth - 100);
    this.hobble = 0;

    this.flap = 0;
    this.wait = 0;
    this.newPosition = canvasWidth - 400;

    this.update = function () {
        if (this.transition.isTransitioning()) {
            this.transition.update();
            this.hobble = 10 / 2 + 10 * Math.sin(this.transition.current.x / 10);
        } else {
            this.hobble = 0;

            if (this.wait >= 100) {
                this.newPosition = Math.floor(Math.random() * Math.floor(canvasWidth));
                this.transition = new Transition(this.transition.current.x, this.transition.current.y, this.newPosition);
                this.wait = 0;
            } else {
                this.wait += 1;
            }
        }

        this.hb.y = this.transition.current.y + this.hobble + canvasHeight / 15;
        this.hb.x = this.transition.current.x + canvasWidth / 25;
    }

    this.end = function () {
        //this.transition.transitionOut();
        this.done = true;
    }

    this.draw = function () {
        if (this.hb.isPressed()) {
            this.hasBeenPressed = true;
        }

        if (this.hasBeenPressed) {
            image(this.imgSquash, this.transition.current.x, this.transition.current.y + this.hobble);
            this.transition.transitioning.in = false
        } else {
            //if the fly is not flying and still
            if (!this.transition.isTransitioning()) {
                image(this.img, this.transition.current.x, this.transition.current.y + this.hobble);
            } else { //fly is flying and moving around
                //wing flap animation
                if (this.flap) {
                    image(this.imgFlight, this.transition.current.x, this.transition.current.y + this.hobble);
                    this.flap = 0;
                } else {
                    image(this.imgFlight2, this.transition.current.x, this.transition.current.y + this.hobble);
                    this.flap = 1;
                }
            }
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}