class Coin extends DrawableObject {
    height = 120;
    width = 120;
    img;
    currentImg = 0;
    coinImgs = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
    collected = false;

    /**Erstellt die Coins an einer zufälligen Position und lässt sie pulsieren */
    constructor() {
        super().loadImg("img/8_coin/coin_1.png");
        this.pulsation();
        this.x = 200 + Math.random() * 1400;
        this.y = 80 + Math.random() * 300;
    }

    /** Funktion lässt die Coins in der Welt, durch eine Animation, pulsieren*/
    pulsation() {
        setInterval(() => {
            let i = this.currentImg % this.coinImgs.length;
            this.loadImg(this.coinImgs[i]);
            this.currentImg++;
        }, 800);
    }
}  


