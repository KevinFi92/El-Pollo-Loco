class Character extends MoveableObject{
    y = 250;
constructor(){
    super().loadImg('img/2_character_pepe/2_walk/W-21.png')
}

moveRight(){
    this.x += 10;
    console.log(this.x);
};
   jump(){};
}