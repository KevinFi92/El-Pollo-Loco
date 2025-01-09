class MoveableObject {
    x = 50;
    y = 360;
    img;
    height;
    width;

    constructor(){};
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }

    animation(){
        setInterval (() => {
            this.x -= 0.15;
        }, 1000/60)
    }
}