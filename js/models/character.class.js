class Character extends MoveableObject {
  y = 155;
  x = 100;
  animationImgs = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  jumpingImgs = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  deathImgs = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ]
  hurtImgs = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ]

  charDead = "img/2_character_pepe/5_dead/D-57.png";
  currentImg = 0;
  world;
  speed = 5;
  intervalId;
  jumpingInterval;
  walking_sounds = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png");
    this.height = 300;
    this.width = 150;
    this.charMovement()
    this.walking_sounds.playbackRate = 2.5;
    this.applyGravity();
    this.checkLife();
    
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

  jump() {
    this.jumping_sound.play();
    this.speedY = 30;
  }

  movementAnimation(movement) {
    let i = this.currentImg % movement.length;
    this.loadImg(movement[i]);
    this.currentImg++;
  }

  charMovement() {
    setInterval(() => {
      if (this.world.keyboard.right) {
        this.walkRight();
        this.movementAnimation(this.animationImgs);
      }
      if (this.world.keyboard.left) {
        this.walkLeft();
        this.movementAnimation(this.animationImgs);
      }
      if (this.world.keyboard.up && !this.isAboveGround()) {
        this.jump();
        this.movementAnimation(this.jumpingImgs);
      }
      if (this.isHurt()) {
        this.movementAnimation(this.hurtImgs);
      }
      this.world.camera_x = -this.x + 150;
      this.world.world_x = -this.x;
    }, 50);
  }
}
