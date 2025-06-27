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

    /**Class of the game character, assigns properties such as height, width and starting coordinates. Additionally, the character
     gets active controls and gravity assigned. After a certain time without movement, the idle animation is played */
    constructor() {
        super();
        this.loadImg("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.idleImgs)
        this.loadImages(this.animationImgs)
        this.loadImages(this.jumpingImgs)
        this.loadImages(this.hurtImgs)
        this.loadImages(this.idleLongImgs)
        this.loadImages(this.deathImgs);
        this.height = 300;
        this.width = 150;
        this.walking_sounds.playbackRate = 2.5;
        this.applyGravity();
        this.charMovement();
        this.setIdleTimer();
        this.lastY = this.y;
        this.offset = {
            top: 100,
            bottom: 0,
            left: 0,
            right: 60,}
    }

    /**Character walks to the left. Movement sounds and animations are played and the character is turned in the right direction */
    walkLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            world.playSound(this.walking_sounds);
        }
    }

    /**Character walks to the right. Movement sounds and animations are played and the character is turned in the right direction */
    walkRight() {
        if (this.world.keyboard.right && this.x < this.world.lvl.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            world.playSound(this.walking_sounds);
        }
    }

    /**Character jumps. Movement sounds and animations are played */
    jump() {
        world.playSound(this.jumping_sound);
        this.speedY = 30;
    }

    /** Function executes character movements depending on which key is pressed */
    charMovement() {
        setInterval(() => {
            if (this.world.keyboard.right) {
                this.walkRight();
                this.animateOnce(this.animationImgs);
            }
            if (this.world.keyboard.left) {
                this.walkLeft();
                this.animateOnce(this.animationImgs);
            }
            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
                this.movingAnimation(this.jumpingImgs);
            }
            if (this.isHurt()) {
                this.animateOnce(this.hurtImgs);
            }
            this.world.camera_x = -this.x + 150;
        },  1000/30);
    }

    /** Function resets a timer to zero each time the character moves, after 10 seconds without movement the idle animation is executed */
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
                this.animateOnce(this.idleImgs)
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
        this.animateOnce(this.idleLongImgs);
        world.playSound(this.snoringSound);
    }

    /**Tracks the Y-Position */
    updateLastY() {
        this.lastY = this.y;
    }

    /** Loads images from a cache and animates them*/
    animateOnce(action) {
            let i = this.currentImg % action.length;
            let path = action[i];
            this.img = this.imageCache[path];
            this.currentImg++;
    }
}
