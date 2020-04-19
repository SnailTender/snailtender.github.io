function Button(img, imgPressed, hitbox) {
    this.img = img;
    this.imgPressed = imgPressed;
    this.hb = hitbox;

    this.draw = function () {
        if (this.hb.isPressed()) {
            image(this.imgPressed, this.hb.x - this.imgPressed.width / 2, this.hb.y - this.imgPressed.height / 2);
        } else {
            image(this.img, this.hb.x - this.img.width / 2, this.hb.y - this.img.height / 2);
        }
    }

    this.resize = function () {
        this.hb = new HitBox(canvasWidth / 50 * 26, canvasHeight / 10 * 7, canvasHeight / 15);
    }
}
