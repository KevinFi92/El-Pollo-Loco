class StatusBar extends DrawableObject{


    percentage = 100;

    constructor(){
        super().loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
        this.x = 10;
        this.y = 10;
        this.height = 70;
        this.width = 200;
        this.setPercentage(); 
    }

setPercentage (percentage){
    this.percentage = percentage;

    if (this.percentage == 100) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png")
    }
    if (this.percentage == 80) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png")
    }
    if (this.percentage == 60) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png")
    }
    if (this.percentage == 40) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png")
    }
    if (this.percentage == 20) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png")
    }
    if (this.percentage == 0) {
        this.loadImg("img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png")
    }

}

}