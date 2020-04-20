function DoughBoy(img, imgWalk, imgWalk2, imgHead, imgBelly, touchBellySound, touchFaceSound, walkingSound) {
    this.img = img;
    this.imgWalk = imgWalk;
    this.imgWalk2 = imgWalk2;
    this.imgHead = imgHead;
    this.imgBelly = imgBelly;
    this.hbHead = new HitBox(0, 0, 40);
    this.hb = new HitBox(0, 0, 100);
    this.done = false;
    this.hasBeenPressed = false;
    this.transition = new Transition(-387, 0, 600);
    this.timer = new Timer(0, 250);
    this.bellySound = touchBellySound;
    this.faceSound = touchFaceSound;
    this.walkingSound = walkingSound;
    this.wait = 0;

    this.update = function () {
        this.timer.resume();

        if (this.transition.isTransitioning()) {
            this.transition.update();
        } 
        
        if (this.wait >= 100 && !this.hasBeenPressed) {
            let newPosition = Math.floor(Math.random() * Math.floor(canvasWidth - 400));
            this.transition = new Transition(this.transition.current.x, this.transition.current.y, newPosition);
            this.wait = 0;
        } else {
            this.wait += 1;
        }

        this.hb.y = this.transition.current.y + canvasHeight * 27 / 40;
        this.hb.x = this.transition.current.x + canvasWidth * 4 / 25;

        this.hbHead.y = this.transition.current.y  + canvasHeight / 3;
        this.hbHead.x = this.transition.current.x + canvasWidth * 6 / 40;
    }

    this.end = function () {
        if (!this.done){
            this.transition = new Transition(this.transition.current.x, this.transition.current.y, -387);
            this.done = true;
        }
    }

    this.draw = function () {

        if (this.hb.isPressed()) {
            image(this.imgBelly, this.transition.current.x, this.transition.current.y);

            this.hasBeenPressed = true;
            if (!this.bellySound.isPlaying()) {
                this.walkingSound.setVolume(0.3);
                this.bellySound.play();
            }

        } else if (this.hbHead.isPressed()) {
            if (!this.faceSound.isPlaying()){
                this.walkingSound.setVolume(0.5);
                this.faceSound.play();
            }

            image(this.imgHead, this.transition.current.x, this.transition.current.y);

        } else {
            if (this.transition.isTransitioning()) {
                if (!this.walkingSound.isPlaying()) {
                    this.walkingSound.setVolume(0.1);
                    this.walkingSound.play();
                }
                if (this.timer.elapsed % 500 == 0) {
                    image(this.imgWalk2, this.transition.current.x, this.transition.current.y);
                } else {
                    image(this.imgWalk, this.transition.current.x, this.transition.current.y);
                }
            } else {
                this.walkingSound.stop();
                image(this.img, this.transition.current.x, this.transition.current.y);
            }
        }

        // debug 
        // fill(204, 101, 192, 127);
        // stroke(127, 63, 120);
        // ellipse(this.hbHead.x, this.hbHead.y, this.hbHead.r)
        // ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
}