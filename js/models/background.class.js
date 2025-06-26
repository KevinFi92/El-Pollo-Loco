class Background{
    x;
    y;
    img;
    height;
    width;

    /**Base class of the background. Defines which properties the individual layers of the background need
     * @param {string} path - Path of the image to be loaded.*/
    constructor(){};

    /**creates a new image with "path" as src */
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }
}
