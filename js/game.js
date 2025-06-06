let canvas;
let world;
let character;
let keyboard;


function init() {
    initLevel();
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
    world.stopSounds(world.music);
    document.getElementById("restart").style.display = "none";
    init();
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


