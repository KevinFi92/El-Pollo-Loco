class DrawableObject {
  img;
  height;
  width;
  x;
  y;
  amount = 0;
  world;

  /** Sets the most important parameters that all objects in the world need */
  constructor() {
  }

/** Creates a new image and passes the source of the image with "path"
 * @param {string} path src of the image to laod */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /** Function increases a counter, through which the status bars are updated */
  collect() {
    this.amount += 20;
    if (this.amount === 100) {
      this.amount = 100;
    }
  }
}
