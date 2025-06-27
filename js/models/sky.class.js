class Sky extends Background{

    /**Assigns the sky layer of the background their starting position
     *    @param {sting} path src of the image to load
     *      @param {number} x the x-cordinate for the image*/
    constructor(path, x){
        super();
        this.loadImg(path, x)
        this.x = x;
        this.y = 0;
        this.height = 400;
        this.width = 720;
    }
}