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

  /**
   * Repräsentiert ein Level im Spiel. Enthält Gegner, Umgebungsobjekte, Hintergründe und Level-Begrenzung.
   */
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
