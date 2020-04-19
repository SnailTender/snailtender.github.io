function FlyBug(img, imgFlight, imgFlight2, imgSquash, hitbox) {
    this.img = img;
    this.imgFlight = imgFlight;
	this.imgFlight1 = imgFlight2;
	this.imgSquash = imgSquash;
    this.hb = hitbox;
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(canvasWidth, 0, canvasWidth - 400);
    this.hobble = 0;


    this.update = function () {
        if (this.transition.isTransitioning()) {
            this.transition.update();
            this.hobble = 10 / 2 + 10 * Math.sin(this.transition.current.x / 20);
        } else {
            this.hobble = 0;
        }
    }

    this.end = function () {
        this.transition.transitionOut();
        this.done = true;
    }

    this.draw = function () {
        if (this.hb.isPressed() && !this.transition.isTransitioning()) {
            this.hasBeenPressed = true;
        }

        if (this.hasBeenPressed) {
            image(this.imgSquash, this.transition.current.x, this.transition.current.y + this.hobble);
        } else {
            image(this.img, this.transition.current.x, this.transition.current.y + this.hobble);
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}