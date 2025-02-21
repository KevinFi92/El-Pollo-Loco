class World {
  character = new Character();
  lvl = level_1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  world_x = 0;
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
  lastCoin;
  throwable = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.run(0);
  }

  setWorld() {
    this.character.world = this;
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
  }});
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
    setInterval(() => {            
      this.throwBottle();
      this.collisionEnemy();
      this.collisionSalsas();
      this.collisionCoins();
  }, 500);
  }

  collisionEnemy() {
    this.lvl.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(
          this.character.life,
          this.statusBar.lifeBar
        );
      }
    });
  }

  collisionCoins() {
    this.lvl.coin.forEach((coin, i) => {
      if (this.character.isColliding(coin) && !this.lvl.coin[i].collected) {
        this.coinBar.collect();
        this.coinBar.setPercentage(this.coinBar.amount, this.coinBar.coinBar);
        this.lvl.coin[i].collected = true;
      }
    });
  }

  collisionSalsas() {
    this.lvl.salsa.forEach((salsa, i) => {
      if (this.character.isColliding(salsa) && !this.lvl.salsa[i].collected) {
        this.salsaBar.collect();
        this.lvl.salsa[i].collected = true;
        this.salsaBar.setPercentage(this.salsaBar.amount,this.salsaBar.salsaBar);
      }
    });
  }


  throwBottle(){
    if (this.keyboard.space && this.salsaBar.amount > 0){
      this.throwable = [];
      this.salsaBar.amount -= 20;
      this.salsaBar.setPercentage(this.salsaBar.amount, this.salsaBar.salsaBar);
      let bottle = new Throwable(this.character.x +100, this.character.y +100)
      this.throwable.push(bottle);
    }

  }

}
 