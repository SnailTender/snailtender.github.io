function Button(img, imgPressed) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.hb = new HitBox(canvasWidth / 50 * 26, canvasHeight * 34 / 50, canvasHeight / 15);

    this.draw = function () {
        if (this.hb.isPressed()) {
            image(this.imgPressed, this.hb.x - this.imgPressed.width / 2, this.hb.y - this.imgPressed.height *10/ 40);
        } else {
            image(this.img, this.hb.x - this.img.width / 2, this.hb.y - this.img.height *10/ 40);
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}
