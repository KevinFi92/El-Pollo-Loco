class Endboss extends MoveableObject {
    movingImgs = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png"
    ];
    alertImgs = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ]
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
    attackImgs = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
    speed = 0.5;
    hit_sound = new Audio("audio/boss_hit.mp3");

    /**Assigns all necessary properties to the final boss, such as starting position, size and life points.
     And determines when the boss begins to move and attack */
    constructor() {
        super();
        this.loadImg("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.loadImages(this.alertImgs);
        this.loadImages(this.movingImgs);
        this.loadImages(this.alertImgs);
        this.loadImages(this.deathImgs);
        this.bossAlert();
        this.bossHurt(this.hurtImgs);
        this.bossAttack();
        this.x = 1600;
        this.y = 130;
        this.height = 350;
        this.width = 200;
        this.life = 50;
        this.offset = {
            top: 50,
            bottom: 10,
            left: 10,
            right: 10,}
    }

    /** Function plays an animation when the boss takes damage. But only if a certain time has passed between hits */
    bossHurt(movingImg) {
        let i;
        let Interval = setInterval(() => {
            if (this.isHurt() && this.life > 0) {
                let i = this.currentImg % movingImg.length;
                this.loadImg(movingImg[i]);
                this.currentImg++;
            }
            if (i == movingImg.length - 1 || this.life == 0) {
                clearInterval(Interval);
                this.loadImg("img/4_enemie_boss_chicken/5_dead/G26.png");
            }
        }, 100);
    }

    /** Function to display animations. Animation is played when the character is close enough to the boss */
    bossAlert() {
        let alert = setInterval(() => {
            if (world.character.x >= 1100) {
                this.movingAnimation(this.alertImgs);
                this.bossStartMoving();
                clearInterval(alert);
            }
        }, 1000);
    }

    /** Function: Boss attacks the character as soon as he approaches */
    bossAttack() {
        let attack = setInterval(() => {
            if (world.character.x > (this.x - 150) && !this.hadAttacked()) {
                this.movingAnimation(this.attackImgs);
                this.x = world.character.x + 100;
                world.character.hit();
                world.statusBar.setPercentage(world.character.life, world.statusBar.lifeBar);
                world.playSound(character.hit_sound);
            }
            if (world.character.life == 0 || this.life == 0) {
                clearInterval(attack);
            }
        }, 1000)
    }

    /** Starts the forward movement and animation of the BossChicken */
    bossStartMoving(){
        this.animate(this.movingImgs, 2);
        this.movementLeft();
    }
}
