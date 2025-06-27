class Background{
    x;
    y;
    img;
    height;
    width;

    /**Base class of the background. Defines which properties the individual layers of the background need

    constructor(){};

    /**creates a new image with "path" as src
     * @param {string} path - Path of the image to be loaded.*/
    loadImg(path){
        this.img = new Image();
        this.img.src = path;
    }
}
