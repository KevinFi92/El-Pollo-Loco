let canvas;
let world;
let character = new Character;
let keyboard = new Keyboard;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("my Character is" + world.character);
}

document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowRight") {
    keyboard.right = true;
  }
  if (event.key === "ArrowLeft") {
    keyboard.left = true;
  }
  if (event.key === "ArrowUp") {
    keyboard.up = true;
  }
  if (event.key === "Space") {
    keyboard.space = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key === "ArrowRight") {
    keyboard.right = false;
  }
  if (event.key === "ArrowLeft") {
    keyboard.left = false;
  }
  if (event.key === "ArrowUp") {
    keyboard.up = false;
  }
  if (event.key === "Space") {
    keyboard.space = false;
  }
});
