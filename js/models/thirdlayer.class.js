class ThirdLayer extends Background{

    /**Assigns the third layer of the background their starting position
     * @param {string} path src of the image to load
     * @param {number} x the x-cordinate for the image*/
    constructor(path, x){
        super();
        this.loadImg(path, x);
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}