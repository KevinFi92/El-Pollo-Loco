class FirstLayer extends Background{

    constructor(path, x){
        super().loadImg(path, x)
        this.x = x;
        this.y = 80;
        this.height = 400;
        this.width = 720;
    }
}