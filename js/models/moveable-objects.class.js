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
    imageCache = {};


    /** Sets the properties for all movable objects. Here all required functions are created */
    constructor() {
        super();
    }

    /**loads images from arry and stores them in a cache  */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /** Function for looped animations */
    animate(action, n) {
        let Interval = setInterval(() => {
            let i = this.currentImg % action.length;
            let path = action[i];
            this.img = this.imageCache[path];
            this.currentImg++;
            if (this.life == 0) {
                clearInterval(Interval);
                this.loadImg(this.deathImgs[n])
            }
            if (!world.gameStarted) {
                clearInterval(Interval);
            }
        }, 200);
    }

    /** Function for animations. Animation stopps */
    animateOnce(action) {
        let i = this.currentImg % action.length;
        let path = action[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    /** Function sets the movement speed of enemies and clouds */
    movementLeft() {
        let movinginterval = setInterval(() => {
            this.x -= this.speed;
            if (this.life <= 0 || !world.gameStarted) {
                clearInterval(movinginterval);
            }
        }, 1000 / 60);
    }

    /** Function for animations stops automatically once the animation has run through once */
    movingAnimation(action) {
        let movementInterval = setInterval(() => {
            let i = this.currentImg % action.length;
            let path = action[i];
            this.img = this.imageCache[path];
            this.currentImg++;
            if (i == action.length - 1 && !(this instanceof Throwable)) {
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
            this.x + this.offset.left < obj.x + obj.width &&
            this.x + this.width - this.offset.right > obj.x &&
            this.y + this.offset.top < obj.y + obj.height &&
            this.y + this.height - this.offset.bottom > obj.y
        );
    }

    /** Function checks if the character lands on top of an enemy */
    landsOntop(obj) {
        return (
            this.y + this.height - this.offset.bottom > obj.y &&  // Der Charakter ist tiefer als die Oberseite des Gegners
            this.y + this.height - this.offset.bottom < obj.y + obj.height/2 &&  // aber nicht tiefer als die Mitte
            this.speedY < 0 &&  // fällt nach unten
            this.x + this.width - this.offset.right > obj.x + (obj.offset?.left || 0) &&
            this.x + this.offset.left < obj.x + obj.width - (obj.offset?.right || 0)
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