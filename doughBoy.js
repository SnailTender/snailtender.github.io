function DoughBoy(img, imgWalk, imgWalk2, imgHead, imgBelly, hitboxHead, hitboxBelly) {
    this.img = img;
    this.imgWalk = imgWalk;
    this.imgWalk2 = imgWalk2;
    this.imgHead = imgHead;
    this.imgBelly = imgBelly;
    this.hbHead = hitboxHead;
    this.hb = hitboxBelly;
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(0, 0, 600);
    this.hobble = 0;
    this.timer = new Timer(0, 250);

    this.update = function () {
        this.timer.resume();

        if (this.transition.isTransitioning()) {
            this.transition.update();
            this.hobble = 10 / 2 + 10 * Math.sin(this.transition.current.x / 20);
        } else {
            this.hobble = 0;
        }

        //this.hbBelly.x = this.transition.current.x + 160;
        //this.hbHead.x = this.transition.current.x + 200;
    }

    this.end = function () {
        this.transition.transitionOut();
        this.done = true;
    }

    this.draw = function () {

        if (this.hb.isPressed() && !this.transition.isTransitioning()) {
            this.hasBeenPressed = true;
        }

        if (this.hasBeenPressed) {
            image(this.imgBelly, this.transition.current.x, this.transition.current.y + this.hobble);
        } else if (this.transition.isTransitioning()) {
            if (this.timer.elapsed % 500 == 0) {
                image(this.imgWalk2, this.transition.current.x, this.transition.current.y);
            } else {
                image(this.imgWalk, this.transition.current.x, this.transition.current.y);
            }
        } else if (this.hbHead.isPressed()) {
            image(this.imgHead, this.transition.current.x, this.transition.current.y + this.hobble);
        } else {
            image(this.img, this.transition.current.x, this.transition.current.y);
        }

        // debug 
        //fill(204, 101, 192, 127);
        //stroke(127, 63, 120);
        //ellipse(this.hbHead.x, this.hbHead.y, this.hbHead.r)
        //ellipse(this.hbBelly.x, this.hbBelly.y, this.hbBelly.r)
    }
}