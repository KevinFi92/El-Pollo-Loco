class SecondLayer extends Background{

    /**Setzt die Größe und Position des zweiten Layers des Hintergrundes */
    constructor(path, x){
        super();
        this.loadImg(path, x);
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}