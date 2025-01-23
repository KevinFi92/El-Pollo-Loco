class Level {
    enemies;
    clouds;
    firstlayer;
    secondlayer;
    thirdlayer;
    sky;
    level_end_x = 1450;

    constructor(enemies, clouds, firstlayer,secondlayer, thirdlayer, sky){
        this.enemies = enemies;
        this.clouds = clouds;
        this.firstlayer = firstlayer;
        this.secondlayer = secondlayer;
        this.thirdlayer = thirdlayer;
        this.sky = sky;
    }


}