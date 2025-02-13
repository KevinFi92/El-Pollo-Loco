class MoveableObject extends DrawableObject {
  x = 50;
  y = 360;
  offsetY;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  life = 100;

  constructor(path) {
    super().loadImg(path);
  }

  movementLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  movingAnimation() {
    setInterval(() => {
      let i = this.currentImg % this.movingImg.length;
      this.loadImg(this.movingImg[i]);
      this.currentImg++;
    }, 300);
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

  checkLife() {
    const interval = setInterval(() => {
      if (this.life <= 0) {
        this.movementAnimation(this.deathImgs);
        if (this.img.src.includes(this.charDead)) {
          clearInterval(interval);
        }
      }
    }, 100);
  }

  hit() {
    this.life -= 10;
    if (this.life < 0) {
      this.life = 0;
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
