function Finger(img, imgPressed) {
    this.img = img;
    this.imgPressed = imgPressed;

    this.draw = function () {
        if (mouseIsPressed) {
            image(gs.finger.imgPressed, mouseX - gs.finger.imgPressed.width / 10, mouseY - gs.finger.imgPressed.height / 10);
        } else {
            image(gs.finger.img, mouseX - gs.finger.img.width / 10, mouseY - gs.finger.img.height / 10);
        }
    }
}