class Character extends MoveableObject {
  y = 150;
  x = 100;
  animationImgs = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  currentImg = 0;
  world;
  speed = 1.95;
  intervalId;

  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.height = 300;
    this.width = 150;
    this.walkingAnimation();
  }

  walkLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.world.keyboard.left) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);
  }

  walkRight() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.world.keyboard.right) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      
    }, 1000 / 60);
  }

  walkingAnimation() {
    setInterval(() => {
      if (this.world.keyboard.right) {
        this.walkRight();
        let i = this.currentImg % this.animationImgs.length;
        this.loadImg(this.animationImgs[i]);
        this.currentImg++;
      }
      if (this.world.keyboard.left) {
        this.walkLeft();
        let i = this.currentImg % this.animationImgs.length;
        this.loadImg(this.animationImgs[i]);
        this.currentImg++;
      }
      this.world.camera_x = -this.x;
      this.world.world_x = -this.x;
    }, 50);
  }

  jump() {}
}
