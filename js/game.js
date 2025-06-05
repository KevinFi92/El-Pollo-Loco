let canvas;
let world;
let character;
let keyboard;



function init() {
  canvas = document.getElementById("canvas");
  character = new Character();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard, character);
  startGame();
}

document.addEventListener("keydown", function (event) {
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

document.addEventListener("keyup", function (event) {
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
  document.getElementById("canvas").style.display = "block";
  document.getElementById("ui").style.display = "none";

}

function hideCanvas() {
  document.getElementById("canvas").style.display = "none";
}

function restartGame() {
location.reload();
}

function resetLevel() {
  const enemies = [
    new chicken(),
    new chicken(),
    new chicken(),
    new Chick(),
    new Chick(),
    new Chick(),
    new Endboss(),
  ];
  const clouds = [
    new Clouds("img/5_background/layers/4_clouds/1.png"),
    new Clouds("img/5_background/layers/4_clouds/2.png"),
  ];
  const coins = [new Coin(), new Coin()];
  const salsa = [new Salsa(), new Salsa()];
  const firstLayer = [
    new FirstLayer("img/5_background/layers/1_first_layer/2.png", -719),
    new FirstLayer("img/5_background/layers/1_first_layer/1.png", 0),
    new FirstLayer("img/5_background/layers/1_first_layer/2.png", 719),
    new FirstLayer("img/5_background/layers/1_first_layer/1.png", 719 * 2),
  ];
  const secondLayer = [
    new SecondLayer("img/5_background/layers/2_second_layer/2.png", -719),
    new SecondLayer("img/5_background/layers/2_second_layer/1.png", 0),
    new SecondLayer("img/5_background/layers/2_second_layer/2.png", 719),
    new SecondLayer("img/5_background/layers/2_second_layer/1.png", 719 * 2),
  ];
  const thirdLayer = [
    new ThirdLayer("img/5_background/layers/3_third_layer/2.png", -719),
    new ThirdLayer("img/5_background/layers/3_third_layer/1.png", 0),
    new ThirdLayer("img/5_background/layers/3_third_layer/2.png", 719),
    new ThirdLayer("img/5_background/layers/3_third_layer/1.png", 719 * 2),
  ];
  const sky = [
    new Sky("img/5_background/layers/air.png", -719),
    new Sky("img/5_background/layers/air.png", 0),
    new Sky("img/5_background/layers/air.png", 719),
    new Sky("img/5_background/layers/air.png", 719 * 2),
  ];

  const level = new Level(
    enemies,
    clouds,
    firstLayer,
    secondLayer,
    thirdLayer,
    sky,
    coins,
    salsa
  );
  world.lvl = level;
  return level;
}

function muteSound() {
  let muteBtn = document.getElementById("mute").querySelector("img");
  if (muteBtn.src.includes("sound_unmuted.png")) {
    muteBtn.src = "img/11_icons/sound_muted.png";
    world.soundMuted = true;
  } else {
    muteBtn.src = "img/11_icons/sound_unmuted.png";
    world.soundMuted = false;
  }
}


