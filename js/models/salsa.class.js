class Salsa extends MoveableObject {
  height = 80;
  width = 80;
  amount = 0;

  salsaBottleImg = "img/6_salsa_bottle/salsa_bottle.png";

  salsaRotationImgs = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  salsaSplashImgs = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor() {
    super().loadImg("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 200 + Math.random() * 1400;
    this.y = 80 + Math.random() * 300;
  }
}
