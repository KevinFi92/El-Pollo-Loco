class Level {
  enemies;
  clouds;
  firstlayer;
  secondlayer;
  thirdlayer;
  sky;
  coin;
  salsa;
  level_end_x = 1450;

  /** Represents a level in the game. Contains enemies, environmental objects, backgrounds and level boundaries. */
  constructor(
    enemies,
    clouds,
    firstlayer,
    secondlayer,
    thirdlayer,
    sky,
    coin,
    salsa
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.firstlayer = firstlayer;
    this.secondlayer = secondlayer;
    this.thirdlayer = thirdlayer;
    this.sky = sky;
    this.coin = coin;
    this.salsa = salsa;
  }
}
