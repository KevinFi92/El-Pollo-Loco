class FirstLayer extends Background{

    /**Assigns the first layer of the background their starting position
    @param {sting} path src of the image to load
     @param {number} x the x-cordinate for the image*/
    constructor(path, x){
        super();
        this.loadImg(path, x);
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}