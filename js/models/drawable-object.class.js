class DrawableObject {
  img;
  height;
  width;
  x;
  y;
  amount = 0;

  constructor() {}

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  collect() {
    this.amount += 20;
    if (this.amount === 100) {
      this.amount = 100;
    }
  }
}
