class Endboss extends MoveableObject{
    height = 350;
    width = 200;
    currentImg = 0;
    movingImg = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
      ];
      constructor(){
        super().loadImg("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.movingAnimation();
        this.x = 500;
        this.y = 130;
      }
}