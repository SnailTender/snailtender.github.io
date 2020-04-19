function Clock(img, display1) {
    this.img = img;
    this.display1 = display1;
    this.timer = new Timer(0, 500);

    this.update = function () {
        this.timer.resume();
    }

    this.draw = function () {
        image(this.img, 0, 0);
        if (this.timer.elapsed % 1000 == 0) {
            image(this.display1, 0, 0);
        }
    }
}