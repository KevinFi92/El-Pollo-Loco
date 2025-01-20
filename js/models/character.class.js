class Character extends MoveableObject {
  y = 150;
  x = 50;
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
 

  constructor() {
    super().loadImg("img/2_character_pepe/2_walk/W-21.png"); 
    this.height = 300;
    this.width = 150;
    this.walkingAnimation()
  }

  moveRight() {
    setInterval (() => {
      this.x += this.speed;
  }, 1000/60)
  
  }
  walkingAnimation() {
    setInterval(() => {
      if (this.world.keyboard.right){
      this.moveRight()
      let i = this.currentImg % this.animationImgs.length;
      this.loadImg(this.animationImgs[i]);
      this.currentImg++;
  }}, 300);
    
  }
  jump() {}
}
