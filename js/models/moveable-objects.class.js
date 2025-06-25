class MoveableObject extends DrawableObject {
    x = 50;
    y = 360;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    life = 100;
    currentImg = 0;
    world;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };


    /** Sets the properties for all movable objects. Here all required functions are created */
    constructor() {
        super();
    }

    /** Function for movement animation */
    chickenMoving(movingImg, n) {
        let Interval = setInterval(() => {
            let i = this.currentImg % movingImg.length;
            this.loadImg(movingImg[i]);
            this.currentImg++;
            if (this.life == 0) {
                clearInterval(Interval);
                this.loadImg(this.deathImgs[n])
            }
        }, 200);
    }

    /** Function sets the movement speed of enemies and clouds */
    movementLeft() {
        let movinginterval = setInterval(() => {
            this.x -= this.speed;
            if (this.life <= 0) {
                clearInterval(movinginterval);
            }
        }, 1000 / 60);
    }

    /** Function for animations stops automatically once the animation has run through once */
    movingAnimation(movingImg) {
        let movementInterval = setInterval(() => {
            let i = this.currentImg % movingImg.length;
            this.loadImg(movingImg[i]);
            this.currentImg++;
            if (i == movingImg.length - 1 && !(this instanceof Throwable)) {
                clearInterval(movementInterval);
            }
        }, 1000 / 30);
    }

    /** Adds gravity to the character and throwables */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /** Function checks if an object is above the ground */
    isAboveGround() {
        if (this instanceof Throwable) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    /** Function checks if an object is on the ground */
    isOnGround() {
        return this.y === 155;
    }

    /** Function checks if two objects collide with each other */
    isColliding(obj) {
        return (
            this.x + this.offset.left < obj.x + obj.width - (obj.offset?.right || 0) &&
            this.x + this.width - this.offset.right > obj.x + (obj.offset?.left || 0) &&
            this.y + this.offset.top < obj.y + obj.height - (obj.offset?.bottom || 0) &&
            this.y + this.height - this.offset.bottom > obj.y + (obj.offset?.top || 0)
        );
    }

    /** Function checks if the character lands on top of an enemy */
    landsOntop(obj) {
        return (
            this.y + this.height >= obj.y && // Bottom edge of character touches top edge of enemy
            this.y + this.height <= obj.y + obj.height && // Character is in the upper area of the enemy
            this.x + this.width - 60 > obj.x && // Right edge of character is right of the left edge of enemy
            this.x < obj.x + obj.width // Left edge of character is left of the right edge of enemy
        );
    }

    /** Function adds damage and checks if the character/enemy is still alive, if not the death animation is called */
    hit() {
        this.life -= 20;
        if (this.life <= 0) {
            this.life = 0;
            this.movingAnimation(this.deathImgs);
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** Sets a timer when the character is hit to avoid too frequent hits */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.0;
    }

    /** Sets a timer when the character has attacked to avoid too frequent attacks */
    hadAttacked() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 2000;
        return timepassed < 2.0;
    }

    /**Returns true if the Character falls down */
    movingDown() {
        let movingDown = this.y > this.lastY;
        this.lastY = this.y;
        return movingDown;
    }
}