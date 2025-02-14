class Throwable extends MoveableObject {
  height = 80;
  width = 80;

  constructor(x, y) {
    super().loadImg("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw();
  }

  throw() {
    if (world.character.otherDirection) {
      this.x -= 100;
    }
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (world.character.otherDirection) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 25);
  }
}
