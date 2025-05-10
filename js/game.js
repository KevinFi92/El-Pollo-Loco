let gameStarted = false;
let canvas;
let world;
let character = new Character();
let keyboard = new Keyboard();


function init() {
  startGame();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, gameStarted);
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

function startGame() {
  gameStarted = true;
  document.getElementById("canvas").style.display = "block";
  document.getElementById("ui").style.display = "none";
}

function hideCanvas() {
  document.getElementById("canvas").style.display = "none";
}

function restartGame() {
  world = null;
  document.getElementById("gameover").style.display = "none";
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameStarted = true;
  world.lvl = null;
  world.lvl = level_1;
}