class Coin extends DrawableObject {
  height = 120;
  width = 120;
  img;
  currentImg = 0;
  coinImgs = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImg("img/8_coin/coin_1.png");
    this.pulsation();
    this.x = 200 + Math.random() * 1400;
    this.y = 80 + Math.random() * 300;
    console.log(this.y);
  }

  pulsation() {
    setInterval(() => {
      let i = this.currentImg % this.coinImgs.length;
      this.loadImg(this.coinImgs[i]);
      this.currentImg++;
    }, 800);
  }
}

// Idee: für jeden Backgrouind der geladen wird wir auch ein neues chicken,
// coin etc erstellt!
