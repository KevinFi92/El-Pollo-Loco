class Character extends MoveableObject{
    y = 150;
    x = 50;
constructor(){
    super().loadImg('img/2_character_pepe/2_walk/W-21.png')
    this.height = 300;
    this.width = 150;
}

moveRight(){
    this.x += 10;
    console.log(this.x);
};
   jump(){};
}