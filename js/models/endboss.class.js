class Endboss extends MoveableObject{
    movingImg = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
      ];
      deathImgs = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png"
      ];
      hurtImgs = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png"
      ];
      
      
      constructor(){
        super().loadImg("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.movingAnimation(this.movingImg);
        this.x = 1600;
        this.y = 130;
        this.height = 350;
        this.width = 200;
        this.life = 50;    
        this.bossHurt(this.hurtImgs);
      }


      bossHurt(movingImg) {
        let i = this.currentImg % movingImg.length;
        let Interval =setInterval(() => {
          if(this.isHurt()) {
           this.loadImg(movingImg[i]);
           this.currentImg++;
          }if (i == movingImg.length - 1 || this.life == 0) {
             clearInterval(Interval);
           }
     
         }, 200);
         
}    }