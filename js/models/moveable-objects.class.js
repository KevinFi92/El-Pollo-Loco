class MoveableObject {
    x = 50;
    y = 360;
    img;
    height;
    width;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;

    constructor(){};
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    movementLeft(){
        setInterval (() => {
            this.x -= this.speed;
        }, 1000/60)
    }

    movingAnimation() {
        setInterval(() => {
          let i = this.currentImg % this.movingImg.length;
          this.loadImg(this.movingImg[i]);
          this.currentImg++;
        }, 300);
      }

      applyGravity(){
        setInterval (() => {
          if (this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
          }
      }, 1000/60);
  }
      

      isAboveGround(){
        return this.y < 155
      }
      
      isOnGround(){
        return this.y === 155
      }

      
      
      }