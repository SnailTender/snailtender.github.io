function MonitorDisplay(img, deadImg, imgPressed, frames) {
    this.img = img;
    this.imgDead = deadImg;
    this.imgPressed = imgPressed;
    this.displayOnMonitor = {
        frames: frames,
    };
    this.done = false;
    this.timer = new Timer(0, 300);
    this.pressed = false;

    this.draw = function() {
        if (this.pressed && !this.done) {
            image(this.imgPressed, canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
        } else {
            if (this.timer.elapsed % 600 == 0) {
                image(this.displayOnMonitor.frames[0], canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
            } else {
                image(this.displayOnMonitor.frames[1], canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
            }
        }

        if (this.done) {
            image(this.imgDead, 0, 0, canvasWidth, canvasHeight);
        } else {
            image(this.img, 0, 0, canvasWidth, canvasHeight);
        }
    }

    this.update = function() {
        if (this.pressed && this.timer.elapsed % 1200 == 0) {
            this.pressed = false;
        }
        this.timer.resume();
    }

    this.end = function() {
        this.timer.endTimer();
        this.done = true;
    }
}