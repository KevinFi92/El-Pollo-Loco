class Throwable extends MoveableObject {
    salsaRotationImgs = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];
    salsaSplashImgs = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];
    salsaSplashSound = new Audio("audio/bottle_splash.mp3");

    direction;

    /**Sets the properties of the thrown bottle
     * @param {number} x x cordinate for the throwable
     * @param {number} y y cordinate for the throwable
     * @param {string} path src of the image to load
     * @param {boolean} direction the direction in which the bottle is thrown. true = to the left; false = to the right
     */
    constructor(x, y, path, direction) {
        super();
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.loadImg(path);
        this.loadImages(this.salsaRotationImgs);
        this.loadImages(this.salsaSplashImgs);
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    /**Sets the direction and speed at which the bottle flies and assigns gravity to it */
    throw() {
        this.throwingDirection();
        this.speedY = 30;
        this.applyGravity();
        this.movingAnimation(this.salsaRotationImgs);
        setInterval(() => {
            this.throwingSpeed();
            if (this.isOnGround - 50) {
                this.bottleSplash();
            }
        }, 25);
    }

    /**When a thrown bottle collides with an object, a sound and animation are played
     and the movement in Y direction is stopped*/
    bottleSplash() {
        world.playSound(this.salsaSplashSound);
        this.movingAnimation(this.salsaSplashImgs);
        this.speedY = 0;
    }

    /**Checks which direction the character is facing and accelerates the bottle
     with a fixed speed */
    throwingSpeed() {
        if (this.direction === true) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }

    /**Checks which direction the character is facing and accelerates the bottle in the same direction */
    throwingDirection() {
        if (world.character.otherDirection) {
            this.x -= 100;
        }
    }
}
