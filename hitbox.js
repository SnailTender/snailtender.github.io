
function HitBox(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.isTouchingMouse = function () {
        var distancesquared = (mouseX - this.x) * (mouseX - this.x) + (mouseY - this.y) * (mouseY - this.y);
        return distancesquared <= this.r * this.r;
    }

    this.isPressed = function () {
        return this.isTouchingMouse() && mouseIsPressed;
    }
}