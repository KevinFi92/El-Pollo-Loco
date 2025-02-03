class DrawableObject{
    img;
    height;
    width;
    x;
    y;

    constructor(path){

    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }


}


