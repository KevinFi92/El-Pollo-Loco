class chicken extends MoveableObject {
  speed = 0.20  + Math.random() * 0.6;
  movingImg = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  deathImgs = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];
  hit_sound = new Audio("audio/chicken_hit.mp3");

  /**Assigns the chickens their movement speed and starting position, as well as size, width and life points */
  constructor() {
    super();
    this.loadImg("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.movingImg);
    this.height = 100;
    this.width = 80;
    this.life = 10;
    this.x = 800 + Math.random() * 800;
    this.animate(this.movingImg,0);
    this.movementLeft();
  }
}
