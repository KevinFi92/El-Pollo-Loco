class Chick extends MoveableObject {
    speed = 0.20 + Math.random() * 0.3;
    movingImg = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    deathImgs = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];
    hit_sound = new Audio("audio/chick_hit.mp3");

    /**Weist den Hühnchen ihre Bewegungsgeschwindigkeit und die Startposition zu, sowie Größe, Breite und Lebenspunkte */
    constructor() {
        super().loadImg("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.height = 100;
        this.width = 80;
        this.life = 10;
        this.x = 400 + Math.random() * 500;
        this.chickenMoving(this.movingImg);
        this.movementLeft();
    }


}

