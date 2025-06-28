class DrawableObject {
  img;
  height;
  width;
  x;
  y;
  amount = 0;
  world;
  imageCache = {}

  /** Sets the most important parameters that all objects in the world need */
  constructor() {
  }

/** Creates a new image and passes the source of the image with "path"
 * @param {string} path src of the image to laod */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**loads images from arry and stores them in a cache  */
  loadImages(arr){
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    })
  }

  /**loads images from array by index
   * @param {string} action name of the array
   * @param {number} i index of the image
   */
  loadImgFromCache(action, i) {
    let path = action[i];
    this.img = this.imageCache[path];
  }

  /** Function increases a counter, through which the status bars are updated */
  collect() {
    this.amount += 20;
    if (this.amount === 100) {
      this.amount = 100;
    }
  }
}
