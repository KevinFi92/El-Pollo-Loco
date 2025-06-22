class Clouds extends MoveableObject {
    x = 50;
    y = 10;
    width = 350;
    height = 400;
    speed = 0.15;

    constructor(path) {
        super().loadImg(path)
        this.x += Math.random() * 500;
        this.movementLeft();
    }


}