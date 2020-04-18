function Timer(maxMS, tickMS) {
    this.elapsed = 0;
    this.ticking = false;
    this.maxMS = maxMS;
    this.tickMS = tickMS;
    this.done = false;

    this.pause = function() {
        this.ticking = false;
    };

    this.reset = function() {
        this.pause();
        this.elapsed = 0;
    };

    this.resume = function() {
        this.ticking = true;
    };

    this.timer = setInterval(function () {
        if (this.ticking) {
            this.elapsed += this.tickMS;
        }

        if (this.elapsed > this.maxMS) {
            this.done = true;
            this.ticking = false;
            clearInterval(this.timer);
        }
    }.bind(this), this.tickMS);

    this.drawTop = function () {
        stroke(0, 0, 0);
        strokeWeight(10);
        x = map(this.elapsed, 0, this.maxMS, 0, width);
        line(0, 0, x, 0);
    };
}