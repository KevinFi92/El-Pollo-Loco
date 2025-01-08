class Background{
    x;
    y;
    img;
    height;
    width;

    constructor(){};
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }
}