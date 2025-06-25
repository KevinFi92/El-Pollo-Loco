class Sky extends Background{

    /**Legt die größe und Position des Himmels fest */
    constructor(path, x){
        super();
        this.loadImg(path, x)
        this.x = x;
        this.y = 0;
        this.height = 400;
        this.width = 720;
    }
}