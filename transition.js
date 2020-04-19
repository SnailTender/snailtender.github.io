function Transition(x, y, destX) {
    this.start = {
        x: x,
        y: y,
    };
    this.current = {
        x: x,
        y: y,
    };
    this.dest = {
        x: destX,
        y: y,
    };
    this.transitioning = {
        in: true,
        out: false,
    };
    this.tint = 255;

    this.speed = 5;

    this.update = function() {
        if (this.transitioning.in) {
            this.moveInTransition();
        }

        if (this.transitioning.out) {
            this.moveOutTransition();
        }
    }

    this.isTransitioning = function() {
        return this.transitioning.in || this.transitioning.out;
    }

    this.transitionOut = function() {
        return this.transitioning.out = true;
    }

    this.moveInTransition = function() {
        if (this.dest.x == this.current.x) {
            this.transitioning.in = false;
            return;
        }

        if (this.dest.x > this.current.x) {
            this.current.x += this.speed;

            if (this.current.x > this.dest.x) {
                this.current.x = this.dest.x
            }
        } else {
            this.current.x -= this.speed;

            if (this.current.x < this.dest.x) {
                this.current.x = this.dest.x
            }
        }
    };

    this.moveOutTransition = function() {
        if (this.start.x == this.current.x) {
            this.transitioning.out = false;
            return;
        }

        if (this.current.x < this.start.x) {
            this.current.x += this.speed;

            if (this.current.x > this.start.x) {
                this.current.x = this.start.x
            }
        } else {
            this.current.x -= this.speed;

            if (this.current.x < this.start.x) {
                this.current.x = this.start.x
            }
        }
    };

    this.fadeOutTransition = function() {
        if (this.tint <= 0) {
            this.tint = 0;
            this.transitioning = false;
        }
        this.tint -= this.speed;
    }
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}
