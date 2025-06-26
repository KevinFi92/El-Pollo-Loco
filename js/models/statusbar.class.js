class StatusBar extends DrawableObject {
  lifeBar = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];
  coinBar = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
  ];
  salsaBar = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
  ];
  percentage = 100;

  /** Sets the size and position of the status bars */
  constructor(x, y, h, w, path) {
    super();
    this.loadImg(path);
    this.x = x;
    this.y = y;
    this.height = h;
    this.width = w;
    this.setPercentage();
  }

/**Updated the status bars. loads the right picture according to the percentage */
  setPercentage(percentage, bar) {
    this.percentage = percentage;

    if (this.percentage == 100) {
      this.loadImg(bar[0]);
    }
    if (this.percentage == 80) {
      this.loadImg(bar[1]);
    }
    if (this.percentage == 60) {
      this.loadImg(bar[2]);
    }
    if (this.percentage == 40) {
      this.loadImg(bar[3]);
    }
    if (this.percentage == 20) {
      this.loadImg(bar[4]);
    }
    if (this.percentage == 0) {
      this.loadImg(bar[5]);
    }
  }
}


 