class Clouds extends MoveableObject {
x = 50;
y= 10;
width = 350;
height = 400;

constructor(){
    super().loadImg('img/5_background/layers/4_clouds/1.png')
    this.x += Math.random()*500;
    this.animation();
}


}