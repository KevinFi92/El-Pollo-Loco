class Salsa extends DrawableObject {

  /**Legt die Größe der Salsa fest und weist eine zufällige Position für X und Y fest */
  constructor() {
    super().loadImg("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 200 + Math.random() * 1400;
    this.y = 80 + Math.random() * 300;
    this.height = 80;
    this.width = 80;
  }

}
