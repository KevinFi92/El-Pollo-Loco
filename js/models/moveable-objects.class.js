class MoveableObject {
    x = 50;
    y = 300;
    img;
    height = 150;
    width = 100;

    constructor(){};
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    

    moveLeft(){};
}