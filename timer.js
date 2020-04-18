function Timer(maxMS, tickMS) {
    this.elapsed = 0;
    this.ticking = false;
    this.maxMS = maxMS;
    this.tickMS = tickMS;
    this.done = false;

    // Don't do anything on interval
    this.pause = function () {
        this.ticking = false;
    };

    // reset elapsed time to 0
    this.reset = function () {
        this.pause();
        this.elapsed = 0;
    };

    // resume ticking
    this.resume = function () {
        this.ticking = true;
    };

    // Begin setInterval
    this.timer = setInterval(function () {
        if (this.ticking) {
            this.elapsed += this.tickMS;
        }

        // if maxMS is 0 then don't end
        if (this.maxMS == 0) {
            return;
        }

        if (this.elapsed > this.maxMS) {
            this.done = true;
            this.ticking = false;
            clearInterval(this.timer);
        }
    }.bind(this), this.tickMS);

    // Cancel setInterval
    this.endTimer = function() {
        clearInterval(this.timer);
    };

    // draw timer at top of screen
    this.drawTop = function () {
        stroke(0, 0, 0);
        strokeWeight(10);
        x = map(this.elapsed, 0, this.maxMS, 0, width);
        line(0, 0, x, 0);
    };
}