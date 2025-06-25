class Character extends MoveableObject {
    y = 155;
    x = 100;
    animationImgs = ["img/2_character_pepe/2_walk/W-21.png", "img/2_character_pepe/2_walk/W-22.png", "img/2_character_pepe/2_walk/W-23.png", "img/2_character_pepe/2_walk/W-24.png", "img/2_character_pepe/2_walk/W-25.png", "img/2_character_pepe/2_walk/W-26.png",];
    jumpingImgs = ["img/2_character_pepe/3_jump/J-31.png", "img/2_character_pepe/3_jump/J-32.png", "img/2_character_pepe/3_jump/J-33.png", "img/2_character_pepe/3_jump/J-34.png", "img/2_character_pepe/3_jump/J-35.png", "img/2_character_pepe/3_jump/J-36.png", "img/2_character_pepe/3_jump/J-37.png", "img/2_character_pepe/3_jump/J-38.png", "img/2_character_pepe/3_jump/J-39.png",];
    deathImgs = ["img/2_character_pepe/5_dead/D-51.png", "img/2_character_pepe/5_dead/D-52.png", "img/2_character_pepe/5_dead/D-53.png", "img/2_character_pepe/5_dead/D-54.png", "img/2_character_pepe/5_dead/D-55.png", "img/2_character_pepe/5_dead/D-56.png", "img/2_character_pepe/5_dead/D-57.png",];
    hurtImgs = ["img/2_character_pepe/4_hurt/H-41.png", "img/2_character_pepe/4_hurt/H-42.png", "img/2_character_pepe/4_hurt/H-43.png",];
    idleImgs = ["img/2_character_pepe/1_idle/idle/I-1.png", "img/2_character_pepe/1_idle/idle/I-2.png", "img/2_character_pepe/1_idle/idle/I-3.png", "img/2_character_pepe/1_idle/idle/I-4.png", "img/2_character_pepe/1_idle/idle/I-5.png", "img/2_character_pepe/1_idle/idle/I-6.png", "img/2_character_pepe/1_idle/idle/I-7.png", "img/2_character_pepe/1_idle/idle/I-8.png", "img/2_character_pepe/1_idle/idle/I-9.png", "img/2_character_pepe/1_idle/idle/I-10.png"]
    idleLongImgs = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ]
    lastY;
    currentImg = 0;
    world;
    speed = 8;
    walking_sounds = new Audio("audio/walking.mp3");
    jumping_sound = new Audio("audio/jump.mp3");
    snoringSound = new Audio("audio/snoring.mp3");
    hit_sound = new Audio("audio/pepe_hit.mp3");

    /**Klasse des Spielcharakters, weißte Eigenschaften wie Größe, Breite und Startkoordinaten zu. Außerdem erhält der Charakter
     wird die Steuerung aktiv und Gravität zugewiesen. Nach einer bestimmten Zeit ohne Bewegung wird die Idle animation abgespielt  */
    constructor() {
        super().loadImg("img/2_character_pepe/2_walk/W-21.png");
        this.height = 300;
        this.width = 150;
        this.walking_sounds.playbackRate = 2.5;
        this.applyGravity();
        this.charMovement();
        this.setIdleTimer();
        this.lastY = this.y;
    }

    /**Charakter läuft nach links. Bewegungssounds und Animationen werden abgespielt und der Charakter in die richtige Richtung gedreht */
    walkLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            world.playSound(this.walking_sounds);
        }
    }

    /**Charakter läuft nach rechts. Bewegungssounds und Animationen werden abgespielt und der Charakter in die richtige Richtung gedreht */
    walkRight() {
        if (this.world.keyboard.right && this.x < this.world.lvl.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            world.playSound(this.walking_sounds);
        }
    }

    /**Charakter spring. Bewegungssounds und Animationen werden abgespielt */
    jump() {
        world.playSound(this.jumping_sound);
        this.speedY = 30;
    }

    /** Funktion um Animationen dazustellen */
    movementAnimation(movement) {
        let i = this.currentImg % movement.length;
        this.loadImg(movement[i]);
        this.currentImg++;
    }

    /** Funktion führt Charakterbewegungen aus, je nachdem welche Taste gedrückt wird */
    charMovement() {
        setInterval(() => {
            if (this.world.keyboard.right) {
                this.walkRight();
                this.movementAnimation(this.animationImgs);
            }
            if (this.world.keyboard.left) {
                this.walkLeft();
                this.movementAnimation(this.animationImgs);
            }
            if (this.world.keyboard.up && !this.isAboveGround()) {
                console.log(this.y);
                this.jump();
                this.movingAnimation(this.jumpingImgs);
            }
            if (this.isHurt()) {
                this.movementAnimation(this.hurtImgs);
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 30);
    }

    /** Funktion setzt einen Timer auf Null jedes Mal, wenn der Charakter sich bewegt, nach 10sek ohne Bewegung wird die IDle Animation ausgeführt */
    setIdleTimer() {
        let time = 0;
        let idle = setInterval(() => {
            time += 0.1;
            if (world.keyboard.right || world.keyboard.left || world.keyboard.up || world.keyboard.space) {
                clearInterval(idle);
                this.resetIdleTimer();
            }
            if (time >= 5) {
                this.playLongIdle()
            } else {
                this.movementAnimation(this.idleImgs)
            }
            if (!world.gameStarted) {
                clearInterval(idle);
            }
        }, 100);
    }

    /**Resets the idle timer to 0 and stops the snoring sound */
    resetIdleTimer() {
        this.setIdleTimer();
        world.stopSounds(this.snoringSound)
    }

    /**Starts the longIdle Animation and starts the snoring sound */
    playLongIdle() {
        this.movementAnimation(this.idleLongImgs);
        world.playSound(this.snoringSound);
    }

    /**Tracks the Y-Position */
    updateLastY() {
        this.lastY = this.y;
    }
}

