function Transition(x, y, destX, destY) {
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
        y: destY,
    };
    this.transitioning = {
        in: true,
        out: false,
    };
    this.distance = distanceBetweenPoints(x, y, destX, destY);

    this.update = function() {
        if (this.transitioning.in) {
            if (this.dest.x == this.current.x && this.dest.y == this.current.y) {
                this.transitioning.in = false;
                return;
            }

            this.current.x = this.dest.x;
            this.current.y = this.dest.y;
        }

        if (this.transitioning.out) {
            if (this.start.x == this.current.x && this.start.y == this.current.y) {
                this.transitioning.out = false;
                return;
            }

            this.current.x = this.start.x;
            this.current.y = this.start.y;
        }
    }

    this.isTransitioning = function() {
        return this.transitioning.in || this.transitioning.out;
    }

    this.transitionOut = function() {
        return this.transitioning.out = true;
    }
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}
