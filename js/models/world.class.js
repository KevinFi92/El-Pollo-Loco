class World {
  character = new Character();
  enemies = [new chicken(), new chicken(), new chicken()];
  clouds = [
    new Clouds("img/5_background/layers/4_clouds/1.png"),
    new Clouds("img/5_background/layers/4_clouds/2.png"),
  ];
  firstlayer = [
    new FirstLayer("img/5_background/layers/1_first_layer/2.png", -719),
    new FirstLayer("img/5_background/layers/1_first_layer/1.png", 0),
    new FirstLayer("img/5_background/layers/1_first_layer/2.png", 719),
  ];
  secondlayer = [
    new SecondLayer("img/5_background/layers/2_second_layer/2.png", -719),
    new SecondLayer("img/5_background/layers/2_second_layer/1.png", 0),
    new SecondLayer("img/5_background/layers/2_second_layer/2.png", 719),
  ];
  thirdlayer = [
    new ThirdLayer("img/5_background/layers/3_third_layer/2.png", -719),
    new ThirdLayer("img/5_background/layers/3_third_layer/1.png", 0),
    new ThirdLayer("img/5_background/layers/3_third_layer/2.png", 719),
  ];
  sky = [
    new Sky("img/5_background/layers/air.png", -719),
    new Sky("img/5_background/layers/air.png", 0),
    new Sky("img/5_background/layers/air.png", 719),
  ];

  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  world_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
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
    if (object.otherDirection) {
      this.mirrowReset(object);
    }
  }

  createObjectsFromArray(objects) {
    objects.forEach((o) => {
      this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.createObjectsFromArray(this.sky);
    this.createObjectsFromArray(this.thirdlayer);
    this.createObjectsFromArray(this.secondlayer);
    this.createObjectsFromArray(this.firstlayer);
    this.creatObject(this.character);
    this.createObjectsFromArray(this.enemies);
    this.createObjectsFromArray(this.clouds);
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
}
