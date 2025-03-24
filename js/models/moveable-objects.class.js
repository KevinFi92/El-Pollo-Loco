class MoveableObject extends DrawableObject {
  x = 50;
  y = 360;
  offsetY;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  life = 100;
  currentImg = 0;
  constructor(path) {
    super().loadImg(path);
  }

  movementLeft() {
  let movinginterval =  setInterval(() => {
      this.x -= this.speed;
      if (this.life == 0) {
        clearInterval(movinginterval);
      }
    }, 1000 / 60);


  }

  movingAnimation(movingImg) {
    let movementInterval = setInterval(() => {
      let i = this.currentImg % movingImg.length;
      this.loadImg(movingImg[i]);
      this.currentImg++;
      if (i == movingImg.length - 1) {
        clearInterval(movementInterval);
      }
    }, 50);
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 60);
  }

  isAboveGround() {
    if (this instanceof Throwable){
      return true;
    } else{
    return this.y < 155;
  }}

  isOnGround() {
    return this.y === 155;
  }

  isColliding(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  }

  landsOntop(obj) {
    return (
      this.y + this.height <= obj.y + 10 && 
      this.y + this.height >= obj.y && 
      this.x + this.width > obj.x && 
      this.x < obj.x + obj.width 
    );
  }

  hit() {
    this.life -= 10;
    if (this.life <= 0) {
      this.life = 0;
      this.movingAnimation(this.deathImgs);
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
