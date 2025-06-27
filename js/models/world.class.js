class World {
    character;
    endboss;
    lvl = level_1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    gameStarted = true;
    music = new Audio("audio/western-theme.wav");
    coinSound = new Audio("audio/coins.wav");
    salsaCollectSound = new Audio("audio/bottle_collect.mp3");
    gameOverSound = new Audio("audio/game_over.mp3");
    youWinSound = new Audio("audio/you_won.mp3");
    soundMuted;
    statusBar = new StatusBar(
        10,
        10,
        70,
        200,
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
    );
    coinBar = new StatusBar(
        210,
        10,
        70,
        200,
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png"
    );
    salsaBar = new StatusBar(
        410,
        10,
        70,
        200,
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png"
    );
    throwable = [];
    intervals = [];

/**all elements (classes) are assigned to the "World" class and "painted" into the canvas.
 Important functions like collisions are running in an interval so that they are always active*/
    constructor(canvas, keyboard, character, soundMuted) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.character = character;
        this.keyboard = keyboard;
        this.soundMuted = soundMuted;
        this.setWorld();
        this.draw();
        this.run();
    }

/**The function links the character with the "World" and the "Keyboard"
 and searches the "enemies" array for an enemy that is an instance of the endboss class, and assigns it
 to the world*/
    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
        this.endboss = this.lvl.enemies.find((e) => e instanceof Endboss);
    }

    /** creates individual objects and assigns coordinates */
    creatObject(object) {
        if (object.otherDirection) {
            this.mirrowImg(object);
        }
        this.ctx.drawImage(
            object.img,
            object.x,
            object.y,
            object.width,
            object.height
        );
        if (object.otherDirection) {
            this.mirrowReset(object);
        }
    }

    /** creates multiple objects from an array and assigns coordinates, images and size */
    createObjectsFromArray(objects) {
        objects.forEach((o) => {
            if (!o.collected) {
                this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            }
        });
    }

    /** All objects in the world are created*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.drawWorld();
        this.ctx.restore();
        this.drawStatusbars();
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    drawWorld() {
        this.drawBackground();
        this.drawCollectables();
        this.createObjectsFromArray(this.lvl.enemies);
        this.creatObject(this.character);

    }

    /**Combines the draw method for the background */
    drawBackground() {
        this.createObjectsFromArray(this.lvl.sky);
        this.createObjectsFromArray(this.lvl.thirdlayer);
        this.createObjectsFromArray(this.lvl.secondlayer);
        this.createObjectsFromArray(this.lvl.firstlayer);
        this.createObjectsFromArray(this.lvl.clouds);
    }

    /**Combines the draw method for the status bars */
    drawStatusbars() {
        this.creatObject(this.statusBar);
        this.creatObject(this.coinBar);
        this.creatObject(this.salsaBar);
    }

    /**Combines the draw method for the collectable items */
    drawCollectables() {
        this.createObjectsFromArray(this.lvl.coin);
        this.createObjectsFromArray(this.lvl.salsa);
        this.createObjectsFromArray(this.throwable);
    }

    /** Character image is mirrored when he changes direction from right to left */
    mirrowImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /** Character image is mirrored when he changes direction from left to right */
    mirrowReset(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /** Interval that repeatedly calls important functions */
    run() {
        if (this.gameStarted) {
            let run = setInterval(() => {
                this.throwBottle();
                this.runCollisions();
                this.runGameOverlays();
                this.character.updateLastY();
                this.playSound(this.music);
                this.intervals.push(run);
                if (!this.gameStarted) {
                    clearInterval(run);
                }
            }, 1000/30);
        }
    }

    /**combines all collision queries */
    runCollisions() {
        this.collisionEnemy();
        this.collisionSalsas();
        this.collisionCoins();
        this.collisionThrowable();
    }

    /**combines the functions that open an overlay */
    runGameOverlays() {
        this.winnerWinnerChickenDinner()
        this.gameOver();
    }

    /** Collision detection with enemies */
    collisionEnemy() {
        this.lvl.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.life > 0 && enemy.life > 0 && !this.character.isHurt() && !this.character.landsOntop(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.life, this.statusBar.lifeBar);
                this.playSound(this.character.hit_sound);
            }
            if (this.character.landsOntop(enemy) && enemy.life > 0 && this.character.movingDown() && !(enemy instanceof Endboss)) {
                enemy.hit();
                this.playSound(enemy.hit_sound);
            }
        });
    }

    /** Collision detection with objects that can be collected */
    collisionCoins() {
        this.lvl.coin.forEach((coin, i) => {
            if (this.character.isColliding(coin) && !this.lvl.coin[i].collected) {
                this.coinBar.collect();
                this.coinBar.setPercentage(this.coinBar.amount, this.coinBar.coinBar);
                this.lvl.coin[i].collected = true;
                this.playSound(this.coinSound);
            }
        });
    }

    /** Collision detection with objects that can be collected */
    collisionSalsas() {
        this.lvl.salsa.forEach((salsa, i) => {
            if (this.character.isColliding(salsa) && !this.lvl.salsa[i].collected) {
                this.salsaBar.collect();
                this.lvl.salsa[i].collected = true;
                this.salsaBar.setPercentage(this.salsaBar.amount, this.salsaBar.salsaBar);
                this.playSound(this.salsaCollectSound);
            }
        });
    }

    /** Collision detection with objects that can be collected */
    throwBottle() {
        if (this.keyboard.space && this.salsaBar.amount > 0 && !this.character.hadAttacked()) {
            this.character.lastAttack = new Date().getTime();
            this.throwable = [];
            this.salsaBar.amount -= 20;
            this.salsaBar.setPercentage(this.salsaBar.amount, this.salsaBar.salsaBar);
            let bottle = new Throwable(this.character.x + 100, this.character.y + 100, "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png")
            this.throwable.push(bottle);
        }
    }

    /** Collision detection for the thrown bottle */
    collisionThrowable() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemy) => {
                this.throwable.forEach((bottle, i) => {
                    if (bottle.isColliding(enemy) && enemy.life >= 0 && !enemy.isHurt()) {
                        enemy.hit();
                        this.playSound(enemy.hit_sound);
                        bottle.bottleSplash();
                        setTimeout(() => {
                            this.throwable.splice(i, 1);
                        }, 100);
                    }
                });
            });
        }, 50);
    }

    /** Opens the GameOver overlay and plays sound */
    gameOver() {
        if (this.character.life <= 0) {
            this.playSound(this.gameOverSound);
            this.stopSounds(this.music);
            document.getElementById("restart").style.display = "block";
            this.gameStarted = false;
        }
    }

    /** Opens the winner overlay and plays sound */
    winnerWinnerChickenDinner() {
        if (this.endboss.life <= 0) {
            this.playSound(this.youWinSound)
            this.gameStarted = false;
            document.getElementById("restart").style.backgroundImage = "url(img/9_intro_outro_screens/win/won_2.png)";
            document.getElementById("restart").style.display = "block";
            document.getElementById("restart").innerHTML = "";
            document.getElementById("restart").innerHTML += `
<div class="restart">
  <button  id="restartBtn" onclick="restartGame()">restart game</button>
  <button  id="backBtn" onclick="backToMenu()">back to menu</button>
</div>`;
        }
    }

    /** plays sound */
    playSound(sound) {
        if (this.soundMuted || !this.gameStarted) {
            sound.pause();
        } else {
            this.music.volume = 0.1;
            sound.play();
        }
    }

    /** Stops playing sounds */
    stopSounds(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}
