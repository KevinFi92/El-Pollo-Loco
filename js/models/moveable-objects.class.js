class MoveableObject extends DrawableObject {
    x = 50;
    y = 360;
    offsetY;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    life = 100;
    currentImg = 0;
    world;

    constructor(path) {
        super().loadImg(path);

    }

    /** Funktion bewegungsanimation */
    chickenMoving(movingImg) {
        let Interval = setInterval(() => {
            let i = this.currentImg % movingImg.length;
            this.loadImg(movingImg[i]);
            this.currentImg++;
            if (this.life == 0) {
                clearInterval(Interval);
                this.loadImg(this.deathImgs)
            }

        }, 200);
    }

    /** Funktion setzt die Bewegungsgeschwindigkeit von Gegnern und Wolken */
    movementLeft() {
        let movinginterval = setInterval(() => {
            this.x -= this.speed;
            if (this.life == 0) {
                clearInterval(movinginterval);
            }
        }, 1000 / 60);

    }

    /** Funktion für Animationen, stoppt automatisch, sobald die Animation einmal durchgelaufen ist */
    movingAnimation(movingImg) {
        let movementInterval = setInterval(() => {
            let i = this.currentImg % movingImg.length;
            this.loadImg(movingImg[i]);
            this.currentImg++;
            if (i == movingImg.length - 1 && !(this instanceof Throwable)) {
                clearInterval(movementInterval);
            }
        }, 50);
    }

    /** Fügt dem Charakter und throwables Gravität hinzu */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /** Funktion prüft ob sich ein Objekt über dem Boden befindet */
    isAboveGround() {
        if (this instanceof Throwable) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    /** Funktion prüft ob sich ein Objekt auf dem Boden befindet */
    isOnGround() {
        return this.y === 155;
    }

    /** Funktion prüft ob zwei Objekte miteinander kollidieren  */
    isColliding(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height  &&
            this.y + this.height > obj.y
        );
    }

    /** Funktion prüft ob der Charakter auf einem Gegner landet  */
    landsOntop(obj) {
        return (
            this.y + this.height >= obj.y && // Unterer Rand des Charakters berührt oberen Rand des Gegners
            this.y + this.height <= obj.y + obj.height / 2 && // Charakter ist im oberen Bereich des Gegners
            this.x + this.width - 50 > obj.x && // Rechter Rand des Charakters ist rechts vom linken Rand des Gegners
            this.x < obj.x + obj.width // Linker Rand des Charakters ist links vom rechten Rand des Gegners
        );
    }

    /** Funktion fügt Schaden zu und prüft ober der Charakter/Gegner noch lebt, wenn nein wird die Todesanimation aufgerufen  */
    hit() {
        this.life -= 20;
        if (this.life <= 0) {
            this.life = 0;
            this.movingAnimation(this.deathImgs);
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /** Setzt einen Timer wenn der Charakter getroffen wird, um zu häufige Treffer zu vermeiden  */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.0;
    }

    /** Setzt einen Timer wenn der Charakter angegriffen hat, um zu häufige Angriffe zu vermeiden  */
    hadAttacked() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 2000;
        return timepassed < 2.0;
    }


}
