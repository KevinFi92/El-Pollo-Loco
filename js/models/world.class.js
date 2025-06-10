class World {
    character;
    endboss;
    lvl = level_1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    world_x = 0;
    gameStarted = true;
    music = new Audio("audio/western-theme.wav");
    coinSound = new Audio("audio/coins.wav");
    salsaCollectSound = new Audio("audio/bottle_collect.mp3");
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

    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
        this.endboss = this.lvl.enemies.find((e) => e instanceof Endboss);
    }

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
        this.drawRectangles(
            object.x,
            object.y,
            object.width,
            object.height,
            object
        );
        if (object.otherDirection) {
            this.mirrowReset(object);
        }
    }

    createObjectsFromArray(objects) {
        objects.forEach((o) => {
            if (!o.collected) {
                this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
                this.drawRectangles(o.x, o.y, o.width, o.height, o);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.createObjectsFromArray(this.lvl.sky);
        this.createObjectsFromArray(this.lvl.thirdlayer);
        this.createObjectsFromArray(this.lvl.secondlayer);
        this.createObjectsFromArray(this.lvl.firstlayer);
        this.createObjectsFromArray(this.lvl.coin);
        this.createObjectsFromArray(this.lvl.salsa);
        this.createObjectsFromArray(this.throwable);
        this.creatObject(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.creatObject(this.statusBar);
        this.creatObject(this.coinBar);
        this.creatObject(this.salsaBar);
        this.ctx.translate(this.camera_x, 0);
        this.createObjectsFromArray(this.lvl.enemies);
        this.createObjectsFromArray(this.lvl.clouds);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    mirrowImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    mirrowReset(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    drawRectangles(x, y, width, height, o) {
        if (o instanceof Character || o instanceof chicken) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "5";
            this.ctx.strokeStyle = "blue";
            this.ctx.rect(x, y, width, height);
            this.ctx.stroke();
        }
    }

    run() {
        if (this.gameStarted) {
            let run = setInterval(() => {
                this.throwBottle();
                this.collisionEnemy();
                this.collisionSalsas();
                this.collisionCoins();
                this.collisionThrowable();
                this.winnerWinnerChickenDinner()
                this.gameOver();
                this.playSound(this.music);
                this.intervals.push(run);
                if (!this.gameStarted) {
                    clearInterval(run);
                }
            }, 50);
        }
    }

    collisionEnemy() {
        this.lvl.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.life > 0 && enemy.life > 0 && !this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.life, this.statusBar.lifeBar);
            }
            if (this.character.landsOntop(enemy) && enemy.life > 0) {
                enemy.hit();
                this.playSound(enemy.hit_sound);
            }
        });
    }

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


    throwBottle() {
        if (this.keyboard.space && this.salsaBar.amount > 0) {
            this.throwable = [];
            this.salsaBar.amount -= 20;
            this.salsaBar.setPercentage(this.salsaBar.amount, this.salsaBar.salsaBar);
            let bottle = new Throwable(this.character.x + 100, this.character.y + 100)
            this.throwable.push(bottle);
        }

    }

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
        0
    }

    gameOver() {
        if (this.character.life <= 0) {
            this.stopSounds(this.music);
            document.getElementById("restart").style.display = "block";
            this.gameStarted = false;
        }
    }

    winnerWinnerChickenDinner() {
        if (this.endboss.life <= 0) {
            document.getElementById("restart").style.display = "block";
            document.getElementById("restart").innerHTML = "";
            document.getElementById("restart").innerHTML += `
  <h2>You won!</h2>
  <h3 class="restart" onclick="restartGame()">restart game</h3>
  <h3 class="restart" onclick="restartGame()">back to menu</h3>`;
            this.gameStarted = false;
        }
    }

    playSound(sound) {
        if (this.soundMuted || !this.gameStarted) {
            sound.pause();
        } else {
            this.music.volume = 0.1;
            sound.play();
        }
    }


    stopSounds(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}
 