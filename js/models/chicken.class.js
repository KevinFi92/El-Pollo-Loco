class chicken extends MoveableObject {
  speed = 0.20  + Math.random() * 0.3;
  movingImg = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  

  constructor() {
    super().loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.height = 100;
    this.width = 80;
    this.x = 200 + Math.random() * 500;
    this.movingAnimation(this.movingImg);
    this.movementLeft();
  }

}
