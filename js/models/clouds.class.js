class Clouds extends MoveableObject {
    x = 50;
    y = 10;
    width = 350;
    height = 400;
    speed = 0.15;

    /**Weißt den Wolken ihre Startposition sowie Bewegungsgeschwindigkeit zu */
    constructor(path) {
        super();
        this.loadImg(path);
        this.x += Math.random() * 500;
        this.movementLeft();
    }


}