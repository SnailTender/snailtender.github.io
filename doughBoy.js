function DoughBoy(img, imgWalk, imgWalk2, imgHead, imgBelly, hitboxHead, hitboxBelly, touchBellySound, touchFaceSound, walkingSound) {
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
    this.bellySound = touchBellySound;
    this.faceSound = touchFaceSound;
    this.walkingSound = walkingSound;

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
            if (!this.bellySound.isPlaying()) {
                this.walkingSound.setVolume(0.3);
                this.bellySound.play();
            }
        }

        if (this.hasBeenPressed) {
            image(this.imgBelly, this.transition.current.x, this.transition.current.y + this.hobble);
        } else if (this.transition.isTransitioning()) {
            if (!this.walkingSound.isPlaying()) {
                this.walkingSound.setVolume(0.1);
                this.walkingSound.play();
            }
            if (this.timer.elapsed % 500 == 0) {
                image(this.imgWalk2, this.transition.current.x, this.transition.current.y);
            } else {
                image(this.imgWalk, this.transition.current.x, this.transition.current.y);
            }
        } else if (this.hbHead.isPressed()) {
            if (!this.faceSound.isPlaying()){
                this.walkingSound.setVolume(0.5);
                this.faceSound.play();
            }
            image(this.imgHead, this.transition.current.x, this.transition.current.y + this.hobble);
        } else {
            this.walkingSound.stop();
            image(this.img, this.transition.current.x, this.transition.current.y);
        }

        // debug 
        //fill(204, 101, 192, 127);
        //stroke(127, 63, 120);
        //ellipse(this.hbHead.x, this.hbHead.y, this.hbHead.r)
        //ellipse(this.hbBelly.x, this.hbBelly.y, this.hbBelly.r)
    }
}