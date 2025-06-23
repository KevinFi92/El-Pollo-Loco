class ThirdLayer extends Background{

    /**Setzt die Größe und Position des dritten Layers des Hintergrundes */
    constructor(path, x){
        super().loadImg(path, x)
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}