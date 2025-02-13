let canvas;
let world;
let character = new Character();
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener('keydown', function(event) {
  if (event.code === "ArrowRight") {
    keyboard.right = true;
  }
  if (event.code === "ArrowLeft") {
    keyboard.left = true;
  }
  if (event.code === "ArrowUp") {
    keyboard.up = true;
  }
  if (event.code === "Space") {
    keyboard.space = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code === "ArrowRight") {
    keyboard.right = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.left = false;
  }
  if (event.code === "ArrowUp") {
    keyboard.up = false;
  }
  if (event.code === "Space") {
    keyboard.space = false;
  }
});
