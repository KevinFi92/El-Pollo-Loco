class Sky extends Background{

    /**Assigns the sky layer of the background their starting position */
    constructor(path, x){
        super();
        this.loadImg(path, x)
        this.x = x;
        this.y = 0;
        this.height = 400;
        this.width = 720;
    }
}