class DrawableObject {
  img;
  height;
  width;
  x;
  y;
  amount = 0;
  imageCache = {};
  world;
  constructor() {
  }

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /** Funktion erhöht einen Zähler, durch den die Statusbars aktualisiert werden */
  collect() {
    this.amount += 20;
    if (this.amount === 100) {
      this.amount = 100;
    }
  }
}
