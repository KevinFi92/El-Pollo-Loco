class World {
  character = new Character();
  enemies = [new chicken(), new chicken(), new chicken()];
  clouds = [new Clouds(), new Clouds()];
  firstlayer = new FirstLayer();
  secondlayer = new SecondLayer();
  thirdlayer = new ThirdLayer();
  sky = new Sky();
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(
      this.sky.img,
      this.sky.x,
      this.sky.y,
      this.sky.width,
      this.sky.height
    );

    this.ctx.drawImage(
      this.thirdlayer.img,
      this.thirdlayer.x,
      this.thirdlayer.y,
      this.thirdlayer.width,
      this.thirdlayer.height
    );

    this.ctx.drawImage(
      this.secondlayer.img,
      this.secondlayer.x,
      this.secondlayer.y,
      this.secondlayer.width,
      this.secondlayer.height
    );

    this.ctx.drawImage(
      this.firstlayer.img,
      this.firstlayer.x,
      this.firstlayer.y,
      this.firstlayer.width,
      this.firstlayer.height
    );

   
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );
    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(
        enemy.img,
        enemy.x,
        enemy.y,
        enemy.width,
        enemy.height
      );
    });
    this.clouds.forEach((cloud) => {this.ctx.drawImage(
      cloud.img,
      cloud.x,
      cloud.y,
      cloud.width,
      cloud.height
    )});





    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });

    // console.log(this.character.x);
  }
}
