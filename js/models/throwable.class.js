class Throwable extends MoveableObject {
  salsaRotationImgs = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png", 
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  salsaSplashImgs = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  salsaSplashSound = new Audio("audio/bottle_splash.mp3");



  constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
    this.throw();
  }

  throw() {
    if (world.character.otherDirection) {
      this.x -= 100;
    }
    this.speedY = 30;
    this.applyGravity();
    this.movingAnimation(this.salsaRotationImgs);  
    setInterval(() => {
      if (world.character.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
      if (this.isOnGround - 50) {
        this.bottleSplash();
      }
    }, 25);
  }

  bottleSplash(){
      world.playSound(this.salsaSplashSound);
      this.movingAnimation(this.salsaSplashImgs);
      this.speedY = 0;

}



}

