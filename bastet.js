function Bastet(img, imgPressed, hitbox) {
	this.img = img;
    this.imgPressed = imgPressed;
    this.hb = hitbox;
    this.done = false;
    this.hasBeenPressed = false;
	this.transition = new Transition(canvasWidth, canvasHeight-300, this.hb.x-150);
	
	this.update = function(){
		if (this.transition.isTransitioning()) {
            this.transition.update();
        }
	}
	
	this.end = function () {
        this.transition.transitionOut();
        this.done = true;
	}
	
    this.draw = function () {
        if (this.hb.isPressed()) {
            image(this.imgPressed, this.transition.current.x, this.transition.current.y);
        } else {
			image(this.img, this.transition.current.x, this.transition.current.y);
		}

        // debug 
        //fill(204, 101, 192, 127);
        //stroke(127, 63, 120);
		//ellipse(this.hb.x, this.hb.y, this.hb.r)
    }
	
}