class SecondLayer extends Background{

    /**Assigns the second layer of the background their starting position */
    constructor(path, x){
        super();
        this.loadImg(path, x);
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}