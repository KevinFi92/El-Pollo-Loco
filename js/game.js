let canvas;
let world;
let character = new Character;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  console.log("my Character is" + world.character);
}

document.addEventListener('keydown', function(event) {
  // Prüfen, ob die rechte Pfeiltaste gedrückt wurde
  if (event.key === "ArrowRight") {
      // Die Funktion ausführen
      character.moveRight();
      character.walkingAnimation();
  }
});
