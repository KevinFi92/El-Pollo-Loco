class MoveableObject {
    x = 50;
    y = 360;
    img;
    height;
    width;
    otherDirection = false;

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
    }
