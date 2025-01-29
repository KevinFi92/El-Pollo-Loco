class World {
  character = new Character();
  lvl = level_1;
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
    this.drawRectangles(object.x, object.y, object.width, object.height, object);
    if (object.otherDirection) {
      this.mirrowReset(object);
    }
  }

  createObjectsFromArray(objects) {
    objects.forEach((o) => {
      this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
      this.drawRectangles(o.x, o.y, o.width, o.height, o);
    
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.createObjectsFromArray(this.lvl.sky);
    this.createObjectsFromArray(this.lvl.thirdlayer);
    this.createObjectsFromArray(this.lvl.secondlayer);
    this.createObjectsFromArray(this.lvl.firstlayer);
    this.creatObject(this.character);
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

  drawRectangles(x, y, width, height, o){
    if (o instanceof Character || o instanceof chicken){
      this.ctx.beginPath();
      this.ctx.lineWidth = '5';
      this.ctx.strokeStyle = "blue";
      this.ctx.rect(x, y, width, height);
      this.ctx.stroke();
    }


  }

  isColliding(obj) {
    return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height)
          }

}
