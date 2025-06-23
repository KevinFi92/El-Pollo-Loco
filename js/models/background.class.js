class Background{
    x;
    y;
    img;
    height;
    width;

    /**Grundklasse des Hintergrunds. Legt fest, welche eingenschaften die einzelnen Layer des Hintergrunds benötigen
     * @param {string} path - Pfad des Bildes, das geladen wird.*/
    constructor(){};
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }
}