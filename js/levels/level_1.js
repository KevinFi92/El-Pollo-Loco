let level_1;

/**Erstellt die grundlegenden Elemente der Welt und weist ihnen ihr Bild zu und, wenn benötigt, eine X-Koordinate */
function initLevel() {
  level_1 = new Level(
      [new chicken(), new chicken(), new chicken(), new Chick(), new Chick(), new Chick(), new Endboss()],
      [
        new Clouds("img/5_background/layers/4_clouds/1.png"),
        new Clouds("img/5_background/layers/4_clouds/2.png"),
      ],
      [
        new FirstLayer("img/5_background/layers/1_first_layer/2.png", -719),
        new FirstLayer("img/5_background/layers/1_first_layer/1.png", 0),
        new FirstLayer("img/5_background/layers/1_first_layer/2.png", 719),
        new FirstLayer("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      ],
      [
        new SecondLayer("img/5_background/layers/2_second_layer/2.png", -719),
        new SecondLayer("img/5_background/layers/2_second_layer/1.png", 0),
        new SecondLayer("img/5_background/layers/2_second_layer/2.png", 719),
        new SecondLayer("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      ],
      [
        new ThirdLayer("img/5_background/layers/3_third_layer/2.png", -719),
        new ThirdLayer("img/5_background/layers/3_third_layer/1.png", 0),
        new ThirdLayer("img/5_background/layers/3_third_layer/2.png", 719),
        new ThirdLayer("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      ],
      [
        new Sky("img/5_background/layers/air.png", -719),
        new Sky("img/5_background/layers/air.png", 0),
        new Sky("img/5_background/layers/air.png", 719),
        new Sky("img/5_background/layers/air.png", 719 * 2),
      ],
      [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
      [new Salsa(), new Salsa(), new Salsa(), new Salsa(), new Salsa()]
  );
}