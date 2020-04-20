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
    this.maxPoints = 3000;
    this.win = false;
    this.love = 0;
    this.started = false;

    this.draw = function () {
        if (!this.started) { // draw start screen
            stroke('black');
            strokeWeight(1);
            textFont(monitorFont);
            textSize(20);
            textAlign(0, 0);
            text("Virtual Snail Buddy\n\n     Press Start!", canvasWidth * 18 / 40, canvasHeight * 14 / 40);
        } else if (this.win) { // draw win screen
            image(this.imgWin, canvasWidth * 15 / 40, canvasHeight * 7 / 40, canvasWidth * 12 / 40, canvasHeight * 13 / 40);
            image(this.imgWin, canvasWidth * 15 / 40, canvasHeight * 7 / 40, canvasWidth * 12 / 40, canvasHeight * 13 / 40);
        } else if (!this.done) { // draw main gain screen
            if (this.pressed) { // draw pressed
                image(this.imgPressed, canvasWidth * 15 / 40, canvasHeight * 7 / 40, canvasWidth * 12 / 40, canvasHeight * 13 / 40);
            } else { // draw idle
                if (this.timer.elapsed % 600 == 0) {
                    image(this.displayOnMonitor.frames[0], canvasWidth * 15 / 40, canvasHeight * 7 / 40, canvasWidth * 12 / 40, canvasHeight * 13 / 40);
                } else {
                    image(this.displayOnMonitor.frames[1], canvasWidth * 15 / 40, canvasHeight * 7 / 40, canvasWidth * 12 / 40, canvasHeight * 13 / 40);
                }
            }
            if (this.points < this.maxPoints) {
                x = map(this.points, 0, this.maxPoints, canvasWidth * 15 / 40, (canvasWidth * 15 / 40) + (canvasWidth * 12 / 40));
            } else {
                x = (canvasWidth * 15 / 40) + (canvasWidth * 12 / 40)
            }
            stroke(0, 0, 0);
            strokeWeight(5);
            line(canvasWidth * 15 / 40, canvasHeight * 9 / 40, x, canvasHeight * 9 / 40);

            strokeWeight(1);
            textFont(monitorFont);
            textSize(10);
            textAlign(0, 0);
            text("LOVE: " + this.love, canvasWidth * 15 / 40 + 40, canvasHeight * 9 / 40 + 20);
        }

        if (this.done && !this.win) {
            image(this.imgDead, 0, 0, canvasWidth, canvasHeight);
        } else {
            image(this.img, 0, 0, canvasWidth, canvasHeight);
        }
    }

    this.update = function () {
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

    this.end = function () {
        this.timer.endTimer();
        this.done = true;
    }
}