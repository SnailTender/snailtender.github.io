function Clock(img, display1, hitbox) {
    this.img = img;
    this.display1 = display1;
    this.timer = new Timer(0, 500);
    this.done = false;
    this.hb = hitbox;

    this.update = function () {
        this.timer.resume();

        if (this.hb.isPressed()) {
            this.done = true;
        }
    }

    this.draw = function () {
        image(this.img, 0, 0);
        if (this.timer.elapsed % 1000 == 0) {
            image(this.display1, 0, 0);
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}