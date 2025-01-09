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

  creatObject(object) {
    this.ctx.drawImage(
      object.img,
      object.x,
      object.y,
      object.width,
      object.height
    );
  }

  createObjectsFromArray(objects){
    objects.forEach((o) => {
      this.ctx.drawImage(
        o.img,
        o.x,
        o.y,
        o.width,
        o.height
      );
    });
  };

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.creatObject(this.sky);
    this.creatObject(this.thirdlayer);
    this.creatObject(this.secondlayer);
    this.creatObject(this.firstlayer);
    this.creatObject(this.character);
    this.createObjectsFromArray(this.enemies);
    this.createObjectsFromArray(this.clouds);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });

    // console.log(this.character.x);
  }
}
