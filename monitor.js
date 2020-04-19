function MonitorDisplay(img, deadImg, imgPressed, imgWin, frames) {
    this.img = img;
    this.imgDead = deadImg;
    this.imgPressed = imgPressed;
    this.imgWin = imgWin;
    this.displayOnMonitor = {
        frames: frames,
    };
    this.done = false;
    this.timer = new Timer(0, 300);
    this.pressed = false;
    this.points = 0;
    this.maxPoints = 10000;
    this.win = false;

    this.draw = function() {
        if (this.win) {
            image(this.imgWin, canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
        }

        if (this.pressed && !this.win && !this.done) {
            image(this.imgPressed, canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
        } else {
            if (this.timer.elapsed % 600 == 0) {
                image(this.displayOnMonitor.frames[0], canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
            } else {
                image(this.displayOnMonitor.frames[1], canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
            }
        }

        if (this.win) {
            image(this.imgWin, canvasWidth*15/40, canvasHeight*7/40, canvasWidth*12/40, canvasHeight*13/40);
        } else {
            if (this.points < this.maxPoints) {
                x = map(this.points, 0, this.maxPoints, canvasWidth*15/40, (canvasWidth*15/40)+(canvasWidth*12/40));
            } else {
                x = (canvasWidth*15/40)+(canvasWidth*12/40)
            }
            stroke(0, 0, 0);
            strokeWeight(5);
            line(canvasWidth*15/40, canvasHeight*9/40, x, canvasHeight*9/40);
        }

        if (this.done && !this.win) {
            image(this.imgDead, 0, 0, canvasWidth, canvasHeight);
        } else {
            image(this.img, 0, 0, canvasWidth, canvasHeight);
        }
    }

    this.update = function() {
        if (this.done) {
            return;
        }

        if (this.points >= this.maxPoints) {
            this.win = true;
        }

        if (this.timer.elapsed % 300 == 0) {
                this.points += 1;
        }

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