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
  speed = 5;
  intervalId;
  walking_sounds = new Audio('audio/walking.mp3');
  keyboard;
  

  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.height = 300;
    this.width = 150;
    this.walkingAnimation();
    this.walking_sounds.playbackRate = 2.5;
    
  }

  walkLeft() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.world.keyboard.left && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sounds.play();
      }
    }, 1000 / 60);
  }

  walkRight() {
    
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.world.keyboard.right && this.x < this.world.lvl.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sounds.play();
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
      this.world.camera_x = -this.x + 150;
      this.world.world_x = -this.x;
    }, 50);
  }

  jump() {}
}
