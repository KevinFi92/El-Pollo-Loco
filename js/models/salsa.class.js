class Salsa extends DrawableObject {

  /** Sets the size of the salsa and assigns a random position for X and Y */
  constructor() {
    super();
    this.loadImg("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 200 + Math.random() * 1400;
    this.y = 80 + Math.random() * 300;
    this.height = 80;
    this.width = 80;
  }
}
