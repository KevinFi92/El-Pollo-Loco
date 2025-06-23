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
    gameOverSound = new Audio("audio/game_over.mp3");
    youWinSound = new Audio("audio/you_won.mp3");
    soundMuted = Boolean(localStorage.getItem("status"));
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

/**Hier werden alle Elemente (Klassen) der Klasse "World" zugeordnet und in das Canvas "gemahlt".*/
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

/**Die Funktion verknüpft den Charakter mit der "World" und dem "Keyboard"
 und durchsucht das Array "enemies" nach einem Gegner, der eine Instanz der Klasse endboss ist, und weist diesen
 der Welt zu*/
    setWorld() {
        this.character.world = this;
        this.character.keyboard = this.keyboard;
        this.endboss = this.lvl.enemies.find((e) => e instanceof Endboss);
    }

    /** erstellt einzelne Objekte und weist Koordinaten zu  */
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

    /** erstellt mehrere Objekte aus einem Array und weist Koordinaten, Bilder und Größe zu  */
    createObjectsFromArray(objects) {
        objects.forEach((o) => {
            if (!o.collected) {
                this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
            }
        });
    }

    /** Alle Objekte in der Welt werden erstellt*/
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground()
        this.drawCollectables()
        this.creatObject(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusbars();
        this.ctx.translate(this.camera_x, 0);
        this.createObjectsFromArray(this.lvl.enemies);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**Fast die Draw methode für den Hintergrund zusammen */
    drawBackground() {
        this.createObjectsFromArray(this.lvl.sky);
        this.createObjectsFromArray(this.lvl.thirdlayer);
        this.createObjectsFromArray(this.lvl.secondlayer);
        this.createObjectsFromArray(this.lvl.firstlayer);
        this.createObjectsFromArray(this.lvl.clouds);
    }

    /**Fast die Draw methode für die Statusbars zusammen */
    drawStatusbars() {
        this.creatObject(this.statusBar);
        this.creatObject(this.coinBar);
        this.creatObject(this.salsaBar);
    }

    /**Fast die Draw methode für die sammelbaren Gegenstände zusammen */
    drawCollectables() {
        this.createObjectsFromArray(this.lvl.coin);
        this.createObjectsFromArray(this.lvl.salsa);
        this.createObjectsFromArray(this.throwable);
    }

    /** Bild des Charakters wird gespiegelt, wenn er die Bewegungsrichtung von rechts nach links ändert  */
    mirrowImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /** Bild des Charakters wird gespiegelt, wenn er die Bewegungsrichtung von links nach rechts ändert  */
    mirrowReset(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /** Interval der wichtige Funktionen immer wieder aufruft  */
    run() {
        if (this.gameStarted) {
            let run = setInterval(() => {
                this.throwBottle();
                this.runCollisions();
                this.runGameOverlays()
                this.playSound(this.music);
                this.intervals.push(run);
                if (!this.gameStarted) {
                    clearInterval(run);
                }
            }, 50);
        }
    }

    /**fasst alle Kollisionsbaufragen zusammen */
    runCollisions() {
        this.collisionEnemy();
        this.collisionSalsas();
        this.collisionCoins();
        this.collisionThrowable();
    }

    /**fast die Funktionen zusammen, die ein Overlay öffnen */
    runGameOverlays() {
        this.winnerWinnerChickenDinner()
        this.gameOver();
    }

    /** Collisionsabfrage mit Gegnern  */
    collisionEnemy() {
        this.lvl.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.life > 0 && enemy.life > 0 && !this.character.isHurt()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.life, this.statusBar.lifeBar);
                this.playSound(character.hit_sound);
            }
            if (this.character.landsOntop(enemy) && enemy.life > 0 && !this.character.isOnGround()) {
                enemy.hit();
                this.playSound(enemy.hit_sound);
            }
        });
    }

    /** Collisionsabfrage mit Objecten die gesammelt werden  */
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

    /** Collisionsabfrage mit Objecten die gesammelt werden  */
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

    /** Collisionsabfrage mit Objecten die gesammelt werden  */
    throwBottle() {
        if (this.keyboard.space && this.salsaBar.amount > 0) {
            this.throwable = [];
            this.salsaBar.amount -= 20;
            this.salsaBar.setPercentage(this.salsaBar.amount, this.salsaBar.salsaBar);
            let bottle = new Throwable(this.character.x + 100, this.character.y + 100, "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png")
            this.throwable.push(bottle);
        }
    }

    /** Collisionsabfrage für die geworfene Flasche  */
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

    /** Öffnet das GameOver overlay und spielt Sound ab*/
    gameOver() {
        if (this.character.life <= 0) {
            this.playSound(this.gameOverSound);
            this.stopSounds(this.music);
            document.getElementById("restart").style.display = "block";
            this.gameStarted = false;
        }
    }

    /** Öffnet das winner overlay und spielt Sound ab*/
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

    /** spielt Sound ab*/
    playSound(sound) {
        if (this.soundMuted || !this.gameStarted) {
            sound.pause();
        } else {
            this.music.volume = 0.1;
            sound.play();
        }
    }

    /** Stoppt das Abspielen von sounds*/
    stopSounds(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}
 