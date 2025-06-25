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

    /**Legt die Eigenschaften der geworfenen Flasche fest */
    constructor(x, y, path) {
        super();
        this.loadImg(path);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    /**Setzt in welche Richtung und mit welcher Geschwindigkeit die Flasche fliegt und weist ihr Gravität zu */
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

    /**Wenn eine geworfene FLasche mit einem Objekt kollidiert, wird ein Sound und eine Animation abgespielt
     und die Bewegung in Y Richtung gestoppt*/
    bottleSplash() {
        world.playSound(this.salsaSplashSound);
        this.movingAnimation(this.salsaSplashImgs);
        this.speedY = 0;

    }

    /**Überprüft in welche Richtung der Charakter schaut und beschleunigt die Flasche
     mit einer festgelegten Geschwindigkeit */
    throwingSpeed() {
        if (world.character.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }

    /**Überprüft in welche Richtung der Charakter schaut und beschleunigt die Flasche in dieselbe Richtung */
    throwingDirection() {
        if (world.character.otherDirection) {
            this.x -= 100;
        }
    }
}

