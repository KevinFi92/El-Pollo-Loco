class Endboss extends MoveableObject {
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
    attackImgs = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ]
    hit_sound = new Audio("audio/boss_hit.mp3");

    constructor() {
        super().loadImg("img/4_enemie_boss_chicken/1_walk/G1.png");
        this.bossAlert();
        this.bossHurt(this.hurtImgs);
        this.bossAttack();
        this.x = 1600;
        this.y = 130;
        this.height = 350;
        this.width = 200;
        this.life = 50;
    }

    /** Funktion spielt eine Animation ab, wenn der Boss Schaden nimmt. Aber nur wenn eine bestimmte Zeit zwischen den Treffern vergangen ist */
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

            }
        }, 100);
    }

    /** Funktion um Animationen dazustellen. Animation wird abgespielt, wenn der Character nah genug am Boss ost */
    bossAlert() {
        let alert = setInterval(() => {
            if (world.character.x >= 1100) {
                this.movingAnimation(this.movingImg);
                clearInterval(alert);
            }
        }, 1000);
    }

    /** Funktion Boss attakiert den Charakter sobald der sich nähert */
    bossAttack() {
        let attack = setInterval(() => {
            if (world.character.x > (this.x - 250) && !this.hadAttacked()) {
                this.movingAnimation(this.attackImgs);
                world.character.hit();
                world.statusBar.setPercentage(world.character.life, world.statusBar.lifeBar);
                world.playSound(character.hit_sound);
            }
            if (world.character.life == 0 || this.life == 0) {
                clearInterval(attack);
            }
        }, 1000)
    }
}