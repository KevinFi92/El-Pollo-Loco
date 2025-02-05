class Coin extends MoveableObject {
    height = 120;
    width = 120;
    img;
    currentImg = 0;
    coinImgs = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    salsaBottleImg = 'img/6_salsa_bottle/salsa_bottle.png'

    salsaRotationImgs = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    salsaSplashImgs = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor() {
    super().loadImg("img/8_coin/coin_1.png");
    this.pulsation(); 
    this.x = 200 + Math.random() * 1400;
    this.y = 80 + Math.random() * 300;
    console.log(this.y);
    
    }

    pulsation (){
        setInterval(() => {
            let i = this.currentImg % this.coinImgs.length;
            this.loadImg(this.coinImgs[i]);
            this.currentImg++;
          }, 800);
    } 
}

// Idee: für jeden Backgrouind der geladen wird wir auch ein neues chicken,
// coin etc erstellt!